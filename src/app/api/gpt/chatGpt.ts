import { openai } from '@/lib/openAI'

export const chatGpt = async (content: string): Promise<string> => {
   const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
         {
            role: 'user',
            content: '한글로 답변하고 최대한 정중하게',
         },
         {
            role: 'user',
            content,
         },
      ],
   })
   const results: string = stream.choices[0].message.content
   return results || 'gpt error.'
}
