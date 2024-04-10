import React from 'react'

enum TapName {
   RealTime = '실시간',
   Recommended = '추천글',
}

interface Props {
   setSelectedTap: (value: TapName) => void
   selectedTap: TapName
}
function TapButton({ tapName, isActive, onClick } ) {
   return (
      <button
         aria-pressed={isActive}
         type="button"
         className={`p-2 hover:bg-black hover:text-white font-semibold ${isActive ? 'border border-black border-b-0' : 'border border-white border-b-0'}`}
         onClick={onClick}
      >
         {tapName}
      </button>
   )
}
export function BoardTapButton({ setSelectedTap, selectedTap }: Props) {
   const tabs = [{ name: TapName.RealTime }, { name: TapName.Recommended }]
   return (
      <div className="flex gap-1 ">
         {tabs.map((tab) => (
            <TapButton
               key={tab.name}
               tapName={tab.name}
               isActive={selectedTap === tab.name}
               onClick={() => setSelectedTap(tab.name)}
            />
         ))}
      </div>
   )
}
