'use client'

interface Props {
   title: string
   content: string
   onConfirm: () => void
}

export default function ModalUi({ title, content, onConfirm }: Props) {
   return (
      <div className="fixed inset-0 z-10 overflow-y-auto">
         <div className="fixed inset-0 bg-black opacity-25" />
         <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative bg-white rounded-md shadow-lg transition-opacity duration-300 ease-in-out">
               <div className="p-6 text-left">
                  <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{content}</p>
                  <div className="mt-4 flex justify-end">
                     <button
                        type="button"
                        className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none"
                        onClick={() => {
                           onConfirm()
                        }}
                     >
                        확인
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
