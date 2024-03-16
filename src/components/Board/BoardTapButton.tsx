import React from 'react'

interface Props {
   text: string
   tapName: 'normal' | 'best'
   setSelectedTap: (value: 'normal' | 'best') => void
   selectedTap: 'normal' | 'best'
}

export function BoardTapButton({
   text,
   tapName,
   setSelectedTap,
   selectedTap,
}: Props) {
   return (
      <button
         type="button"
         className={`p-2 
    hover:bg-black
    hover:text-white
    font-semibold
    ${
       selectedTap === tapName
          ? 'border border-black border-b-0'
          : 'border border-white border-b-0'
    }`}
         onClick={() => {
            setSelectedTap(tapName)
            // router.refresh();
         }}
      >
         {text}
      </button>
   )
}
