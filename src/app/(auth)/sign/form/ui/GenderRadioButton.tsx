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

export default function GenderRadioButton() {
   return (
      <RadioGroup
         name="gender"
         defaultValue={GENDER_LIST[0].value}
         className="flex items-center justify-between px-2 py-2"
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
