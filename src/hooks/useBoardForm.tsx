// hooks/useBoardForm.ts
import { useState } from 'react'
import { sanitized } from '@/utils/boardValidators/formatSanized'
import { CreatePostData, Post } from '@/types/boardTypes'
import { boardSchema } from '@/schema/boradFormSchema'

export function useBoardForm(
   editData: Post | null,
   submitPost: (formData: CreatePostData) => void,
) {
   const [markdownContent, setMarkdownContent] = useState(
      editData?.markdown || '',
   )

   const generateThumbnail = (htmlString: string): string => {
      const htmlParser = new DOMParser()
      const htmlDocument = htmlParser.parseFromString(htmlString, 'text/html')
      const imgTag = htmlDocument.querySelectorAll('img')
      return imgTag.length > 0 ? imgTag[0].src : ''
   }

   const generateSummary = (htmlString: string): string => {
      const htmlParser = new DOMParser()
      const htmlDocument = htmlParser.parseFromString(htmlString, 'text/html')
      const pTag = htmlDocument.querySelectorAll('p')
      return Array.from(pTag)
         .map((p) =>
            (p as HTMLElement).textContent?.trim().replace(/\s+/g, ' '),
         )
         .filter((text) => text && text.length > 0)
         .join(' ')
         .substring(0, 100)
   }

   const handleFormSubmit = async (
      e: React.FormEvent<HTMLFormElement>,
   ): Promise<void> => {
      e.preventDefault()
      const form = e.currentTarget
      const nickname = form.nickname?.value
      const password = form.password?.value
      const subject = form.subject.value

      const markdown = markdownContent
      const content = await sanitized(markdown)
      const thumbnail = generateThumbnail(content)
      const summary = generateSummary(content)

      const formData: CreatePostData = {
         nickname,
         password,
         title: subject,
         content,
         markdown,
         summary,
         thumbnail,
      }

      const validateSchema = await boardSchema.safeParse({ ...formData })
      if (!validateSchema.success) {
         console.log(validateSchema.error)
         return
      }

      await submitPost(formData)
   }

   return {
      markdownContent,
      setMarkdownContent,
      handleFormSubmit,
   }
}
