interface Props {
   tapName: string
   isActive: boolean
   onClick: () => void
}
export function BoardTapButton({ tapName, isActive, onClick }: Props) {
   return (
      <button
         aria-pressed={isActive}
         type="button"
         className={`p-2 bg-white hover:bg-black hover:text-white font-semibold ${isActive ? 'border border-black border-b-0' : 'border border-white border-b-0'}`}
         onClick={onClick}
      >
         {tapName}
      </button>
   )
}
