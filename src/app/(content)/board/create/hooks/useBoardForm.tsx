import { boardSchema } from '@/app/(content)/board/create/types/board-schema'
import { useState } from 'react'
import type { IPost, IPostContent } from '../../types/post-type'

export function useBoardForm(
   editData: IPost,
   submitPost: (formData: Partial<IPost>) => void,
) {
   const [markdownContent, setMarkdownContent] = useState<string>(
      typeof editData?.content === 'string' ? editData.content : '',
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
      const guestName = form.nickname?.value
      const title = form.subject.value

      const postContent: IPostContent = {
         type: 'markdown',
         content: [
            {
               type: 'text',
               text: markdownContent,
            },
         ],
      }

      const formData: Partial<IPost> = {
         title,
         content: postContent,
         author: {
            id: 'guest',
            name: guestName || '',
            email: '',
         },
         status: 'published',
         views: 0,
         likes: 0,
         comments: 0,
      }

      const validateSchema = await boardSchema.safeParse(formData)
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
