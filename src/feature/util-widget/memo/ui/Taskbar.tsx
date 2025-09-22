type TaskbarProps = {
  windows: {
    id: number;
    isMinimized: boolean;
    zIndex: number;
    content: string;
  }[];
  onRestore: (id: number) => void;
  focusedId: number | null;
};

export function Taskbar({ windows, onRestore, focusedId }: TaskbarProps) {
  return (
    <div className="w-full h-8  bg-gray-200 flex items-center  gap-1 border-t border-gray-300 select-none">
      {windows.map((w) => (
        <button
          key={w.id}
          className={`h-8 flex gap-2 px-2 items-center justify-center rounded transition-colors border border-gray-400 text-xs font-bold
                  ${w.isMinimized ? "bg-gray-200 hover:bg-gray-300" : focusedId === w.id ? "bg-gray-400 border-gray-500" : "bg-gray-300 hover:bg-gray-400"}`}
          onClick={() => onRestore(w.id)}
          tabIndex={0}
        >
          <span className="text-xs font-bold">
            {w.content.length > 0 ? `${w.content.slice(0, 10)}` : "빈 메모"}
          </span>
          <span className="text-xs font-bold">📝</span>
        </button>
      ))}
    </div>
  );
}
