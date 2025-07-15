'use client'
import { UtilHeader } from '@/shared/ui/util-header'
import { utilList } from '../constance/util-list'
import { useMemoManager } from './hook/useMemoManager'
import { MemoAppIcon } from './ui/MemoAppIcon'
import { MemoWindow } from './ui/MemoWindow'
import { Taskbar } from './ui/Taskbar'

export default function MemoManager() {
   const {
      windows,
      focusedId,
      containerId,
      handleOpen,
      handleClose,
      handleMinimize,
      handleMaximize,
      handleRestore,
      handleFocus,
   } = useMemoManager()

   return (
      <div className="min-h-screen h-screen flex flex-col relative">
         <UtilHeader
            icon={utilList.find((util) => util.id === 'memo')?.icon}
            name={utilList.find((util) => util.id === 'memo')?.name}
            description={
               utilList.find((util) => util.id === 'memo')?.description
            }
         />
         <div
            id={containerId}
            className="flex-1 relative w-full min-h-0 min-w-0 flex flex-col items-start justify-start overflow-hidden"
         >
            <div className="absolute left-4 top-4 z-0">
               <MemoAppIcon onClick={handleOpen} />
            </div>
            {windows.map((w) => (
               <MemoWindow
                  key={w.id}
                  id={w.id}
                  onClose={handleClose}
                  onMinimize={handleMinimize}
                  onMaximize={handleMaximize}
                  isMaximized={w.isMaximized}
                  isMinimized={w.isMinimized}
                  parentSelector={`#${containerId}`}
                  zIndex={w.zIndex}
                  onFocus={handleFocus}
               />
            ))}
         </div>
         <div className="absolute bottom-0 left-0 right-0">
            <Taskbar
               windows={windows}
               onRestore={handleRestore}
               focusedId={focusedId}
            />
         </div>
      </div>
   )
}
