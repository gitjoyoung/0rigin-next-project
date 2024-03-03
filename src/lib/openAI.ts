import OpenAI from 'openai'

export const openai = new OpenAI({
   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
   organization: 'org-3a8EO3a2g6fZ4e83zRmv1nX0',
   dangerouslyAllowBrowser: true,
})
