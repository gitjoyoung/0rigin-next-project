import OpenAI from 'openai'

export const openAi = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
   organization: process.env.OPENAI_API_PROJECT_ID,
   dangerouslyAllowBrowser: true,
})
