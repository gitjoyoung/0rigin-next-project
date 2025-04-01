import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
   try {
      const supabase = await createClient()
      const {
         data: { session },
         error,
      } = await supabase.auth.getSession()

      if (error) {
         return NextResponse.json({ error: error.message }, { status: 401 })
      }

      return NextResponse.json({ session })
   } catch (error) {
      return NextResponse.json(
         { error: '서버 오류가 발생했습니다.' },
         { status: 500 },
      )
   }
}
