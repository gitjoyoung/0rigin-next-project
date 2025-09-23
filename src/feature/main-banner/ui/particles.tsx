"use client";

import { useTheme } from "next-themes";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

/* ---------- Aesthetic Point Expansion Settings ---------- */
const TARGET_FPS = 60; // 부드러운 애니메이션을 위해 60fps
const EXPANSION_SPEED = 2; // 확산 속도 (더 빠르게)
const WAVE_FREQUENCY = 0.05; // 웨이브 주파수 (더 활발하게)
const RIPPLE_COUNT = 3; // 동심원 개수 (더 단순하게)
const FADE_DURATION = 4000; // 페이드 지속 시간 (ms) (더 오래)
const MAX_POINTS = 50; // 최대 점 개수 (더 적게)

interface Point {
  x: number;
  y: number;
  birthTime: number;
  intensity: number;
  waveOffset: number;
}

/** 리사이즈 옵저버로 요소 크기 추적 */
function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  return { ref, size };
}

/** prefers-reduced-motion 지원 */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

/** 페이지 가시성 추적 */
function usePageVisibility(): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const handler = () => setVisible(document.visibilityState === "visible");
    handler();
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  return visible;
}

/** 중앙에서 시작하는 점들을 생성 */
function createInitialPoints(width: number, height: number): Point[] {
  const centerX = width / 2;
  const centerY = height / 2;
  const now = performance.now();

  // 처음부터 여러 점으로 시작 (더 눈에 잘 보이게)
  return [
    {
      x: centerX,
      y: centerY,
      birthTime: now - 500, // 조금 일찍 시작
      intensity: 1,
      waveOffset: 0,
    },
    {
      x: centerX + 20,
      y: centerY,
      birthTime: now - 300,
      intensity: 0.8,
      waveOffset: Math.PI / 2,
    },
    {
      x: centerX - 20,
      y: centerY,
      birthTime: now - 100,
      intensity: 0.8,
      waveOffset: Math.PI,
    },
  ];
}

/** 새로운 점들을 점진적으로 추가 */
function generateNewPoints(
  existingPoints: Point[],
  width: number,
  height: number,
  elapsedTime: number,
  currentTime: number,
): Point[] {
  const now = currentTime;
  const newPoints = [...existingPoints];

  // 오래된 점들 제거 (페이드 아웃 완료된 것들)
  const filteredPoints = newPoints.filter(
    (point) => now - point.birthTime < FADE_DURATION,
  );

  // 최대 개수 제한
  if (filteredPoints.length >= MAX_POINTS) {
    return filteredPoints;
  }

  // 시간에 따라 점진적으로 더 많은 점 생성
  const spawnRate = Math.min(elapsedTime / 5000, 0.8); // 5초에 걸쳐 0.8까지 증가 (더 빠르게)

  if (Math.random() < spawnRate) {
    // 황금비와 피보나치 나선을 이용한 미적 배치
    const pointIndex = filteredPoints.length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // 황금각
    const angle = pointIndex * goldenAngle;
    const radius = Math.sqrt(pointIndex) * 12;

    const centerX = width / 2;
    const centerY = height / 2;

    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    // 화면 범위 내에서만 생성 (약간의 여백 포함)
    const margin = 50;
    if (
      x >= -margin &&
      x <= width + margin &&
      y >= -margin &&
      y <= height + margin
    ) {
      filteredPoints.push({
        x,
        y,
        birthTime: now,
        intensity: Math.random() * 0.6 + 0.4,
        waveOffset: Math.random() * Math.PI * 2,
      });
    }
  }

  return filteredPoints;
}

export default function Particles() {
  const { theme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const pageVisible = usePageVisibility();
  const startTimeRef = useRef<number>(performance.now()); // performance.now() 사용
  const pointsRef = useRef<Point[]>([]);

  /* 컨테이너 사이즈 추적 */
  const { ref: containerRef, size } = useElementSize<HTMLDivElement>();
  const { width, height } = size;

  /* themeRef / sizeRef */
  const themeRef = useRef(theme);
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  const sizeRef = useRef(size);
  useEffect(() => {
    sizeRef.current = size;
  }, [size]);

  /* 초기 점들 생성 */
  useEffect(() => {
    if (width > 0 && height > 0) {
      pointsRef.current = createInitialPoints(width, height);
      startTimeRef.current = performance.now(); // performance.now() 사용
    }
  }, [width, height]);

  /* canvas */
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  /* Hi-DPI 스케일링 */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width: w, height: h } = sizeRef.current;
    const dpr = (typeof window !== "undefined" && window.devicePixelRatio) || 1;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
      ctx.scale(dpr, dpr); // 좌표계를 CSS 픽셀로
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
  }, [width, height, resizeCanvas]);

  /* 애니메이션 루프 */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number | null = null;
    let lastTime = performance.now();
    const frameDelay = 1000 / TARGET_FPS;

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);

      if (!pageVisible || prefersReducedMotion) {
        return;
      }

      const elapsed = now - lastTime;
      if (elapsed < frameDelay) return;
      lastTime = now;

      const { width: w, height: h } = sizeRef.current;
      if (w === 0 || h === 0) {
        return;
      }

      const elapsedTime = now - startTimeRef.current;
      const themeNow = themeRef.current;
      const isDark = themeNow === "dark";

      // 디버깅 로그 (필요시 주석 해제)
      // console.log("Animation tick:", {
      //   elapsedTime: Math.round(elapsedTime),
      //   pointsCount: pointsRef.current.length,
      //   isDark,
      // });

      // 새로운 점들 생성
      pointsRef.current = generateNewPoints(
        pointsRef.current,
        w,
        h,
        elapsedTime,
        now,
      );

      // 배경 클리어
      ctx.clearRect(0, 0, w, h);

      // 점들과 확산 효과 렌더링
      pointsRef.current.forEach((point) => {
        const age = now - point.birthTime;
        const ageRatio = Math.min(age / FADE_DURATION, 1);

        // 페이드 아웃 계산
        const fadeAlpha = 1 - Math.pow(ageRatio, 2);
        if (fadeAlpha <= 0) return;

        // 확산 반지름 계산
        const baseRadius = age * EXPANSION_SPEED * 0.2; // 더 크게

        // 동심원 효과
        for (let i = 0; i < RIPPLE_COUNT; i++) {
          const rippleOffset = i * 30;
          const rippleRadius = baseRadius - rippleOffset;

          if (rippleRadius <= 0) continue;

          // 웨이브 효과
          const waveEffect = Math.sin(
            age * WAVE_FREQUENCY + point.waveOffset + i,
          );
          const dynamicRadius = rippleRadius + waveEffect * 5;

          // 알파값 계산 (바깥쪽일수록 투명)
          const rippleAlpha =
            fadeAlpha * (1 - i / RIPPLE_COUNT) * point.intensity * 0.9; // 더 불투명하게

          if (rippleAlpha <= 0) continue;

          // 색상 계산
          let red, green, blue;

          if (isDark) {
            // 다크모드: 화이트에서 형광 초록으로
            const greenTransition = Math.min(ageRatio * 2, 1);
            red = Math.floor(255 * (1 - greenTransition * 0.8));
            green = Math.floor(255 * (0.8 + greenTransition * 0.2));
            blue = Math.floor(255 * (1 - greenTransition * 0.8));
          } else {
            // 라이트모드: 블랙에서 어두운 초록으로
            const greenTransition = Math.min(ageRatio * 2, 1);
            red = Math.floor(50 * (1 - greenTransition * 0.6));
            green = Math.floor(50 + greenTransition * 80);
            blue = Math.floor(50 * (1 - greenTransition * 0.6));
          }

          // 그라데이션 생성
          const gradient = ctx.createRadialGradient(
            point.x,
            point.y,
            0,
            point.x,
            point.y,
            dynamicRadius,
          );

          gradient.addColorStop(
            0,
            `rgba(${red},${green},${blue},${rippleAlpha})`,
          );
          gradient.addColorStop(
            0.7,
            `rgba(${red},${green},${blue},${rippleAlpha * 0.3})`,
          );
          gradient.addColorStop(1, `rgba(${red},${green},${blue},0)`);

          // 원 그리기
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(point.x, point.y, dynamicRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // 중심점 렌더링
        const coreAlpha = fadeAlpha * point.intensity;
        if (coreAlpha > 0) {
          let coreRed, coreGreen, coreBlue;

          if (isDark) {
            const greenTransition = Math.min(ageRatio * 3, 1);
            coreRed = Math.floor(255 * (1 - greenTransition * 0.9));
            coreGreen = 255;
            coreBlue = Math.floor(255 * (1 - greenTransition * 0.9));
          } else {
            const greenTransition = Math.min(ageRatio * 3, 1);
            coreRed = Math.floor(30 * (1 - greenTransition * 0.7));
            coreGreen = Math.floor(30 + greenTransition * 90);
            coreBlue = Math.floor(30 * (1 - greenTransition * 0.7));
          }

          ctx.fillStyle = `rgba(${coreRed},${coreGreen},${coreBlue},${coreAlpha})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 4, 0, Math.PI * 2); // 더 큰 중심점
          ctx.fill();
        }
      });
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [pageVisible, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
