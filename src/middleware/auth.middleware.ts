import { NextApiHandler } from 'next'
import { AuthError } from '../utils/errors'

export function withAuth(handler: NextApiHandler): NextApiHandler {
   return async (req, res) => {
      try {
         // 인증 검사 로직
         return handler(req, res)
      } catch (error) {
         if (error instanceof AuthError) {
            return res.status(401).json({ error: error.message })
         }
         return res.status(500).json({ error: '서버 오류가 발생했습니다.' })
      }
   }
}
