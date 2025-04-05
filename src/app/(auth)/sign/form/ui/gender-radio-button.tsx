import { Label } from '@/shared/shadcn/ui/label'
import { RadioGroup, RadioGroupItem } from '@/shared/shadcn/ui/radio-group'
import { nanoid } from 'nanoid'

const GENDER_LIST = [
   {
      id: 'man',
      name: 'gender',
      value: '남성',
   },
   {
      id: 'girl',
      name: 'gender',
      value: '여성',
   },
   {
      id: 'other',
      name: 'gender',
      value: '기타',
   },
]

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
      >
         {GENDER_LIST.map(({ id, value }) => (
            <div key={nanoid()} className="flex items-center space-x-2">
               <RadioGroupItem value={value} id={id} />
               <Label htmlFor={id}>{value}</Label>
            </div>
         ))}
      </RadioGroup>
   )
}
