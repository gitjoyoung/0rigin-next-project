import OpenAI from 'openai'

export const getGptReply = async (
   system: string,
   message: string,
   stream: boolean,
): Promise<any> => {
   const apiKey = process.env.OPENAI_API_KEY
   const project = process.env.OPENAI_API_PROJECT_ID
   const openai = new OpenAI({
      apiKey,
      project,
   })
   const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
         { role: 'system', content: system },
         { role: 'user', content: message },
      ],
      stream,
   })
   return response
}
