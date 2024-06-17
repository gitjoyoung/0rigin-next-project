import { createPortal } from 'react-dom'

interface Props {
   children: React.ReactNode
}

export default function ModalWrap({ children }: Props) {
   const modalRoot = document.getElementById('modal-root')
   return createPortal(children, modalRoot)
}
