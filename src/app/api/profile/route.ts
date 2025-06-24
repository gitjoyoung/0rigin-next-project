import { getProfile, updateProfile } from '@/entities/profile/api/profile-api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
   try {
      const data = await getProfile()
      return NextResponse.json(data)
   } catch (error) {
      return NextResponse.json(
         {
            error:
               error instanceof Error
                  ? error.message
                  : '서버 오류가 발생했습니다.',
         },
         { status: 500 },
      )
   }
}

export async function PUT(request: NextRequest) {
   try {
      const { nickname, gender } = await request.json()
      await updateProfile({ nickname, gender })
      return NextResponse.json({ message: '프로필이 업데이트되었습니다.' })
   } catch (error) {
      return NextResponse.json(
         {
            error:
               error instanceof Error
                  ? error.message
                  : '서버 오류가 발생했습니다.',
         },
         { status: 500 },
      )
   }
}
