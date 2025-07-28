import { getProfile, updateProfile } from '@/entities/profile'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
   try {
      const data = await getProfile()
      console.log('Profile GET response:', data)

      if (!data) {
         return NextResponse.json(
            { error: '프로필을 찾을 수 없습니다.' },
            { status: 404 },
         )
      }

      return NextResponse.json(data)
   } catch (error) {
      console.error('Profile GET error:', error)
      return NextResponse.json(
         {
            error:
               error instanceof Error
                  ? error.message
                  : '프로필 정보를 불러올 수 없습니다.',
         },
         { status: 500 },
      )
   }
}

export async function PUT(request: NextRequest) {
   try {
      const body = await request.json()
      const { nickname, gender } = body

      console.log('Profile PUT request:', { nickname, gender })

      // 입력 검증
      if (!nickname || !gender) {
         return NextResponse.json(
            { error: '닉네임과 성별은 필수 입력 항목입니다.' },
            { status: 400 },
         )
      }

      await updateProfile({ nickname, gender })

      // 업데이트된 프로필 정보 반환
      const updatedProfile = await getProfile()
      console.log('Profile PUT response:', updatedProfile)

      return NextResponse.json(updatedProfile)
   } catch (error) {
      console.error('Profile PUT error:', error)
      return NextResponse.json(
         {
            error:
               error instanceof Error
                  ? error.message
                  : '프로필 업데이트에 실패했습니다.',
         },
         { status: 500 },
      )
   }
}
