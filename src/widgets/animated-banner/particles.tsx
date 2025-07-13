'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'

const MIN_PARTICLE_COUNT = 10000
const MAX_PARTICLE_COUNT = 20000
const PARTICLE_SIZE_MIN = 0.3
const PARTICLE_SIZE_MAX = 0.7
const FPS_DEFAULT = 15
const FPS_MIN = 10
const FPS_MAX = 20
const RADIUS_RATIO = 0.5

export default function Particles() {
   const { theme } = useTheme()
   const [mounted, setMounted] = useState(false)
   const canvasRef = useRef(null)
   const containerRef = useRef(null)
   const animationFrameRef = useRef(null)
   const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
   const particlesRef = useRef([])

   useEffect(() => {
      setMounted(true)
   }, [])

   // 부모 컨테이너 크기 감지
   useEffect(() => {
      if (!containerRef.current) return
      const updateSize = () => {
         if (!containerRef.current) return
         const rect = containerRef.current.getBoundingClientRect()
         setDimensions({ width: rect.width, height: rect.height })
      }
      updateSize()
      const resizeObserver = new window.ResizeObserver(updateSize)
      resizeObserver.observe(containerRef.current)
      return () => resizeObserver.disconnect()
   }, [])

   // 파티클 생성 및 관리 (크기 변경 시만 재생성)
   useEffect(() => {
      if (!dimensions.width || !dimensions.height) return
      const width = dimensions.width
      const height = dimensions.height
      const centerX = width / 2
      const centerY = height / 2
      const radius = width * RADIUS_RATIO
      const PARTICLE_COUNT = Math.min(
         MAX_PARTICLE_COUNT,
         Math.max(MIN_PARTICLE_COUNT, Math.floor((width * height) / 20)),
      )
      const particles = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
         const side = i < PARTICLE_COUNT / 2 ? 'dark' : 'light'
         const angle = Math.random() * Math.PI * 2
         const r = Math.sqrt(Math.random()) * radius
         let initialAngle = angle
         if (side === 'dark') {
            initialAngle = angle < Math.PI ? angle : angle - Math.PI
         } else {
            initialAngle = angle >= Math.PI ? angle : angle + Math.PI
         }
         const x = centerX + Math.cos(initialAngle) * r
         const y = centerY + Math.sin(initialAngle) * r
         particles.push({
            x: x,
            y: y,
            side: side,
            initialAngle: initialAngle,
            initialRadius: r,
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
      particlesRef.current = particles
   }, [dimensions.width, dimensions.height])

   // 애니메이션 루프 및 최적화
   useEffect(() => {
      if (!canvasRef.current || !dimensions.width || !dimensions.height) return
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      canvas.width = dimensions.width
      canvas.height = dimensions.height
      const width = dimensions.width
      const height = dimensions.height
      const centerX = width / 2
      const centerY = height / 2
      const radius = width * RADIUS_RATIO
      let time = 0
      let isRunning = true
      let lastTime = 0
      let FPS = FPS_DEFAULT
      let frameDelay = 1000 / FPS
      const handleVisibility = () => {
         isRunning = document.visibilityState === 'visible'
         if (isRunning && animationFrameRef.current == null) {
            animate(performance.now())
         }
      }
      document.addEventListener('visibilitychange', handleVisibility)
      function animate(currentTime) {
         if (!isRunning) {
            animationFrameRef.current = null
            return
         }
         if (!lastTime) lastTime = currentTime
         const elapsed = currentTime - lastTime
         if (elapsed > frameDelay) {
            if (elapsed > 100) {
               FPS = Math.max(FPS_MIN, FPS - 1)
               frameDelay = 1000 / FPS
            } else if (elapsed < 40 && FPS < FPS_MAX) {
               FPS = Math.min(FPS_MAX, FPS + 1)
               frameDelay = 1000 / FPS
            }
            time += 0.008
            lastTime = currentTime
            const backgroundColor = mounted
               ? theme === 'dark'
                  ? '#000000'
                  : '#F0EEE6'
               : 'transparent'
            ctx.fillStyle = backgroundColor
            ctx.globalAlpha = 0.1
            ctx.fillRect(0, 0, width, height)
            ctx.globalAlpha = 1
            ctx.save()
            ctx.globalCompositeOperation = 'source-over'
            const particles = particlesRef.current
            for (let i = 0; i < particles.length; i++) {
               const particle = particles[i]
               particle.convergencePhase += particle.convergenceSpeed
               particle.transitionPhase += particle.transitionSpeed
               const convergenceCycle = Math.sin(particle.convergencePhase)
               const isConverging = convergenceCycle > 0
               // 위치 이동
               if (isConverging) {
                  const convergenceStrength = convergenceCycle
                  particle.targetX = centerX
                  particle.targetY = centerY
                  const distanceToCenter = Math.sqrt(
                     (particle.x - centerX) ** 2 + (particle.y - centerY) ** 2,
                  )
                  const moveSpeed =
                     0.02 * convergenceStrength * (distanceToCenter / radius)
                  particle.x += (particle.targetX - particle.x) * moveSpeed
                  particle.y += (particle.targetY - particle.y) * moveSpeed
               } else {
                  const transitionProgress = Math.abs(convergenceCycle)
                  const newAngle = particle.initialAngle + Math.PI
                  const newRadius = particle.initialRadius
                  const sCurveEffect = Math.sin(newAngle * 2) * radius * 0.5
                  const curvedAngle =
                     newAngle + (sCurveEffect / newRadius) * transitionProgress
                  particle.targetX = centerX + Math.cos(curvedAngle) * newRadius
                  particle.targetY = centerY + Math.sin(curvedAngle) * newRadius
                  const moveSpeed = 0.03 * transitionProgress
                  particle.x += (particle.targetX - particle.x) * moveSpeed
                  particle.y += (particle.targetY - particle.y) * moveSpeed
               }
               let color, alpha
               if (isConverging) {
                  if (theme === 'dark') {
                     color =
                        particle.side === 'dark' ? '220,220,220' : '120,120,120'
                     alpha = 0.3 * convergenceCycle
                  } else {
                     color = particle.side === 'dark' ? '30,30,30' : '70,70,70'
                     alpha = 0.25 * convergenceCycle
                  }
               } else {
                  const transition = Math.abs(convergenceCycle)
                  if (theme === 'dark') {
                     color =
                        particle.side === 'dark' ? '220,220,220' : '120,120,120'
                     alpha = 0.3 * transition
                  } else {
                     color = particle.side === 'dark' ? '30,30,30' : '70,70,70'
                     alpha = 0.22 * transition
                  }
               }
               const distanceToCenter = Math.sqrt(
                  (particle.x - centerX) ** 2 + (particle.y - centerY) ** 2,
               )
               if (distanceToCenter < radius * 0.2) {
                  alpha += (1 - distanceToCenter / (radius * 0.2)) * 0.2
               }
               ctx.beginPath()
               ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
               ctx.fillStyle = `rgba(${color}, ${alpha})`
               ctx.fill()
            }
            ctx.restore()
            const centralGlow = Math.sin(time * 0.1) * 0.5 + 0.5
            ctx.beginPath()
            ctx.arc(centerX, centerY, 2 + centralGlow * 3, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(120,120,120,${0.1 + centralGlow * 0.2})`
            ctx.fill()
         }
         animationFrameRef.current = requestAnimationFrame(animate)
      }
      animate(performance.now())
      return () => {
         isRunning = false
         if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
            animationFrameRef.current = null
         }
         document.removeEventListener('visibilitychange', handleVisibility)
         if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
         }
      }
   }, [theme, dimensions, mounted])

   // 스타일 분기: mounted 전에는 SSR과 동일한 스타일만 적용
   const backgroundColor =
      mounted && theme === 'dark'
         ? '#000000'
         : mounted && theme === 'light'
           ? '#F0EEE6'
           : 'transparent'

   return (
      <div
         ref={containerRef}
         style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            backgroundColor,
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         <canvas
            ref={canvasRef}
            style={{
               width: '100%',
               height: '100%',
               display: 'block',
            }}
         />
      </div>
   )
}
