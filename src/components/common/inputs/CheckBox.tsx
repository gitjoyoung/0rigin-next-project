import { ChangeEvent, useState } from 'react'

interface Props {
   checked?: boolean
   onChange?: (checked: boolean) => void
}

export default function Checkbox({
   checked: controlledChecked,
   onChange,
}: Props) {
   const isControlled = controlledChecked !== undefined
   const [isChecked, setChecked] = useState(false)

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target

      if (!isControlled) {
         setChecked(checked)
      }

      onChange?.(checked)
   }
   return (
      <input
         type="checkbox"
         onChange={handleChange}
         checked={isControlled ? controlledChecked : isChecked}
      />
   )
}
