import React from 'react'

type ButtonType = 'button' | 'submit'
interface Props {
   text: string
   type: ButtonType
   disabled?: boolean
   onClick?: () => void
}

export default function BasicButton(props: Partial<Props>) {
   const { text, type = 'button', disabled = false, ...restProps } = props

   return (
      <button type={type} disabled={disabled} {...restProps} className="p-3">
         {text}
      </button>
   )
}
