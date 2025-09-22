"use client";

import { useTheme } from "next-themes";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* ---------- Cellular Automata Settings ---------- */
const CELL_SIZE = 2; // 셀 크기 (픽셀) - 더 세밀하게
const TARGET_FPS = 15; // 업데이트 속도
const BIRTH_THRESHOLD = 3; // 생성 조건 (이웃 수)
const SURVIVAL_MIN = 2; // 생존 최소 이웃 수
const SURVIVAL_MAX = 3; // 생존 최대 이웃 수
const RANDOM_SPAWN_RATE = 0; // 무작위 생성 확률 (0 = 비활성화)
const FADE_RATE = 0.92; // 페이드 속도 (0-1)

interface Cell {
  alive: boolean;
  age: number;
  energy: number;
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

function createCellGrid(width: number, height: number): Cell[][] {
  const cols = Math.floor(width / CELL_SIZE);
  const rows = Math.floor(height / CELL_SIZE);
  const grid: Cell[][] = [];

  for (let y = 0; y < rows; y++) {
    grid[y] = [];
    for (let x = 0; x < cols; x++) {
      // 중앙 영역에 초기 패턴 생성 (글라이더, 펄서 등)
      const centerX = Math.floor(cols / 2);
      const centerY = Math.floor(rows / 2);
      const distFromCenter = Math.hypot(x - centerX, y - centerY);

      let alive = false;
      // 중앙 주변에 더 조밀한 패턴
      if (distFromCenter < Math.min(cols, rows) * 0.15) {
        alive = Math.random() < 0.4;
      }
      // 중간 영역에 스파스한 패턴
      else if (distFromCenter < Math.min(cols, rows) * 0.3) {
        alive = Math.random() < 0.1;
      }
      // 가장자리에 매우 스파스한 패턴
      else if (Math.random() < 0.02) {
        alive = true;
      }

      grid[y][x] = {
        alive,
        age: alive ? Math.floor(Math.random() * 10) : 0,
        energy: alive ? 1 : 0,
      };
    }
  }
  return grid;
}

function countNeighbors(grid: Cell[][], x: number, y: number): number {
  let count = 0;
  const rows = grid.length;
  const cols = grid[0]?.length || 0;

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;

      const nx = x + dx;
      const ny = y + dy;

      // 토로이달 래핑 (가장자리가 연결됨)
      const wrappedX = ((nx % cols) + cols) % cols;
      const wrappedY = ((ny % rows) + rows) % rows;

      if (grid[wrappedY]?.[wrappedX]?.alive) {
        count++;
      }
    }
  }
  return count;
}

function updateCellGrid(currentGrid: Cell[][]): Cell[][] {
  const rows = currentGrid.length;
  const cols = currentGrid[0]?.length || 0;
  const newGrid: Cell[][] = [];

  for (let y = 0; y < rows; y++) {
    newGrid[y] = [];
    for (let x = 0; x < cols; x++) {
      const cell = currentGrid[y][x];
      const neighbors = countNeighbors(currentGrid, x, y);
      const newCell: Cell = { ...cell };

      if (cell.alive) {
        // 생존 조건 확인
        if (neighbors < SURVIVAL_MIN || neighbors > SURVIVAL_MAX) {
          newCell.alive = false;
          newCell.energy *= FADE_RATE;
        } else {
          newCell.age += 1;
          newCell.energy = Math.min(1, newCell.energy + 0.1);
        }
      } else {
        // 생성 조건 확인
        if (neighbors === BIRTH_THRESHOLD) {
          newCell.alive = true;
          newCell.age = 0;
          newCell.energy = 0.5;
        } else if (Math.random() < RANDOM_SPAWN_RATE) {
          // 무작위 생성
          newCell.alive = true;
          newCell.age = 0;
          newCell.energy = 0.3;
        } else {
          newCell.energy *= FADE_RATE;
        }
      }

      newGrid[y][x] = newCell;
    }
  }
  return newGrid;
}

export default function Particles() {
  const { theme } = useTheme();
  const mountedRef = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const pageVisible = usePageVisibility();

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

  /* 셀 그리드 (치수 버킷 기반 재생성 최소화) */
  const wBucket = Math.round(width / 100);
  const hBucket = Math.round(height / 100);
  const initialGrid = useMemo(() => {
    if (width === 0 || height === 0) return [] as Cell[][];
    return createCellGrid(width, height);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wBucket, hBucket]); // 자잘한 리사이즈는 무시

  const gridRef = useRef<Cell[][]>([]);
  useEffect(() => {
    gridRef.current = initialGrid;
  }, [initialGrid]);

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

  /* 애니메이션 루프: mount 후 1회 설정 */
  useEffect(() => {
    mountedRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number | null = null;
    let lastTime = performance.now();
    const frameDelay = 1000 / TARGET_FPS;

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);
      if (!pageVisible || prefersReducedMotion) return; // 정지 상태

      const elapsed = now - lastTime;
      if (elapsed < frameDelay) return;
      lastTime = now;

      const { width: w, height: h } = sizeRef.current;
      if (w === 0 || h === 0) return;

      const themeNow = themeRef.current;
      const currentGrid = gridRef.current;

      if (!currentGrid.length) return;

      // 셀룰러 오토마타 업데이트
      const newGrid = updateCellGrid(currentGrid);
      gridRef.current = newGrid;

      // 배경 클리어 (투명)
      ctx.clearRect(0, 0, w, h);

      // 셀 렌더링
      const rows = newGrid.length;
      const cols = newGrid[0]?.length || 0;
      const isDark = themeNow === "dark";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const cell = newGrid[y][x];

          // 렌더링 조건: 다크 모드는 모든 에너지 셀, 라이트 모드는 살아있는 셀만
          const shouldRender = isDark
            ? cell.energy > 0.01 // 다크모드: 이동 경로 포함 모든 에너지 셀
            : cell.alive; // 라이트모드: 살아있는 셀만 (이동 경로 제거)

          if (shouldRender) {
            // 조건에 맞는 셀만 렌더링
            const pixelX = x * CELL_SIZE;
            const pixelY = y * CELL_SIZE;

            // 테마에 따른 색상
            let red, green, blue;

            if (cell.alive) {
              // 살아있는 셀: 밝고 선명한 색상
              if (isDark) {
                red = Math.floor(220 + cell.energy * 35);
                green = Math.floor(220 + cell.energy * 35);
                blue = Math.floor(220 + cell.energy * 35);
              } else {
                // 라이트모드: 어두운 색상으로 시작
                red = Math.floor(20 + cell.energy * 30);
                green = Math.floor(20 + cell.energy * 30);
                blue = Math.floor(20 + cell.energy * 30);
              }
            } else {
              // 죽은 셀: 부드러운 페이드 아웃 (라이트 모드에서는 렌더링되지 않음)
              red = Math.floor(80 * cell.energy);
              green = Math.floor(90 * cell.energy);
              blue = Math.floor(120 * cell.energy);
            }

            // 🎨 나이에 따른 색상 변화 (더 선명하게)
            // ageEffect: 0 (신생) → 1 (30살 이상) 범위
            const ageEffect = Math.min(cell.age / 30, 1);

            // 📊 색상 변화 조건: 살아있는 셀 AND 6살 이상 (ageEffect > 0.2)
            if (cell.alive && ageEffect > 0.2) {
              if (isDark) {
                // 🌙 다크모드: 흰색 → 보라/핑크/파랑 계열로 변화
                // 나이가 들수록: +빨강, -초록, +파랑 = 보라색 계열
                red = Math.floor(red + ageEffect * 35); // 220→255 (더 밝은 빨강)
                green = Math.floor(green - ageEffect * 60); // 220→160 (초록 감소)
                blue = Math.floor(blue + ageEffect * 80); // 220→300 (더 밝은 파랑, 255로 제한됨)
                // 최종 결과: RGB(255, 160, 255) = 밝은 마젠타/핑크
              } else {
                // ☀️ 라이트모드: 어두운색 → 밝은 핑크/마젠타/보라 계열로 변화
                // 화이트 배경에서 잘 보이는 밝고 선명한 색상
                red = Math.floor(red + ageEffect * 180); // 50→230 (밝은 빨강)
                green = Math.floor(green + ageEffect * 80); // 50→130 (중간 초록)
                blue = Math.floor(blue + ageEffect * 200); // 50→250 (밝은 파랑)
                // 최종 결과: RGB(230, 130, 250) = 밝은 핑크/마젠타
              }
            }

            // 알파값 설정
            const alpha = cell.alive
              ? Math.max(0.8, cell.energy)
              : Math.max(0.3, cell.energy);

            // 안티앨리어싱을 위한 약간의 블러 효과
            ctx.fillStyle = `rgba(${Math.max(0, Math.min(255, red))},${Math.max(0, Math.min(255, green))},${Math.max(0, Math.min(255, blue))},${alpha})`;

            // 더 선명한 렌더링을 위해 약간 큰 사각형
            ctx.fillRect(pixelX, pixelY, CELL_SIZE, CELL_SIZE);

            // 중심부에 더 밝은 점 추가 (고해상도 효과)
            if (cell.alive && cell.energy > 0.7) {
              ctx.fillStyle = `rgba(${Math.max(0, Math.min(255, red + 20))},${Math.max(0, Math.min(255, green + 20))},${Math.max(0, Math.min(255, blue + 20))},${alpha * 0.8})`;
              ctx.fillRect(
                pixelX + 0.5,
                pixelY + 0.5,
                CELL_SIZE - 1,
                CELL_SIZE - 1,
              );
            }
          }
        }
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      mountedRef.current = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [pageVisible, prefersReducedMotion]); // 의존성 추가

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
