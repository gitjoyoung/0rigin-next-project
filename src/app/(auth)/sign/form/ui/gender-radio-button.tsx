import { Label } from '@/shared/shadcn/ui/label'
import { RadioGroup, RadioGroupItem } from '@/shared/shadcn/ui/radio-group'

const GENDER_LIST = [
   {
      id: 'man',
      label: '남성',
   },
   {
      id: 'woman',
      label: '여성',
   },
   {
      id: 'etc',
      label: '기타',
   },
] as const

interface GenderRadioButtonProps {
   disabled?: boolean
   value?: string
   onChange?: (value: string) => void
}

export default function GenderRadioButton({
   disabled = false,
   value,
   onChange,
}: GenderRadioButtonProps) {
   return (
      <RadioGroup
         name="gender"
         value={value}
         onValueChange={onChange}
         className="flex items-center justify-between px-2 py-2"
         disabled={disabled}
         aria-label="성별 선택"
      >
         {GENDER_LIST.map(({ id, label }) => (
            <div key={id} className="flex items-center space-x-2">
               <RadioGroupItem value={id} id={id} />
               <Label htmlFor={id}>{label}</Label>
            </div>
         ))}
      </RadioGroup>
   )
}
