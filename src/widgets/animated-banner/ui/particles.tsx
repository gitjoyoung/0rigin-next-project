'use client'

import { useTheme } from 'next-themes'
import {
   useCallback,
   useEffect,
   useLayoutEffect,
   useMemo,
   useRef,
   useState,
} from 'react'

/* ---------- Tunables ---------- */
const MIN_PARTICLE_COUNT = 10_000
const MAX_PARTICLE_COUNT = 20_000
const PARTICLE_SIZE_MIN = 0.3
const PARTICLE_SIZE_MAX = 0.7
const RADIUS_RATIO = 0.5
const TRAIL_ALPHA = 0.1 // 잔상 투명도(0=빨리 지움, 1=잔상 유지)
const TARGET_FPS = 20 // 내부 타임스텝 제한 (최대)

interface Particle {
   x: number
   y: number
   side: 'dark' | 'light'
   initialAngle: number
   initialRadius: number
   convergencePhase: number
   convergenceSpeed: number
   size: number
   targetX: number
   targetY: number
   transitionPhase: number
   transitionSpeed: number
}

/** 리사이즈 옵저버로 요소 크기 추적 */
function useElementSize<T extends HTMLElement>() {
   const ref = useRef<T | null>(null)
   const [size, setSize] = useState({ width: 0, height: 0 })
   useLayoutEffect(() => {
      const el = ref.current
      if (!el) return
      const update = () => {
         const rect = el.getBoundingClientRect()
         setSize({ width: rect.width, height: rect.height })
      }
      update()
      const ro = new ResizeObserver(update)
      ro.observe(el)
      return () => ro.disconnect()
   }, [])
   return { ref, size }
}

/** prefers-reduced-motion 지원 */
function usePrefersReducedMotion(): boolean {
   const [reduced, setReduced] = useState(false)
   useEffect(() => {
      if (typeof window === 'undefined') return
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      const handler = () => setReduced(mq.matches)
      handler()
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
   }, [])
   return reduced
}

function usePageVisibility(): boolean {
   const [visible, setVisible] = useState(true)
   useEffect(() => {
      if (typeof document === 'undefined') return
      const handler = () => setVisible(document.visibilityState === 'visible')
      handler()
      document.addEventListener('visibilitychange', handler)
      return () => document.removeEventListener('visibilitychange', handler)
   }, [])
   return visible
}

function createParticles(width: number, height: number): Particle[] {
   const count = Math.min(
      MAX_PARTICLE_COUNT,
      Math.max(MIN_PARTICLE_COUNT, Math.floor((width * height) / 20)),
   )
   const centerX = width / 2
   const centerY = height / 2
   const arr: Particle[] = []

   for (let i = 0; i < count; i++) {
      const side: 'dark' | 'light' = i < count / 2 ? 'dark' : 'light'

      /* 1️⃣ [변경] 화면 전체에서 무작위 위치 */
      const x = Math.random() * width
      const y = Math.random() * height

      /* 2️⃣ [변경] 그 좌표 기준 각도·거리 계산 */
      const dx = x - centerX
      const dy = y - centerY
      const initialAngle = Math.atan2(dy, dx) // (-π ~ π)
      const initialRadius = Math.hypot(dx, dy) // 거리

      arr.push({
         x,
         y,
         side,
         initialAngle,
         initialRadius,
         convergencePhase: Math.random() * Math.PI * 2,
         convergenceSpeed: 0.005 + Math.random() * 0.005,
         size:
            PARTICLE_SIZE_MIN +
            Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN),
         targetX: x,
         targetY: y,
         transitionPhase: 0,
         transitionSpeed: 0.004 + Math.random() * 0.002,
      })
   }
   return arr
}

/* ---------- Main Component ---------- */
export default function Particles() {
   const { theme } = useTheme()
   const mountedRef = useRef(false)
   const prefersReducedMotion = usePrefersReducedMotion()
   const pageVisible = usePageVisibility()

   /* 컨테이너 사이즈 추적 */
   const { ref: containerRef, size } = useElementSize<HTMLDivElement>()
   const { width, height } = size

   /* themeRef / sizeRef */
   const themeRef = useRef(theme)
   useEffect(() => {
      themeRef.current = theme
   }, [theme])

   const sizeRef = useRef(size)
   useEffect(() => {
      sizeRef.current = size
   }, [size])

   /* 파티클 배열 (치수 버킷 기반 재생성 최소화) */
   const wBucket = Math.round(width / 100)
   const hBucket = Math.round(height / 100)
   const particles = useMemo(() => {
      if (width === 0 || height === 0) return [] as Particle[]
      return createParticles(width, height)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [wBucket, hBucket]) // 자잘한 리사이즈는 무시

   const particlesRef = useRef<Particle[]>([])
   useEffect(() => {
      particlesRef.current = particles
   }, [particles])

   /* canvas */
   const canvasRef = useRef<HTMLCanvasElement | null>(null)

   /* Hi-DPI 스케일링 */
   const resizeCanvas = useCallback(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const { width: w, height: h } = sizeRef.current
      const dpr =
         (typeof window !== 'undefined' && window.devicePixelRatio) || 1
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      const ctx = canvas.getContext('2d')
      if (ctx) {
         ctx.setTransform(1, 0, 0, 1, 0, 0) // reset
         ctx.scale(dpr, dpr) // 좌표계를 CSS 픽셀로
      }
   }, [])

   useEffect(() => {
      resizeCanvas()
   }, [width, height, resizeCanvas])

   /* 애니메이션 루프: mount 후 1회 설정 */
   useEffect(() => {
      mountedRef.current = true
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      let rafId: number | null = null
      let lastTime = performance.now()
      const frameDelay = 1000 / TARGET_FPS
      let time = 0

      const tick = (now: number) => {
         rafId = requestAnimationFrame(tick)
         if (!pageVisible || prefersReducedMotion) return // 정지 상태

         const elapsed = now - lastTime
         if (elapsed < frameDelay) return
         lastTime = now
         time += 0.008

         const { width: w, height: h } = sizeRef.current
         if (w === 0 || h === 0) return

         const centerX = w / 2
         const centerY = h / 2
         const radius = w * RADIUS_RATIO
         const themeNow = themeRef.current
         const particlesNow = particlesRef.current

         // 배경 페이드 (잔상)
         const bg = themeNow === 'dark' ? '#000000' : '#F0EEE6'
         ctx.fillStyle = bg
         ctx.globalAlpha = TRAIL_ALPHA
         ctx.fillRect(0, 0, w, h)
         ctx.globalAlpha = 1

         // 파티클 업데이트 & 렌더
         for (let i = 0; i < particlesNow.length; i++) {
            const p = particlesNow[i]
            p.convergencePhase += p.convergenceSpeed
            p.transitionPhase += p.transitionSpeed

            const convergenceCycle = Math.sin(p.convergencePhase)
            const isConverging = convergenceCycle > 0

            if (isConverging) {
               const convergenceStrength = convergenceCycle
               p.targetX = centerX
               p.targetY = centerY
               const dx = p.targetX - p.x
               const dy = p.targetY - p.y
               const dist = Math.sqrt(dx * dx + dy * dy)
               const moveSpeed = 0.02 * convergenceStrength * (dist / radius)
               p.x += dx * moveSpeed
               p.y += dy * moveSpeed
            } else {
               const transitionProgress = Math.abs(convergenceCycle)
               const newAngle = p.initialAngle + Math.PI
               const newRadius = p.initialRadius
               const sCurveEffect = Math.sin(newAngle * 2) * radius * 0.5
               const curvedAngle =
                  newAngle + (sCurveEffect / newRadius) * transitionProgress
               p.targetX = centerX + Math.cos(curvedAngle) * newRadius
               p.targetY = centerY + Math.sin(curvedAngle) * newRadius
               const moveSpeed = 0.03 * transitionProgress
               p.x += (p.targetX - p.x) * moveSpeed
               p.y += (p.targetY - p.y) * moveSpeed
            }

            // 색상/알파
            const darkSide = themeNow === 'dark'
            const baseGray =
               p.side === 'dark'
                  ? darkSide
                     ? '220,220,220'
                     : '30,30,30'
                  : darkSide
                    ? '120,120,120'
                    : '70,70,70'
            let alpha = (darkSide ? 0.3 : 0.22) * Math.abs(convergenceCycle)
            if (isConverging && darkSide) alpha = 0.3 * convergenceCycle
            if (isConverging && !darkSide) alpha = 0.25 * convergenceCycle

            // 중심 강화
            const distCenter = Math.hypot(p.x - centerX, p.y - centerY)
            if (distCenter < radius * 0.2) {
               alpha += (1 - distCenter / (radius * 0.2)) * 0.2
            }

            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${baseGray},${alpha})`
            ctx.fill()
         }
      }

      rafId = requestAnimationFrame(tick)

      return () => {
         if (rafId != null) cancelAnimationFrame(rafId)
         mountedRef.current = false
         ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
   }, [pageVisible, prefersReducedMotion]) // 의존성 추가

   return (
      <div ref={containerRef} className="absolute inset-0 w-full h-full">
         <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
   )
}
