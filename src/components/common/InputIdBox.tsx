interface Props {
   defaultValue?: string
   name: string
   placeholder: string
   disabled?: boolean
}

export default function InputNickName({
   defaultValue = '',
   name,
   placeholder,
   disabled = false,
}: Props) {
   return (
      <div className=" border max-w-[160px]">
         <input
            className="w-full p-2"
            defaultValue={defaultValue}
            autoComplete="current-password"
            type="text"
            name={name}
            placeholder={placeholder}
            minLength={2}
            maxLength={12}
            required
            disabled={disabled}
         />
      </div>
   )
}
