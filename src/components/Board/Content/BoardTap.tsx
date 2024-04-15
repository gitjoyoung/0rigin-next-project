import { BoardTapButton } from './BoardTapButton'

enum TapName {
   RealTime = '실시간',
   Recommended = '추천글',
}

interface Props {
   setSelectedTap: (value: TapName) => void
   selectedTap: TapName
}
export default function BoardTap({ setSelectedTap, selectedTap }: Props) {
   const tabs = [{ name: TapName.RealTime }, { name: TapName.Recommended }]

   return (
      <div className="flex gap-1 ">
         {tabs.map((tab) => (
            <BoardTapButton
               key={tab.name}
               tapName={tab.name}
               isActive={selectedTap === tab.name}
               onClick={() => setSelectedTap(tab.name)}
            />
         ))}
      </div>
   )
}
