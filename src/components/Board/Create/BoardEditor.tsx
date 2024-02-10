import React, { useState, useRef, useEffect } from 'react'
import ImagePicker from './ImagePicker'

interface Content {
   id: string
   type: string
   content: string
}

export default function BoardEditor() {
   const [content, setContent] = useState([
      { id: 'div-0', type: 'text', content: '' },
   ])
   const divRefs = useRef([])
   const [imageFiles, setImageFiles] = useState([])

   useEffect(() => {
      if (divRefs.current[content.length - 1]) {
         // 마지막 div에 포커스를 맞춥니다.
         divRefs.current[content.length - 1].focus()
      }
   }, [content])

   const addDiv = (type) => {
      divRefs.current.push(null)

      const newDivId = `div-${content.length}`
      setContent([...content, { id: newDivId, type, content: '' }])
   }

   const moveCaretToEnd = (element) => {
      if (!element.contentEditable || element.contentEditable === 'false') {
         return
      }
      element.focus()
      const range = document.createRange()
      const selection = window.getSelection()
      range.selectNodeContents(element)
      range.collapse(false)
      selection.removeAllRanges()
      selection.addRange(range)
   }
   const deleteDiv = (index) => {
      if (content.length > 1 && content[index].content === '') {
         const newContent = [...content]
         newContent.splice(index, 1)

         setContent(newContent)
         divRefs.current.splice(index, 1)
      }
   }
   const handleEnterKey = (e, index) => {
      e.preventDefault()
      if (index === content.length - 1) {
         addDiv('text')
      } else {
         divRefs.current[index + 1].focus()
      }
   }

   const handleBackspaceKey = (e, index) => {
      if (content.length > 1 && index !== 0) {
         const currentContent = divRefs.current[index].innerText
         const selection = window.getSelection()
         if (currentContent === '' && selection.anchorOffset === 0) {
            e.preventDefault()
            deleteDiv(index)

            // 이전 div에 포커스를 설정합니다.
            const previousDiv = divRefs.current[index - 1]
            previousDiv.focus()
            // 이전 div의 내용 끝으로 포커스를 이동합니다.
            const range = document.createRange()
            range.selectNodeContents(previousDiv)
            range.collapse(false)
            selection.removeAllRanges()
            selection.addRange(range)
         }
      }
   }

   const handleArrowUpKey = (e, index) => {
      e.preventDefault()
      if (index > 0) {
         moveCaretToEnd(divRefs.current[index - 1])
      }
   }

   const handleArrowDownKey = (e, index) => {
      e.preventDefault()
      if (index < content.length - 1) {
         moveCaretToEnd(divRefs.current[index + 1])
      }
   }

   const handleKeyPress = (e, index) => {
      switch (e.key) {
         case 'Enter':
            handleEnterKey(e, index)
            break
         case 'Backspace':
            handleBackspaceKey(e, index)
            break
         case 'ArrowUp':
            handleArrowUpKey(e, index)
            break
         case 'ArrowDown':
            handleArrowDownKey(e, index)
            break
         default:
            break
      }
   }

   const handleContentChange = (e, index) => {
      const newContent = [...content]
      newContent[index].content = e.target.innerText
      setContent(newContent)
   }

   const handleDate = () => {
      console.log(Object.values(divRefs.current))
      const updatedContent = divRefs.current.map((divRef, index) => {
         return {
            ...content[index],
            content: divRef ? divRef.innerHTML : content[index].content,
         }
      })
      console.log(updatedContent)
   }

   return (
      <div>
         {/* 이미지 업로드 */}
         <div className="border">
            <ImagePicker
               imageFiles={imageFiles}
               setImageFiles={setImageFiles}
            />
         </div>
         <div className="border flex flex-col gap-0.5 p-3 pb-10 min-h-[300px]">
            {content.map((item) => (
               <div key={item.id}>
                  {/* <p
                     contentEditable="true"
                     ref={(el) => {
                        divRefs.current[index] = el
                     }}
                     onKeyDown={(e) => handleKeyPress(e, index)}
                     onInput={(e) => handleContentChange(e, index)}
                     className="p-1 w-full resize-none overflow-y-auto border-none"
                  >
                     {div.content}
                  </p> */}
               </div>
            ))}
         </div>
         <button type="button" onClick={handleDate} className="p-3">
            임시버튼
         </button>
      </div>
   )
}
