import { openAi } from '@/lib/openAI'

export const getGptReply = async (
   system: string,
   message: string,
   stream: boolean,
): Promise<any> => {
   const response = await openAi.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
         { role: 'system', content: system },
         { role: 'user', content: message },
      ],
      stream,
   })
   return response
}
