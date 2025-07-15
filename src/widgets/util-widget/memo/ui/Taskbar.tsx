export function Taskbar({
   windows,
   onRestore,
   focusedId,
}: {
   windows: { id: number; isMinimized: boolean; zIndex: number }[]
   onRestore: (id: number) => void
   focusedId: number | null
}) {
   return (
      <div className="w-full h-8 bg-gray-200 flex items-center px-2 gap-1 border-t border-gray-300 select-none">
         {windows.map((w) => (
            <button
               key={w.id}
               className={`w-12 h-8 flex items-center justify-center rounded transition-colors border border-gray-400 text-xs font-bold
                  ${w.isMinimized ? 'bg-gray-200 hover:bg-gray-300' : focusedId === w.id ? 'bg-gray-400 border-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`}
               onClick={() => onRestore(w.id)}
               tabIndex={0}
            >
               📝
            </button>
         ))}
      </div>
   )
}
