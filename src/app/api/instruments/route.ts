import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
   try {
      const supabase = await createClient()

      const { data: instruments, error } = await supabase
         .from('instruments')
         .select('*')

      if (error) {
         return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json(instruments)
   } catch (error) {
      return NextResponse.json(
         { error: '서버 오류가 발생했습니다.' },
         { status: 500 },
      )
   }
}

export async function POST(request: Request) {
   try {
      const supabase = await createClient()
      const body = await request.json()

      const { data, error } = await supabase
         .from('instruments')
         .insert([body])
         .select()

      if (error) {
         return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json(data[0], { status: 201 })
   } catch (error) {
      return NextResponse.json(
         { error: '서버 오류가 발생했습니다.' },
         { status: 500 },
      )
   }
}
