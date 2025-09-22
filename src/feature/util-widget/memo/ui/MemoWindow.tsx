import { Card, CardContent, CardHeader } from "@/shared/shadcn/ui/card";
import { useRef, useState } from "react";
import { Rnd } from "react-rnd";

type MemoWindowProps = {
  id: number;
  onClose: (id: number) => void;
  onMinimize: (id: number) => void;
  onMaximize: (id: number) => void;
  isMaximized: boolean;
  isMinimized: boolean;
  parentRef: React.RefObject<HTMLDivElement | null>;
  zIndex: number;
  onFocus: (id: number) => void;
  onUpdateContent: (id: number, content: string) => void;
  content: string;
};

export function MemoWindow({
  id,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
  isMinimized,
  parentRef,
  zIndex,
  onFocus,
  onUpdateContent,
  content,
}: MemoWindowProps) {
  const memoRef = useRef<HTMLTextAreaElement>(null);
  const [size, setSize] = useState({ width: 220, height: 120 });

  // 메모 내용이 변경될 때마다 업데이트
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    onUpdateContent(id, newContent);
  };
  if (isMinimized) return null;
  const getMaxSize = () => {
    const parent = parentRef.current;
    if (parent) {
      return {
        width: parent.clientWidth - 16,
        height: parent.clientHeight - 16,
      };
    }
    return { width: 400, height: 200 };
  };
  return (
    <Rnd
      default={{
        x: 40 + Math.random() * 40,
        y: 40 + Math.random() * 40,
        width: size.width,
        height: size.height,
      }}
      size={isMaximized ? getMaxSize() : size}
      position={isMaximized ? { x: 8, y: 8 } : undefined}
      minWidth={180}
      minHeight={80}
      bounds={parentRef.current || undefined}
      onResizeStop={(_, __, ref) =>
        setSize({ width: ref.offsetWidth, height: ref.offsetHeight })
      }
      disableDragging={isMaximized}
      enableUserSelectHack={false}
      style={{ zIndex, position: "absolute" }}
      onMouseDown={(e) => {
        onFocus(id);
      }}
    >
      <Card className="w-full h-full flex flex-col shadow-md border border-gray-300 bg-white min-w-0 min-h-0 rounded-lg">
        <CardHeader className="flex flex-row justify-end min-h-[28px] min-w-0 bg-white border-b border-gray-300 p-0 rounded-t-lg">
          <div className="flex items-center gap-1.5 px-2 py-1 group">
            {/* 닫기(빨강) */}
            <button
              onClick={() => onClose(id)}
              title="닫기"
              className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border border-gray-300 bg-[#ff5f56] "
            >
              <span className="invisible group-hover:visible text-[10px] text-black leading-none transition-all  w-full h-full flex items-center justify-center">
                ×
              </span>
            </button>
            {/* 최소화(노랑) */}
            <button
              onClick={() => onMinimize(id)}
              title="최소화"
              className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border border-gray-300 bg-[#ffbd2e] "
            >
              <span className="invisible group-hover:visible text-[10px] text-black leading-none transition-all  w-full h-full flex items-center justify-center">
                –
              </span>
            </button>
            {/* 최대화(초록) */}
            <button
              onClick={() => onMaximize(id)}
              title="최대화"
              className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border border-gray-300 bg-[#27c93f] "
            >
              <span className="invisible group-hover:visible text-[10px] text-black leading-none transition-all  w-full h-full flex items-center justify-center">
                +
              </span>
            </button>
          </div>
          {/* 타이틀/빈 영역 */}
          <div className="flex-1 h-full" />
        </CardHeader>
        <CardContent className="flex-1 p-2 min-h-0 min-w-0">
          <textarea
            ref={memoRef}
            value={content}
            onChange={handleContentChange}
            className="w-full h-full rounded-none resize-none text-xs bg-white text-black border-none outline-none "
            placeholder="메모를 입력하세요..."
            spellCheck={false}
          />
        </CardContent>
      </Card>
    </Rnd>
  );
}
