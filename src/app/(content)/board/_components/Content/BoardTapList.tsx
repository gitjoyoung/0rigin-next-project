import { BoardTapButton } from './BoardTapButton'

interface Props {
   setSelectedTap: (tapName: string) => void
   selectedTap: string
}

export default function BoardTapList({ setSelectedTap, selectedTap }: Props) {
   const TAP_NAME = ['실시간', '추천글']

   return (
      <div className="flex gap-1 ">
         {TAP_NAME.map((tab) => (
            <BoardTapButton
               key={tab}
               tapName={tab}
               isActive={selectedTap === tab}
               onClick={() => setSelectedTap(tab)}
            />
         ))}
      </div>
   )
}
