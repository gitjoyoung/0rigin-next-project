import { getUser } from '@/entities/auth/api/get-user'
import { deletePost, getPostById, updatePost } from '@/entities/post/api'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/post/[id] - 게시글 조회
export async function GET(
   request: NextRequest,
   { params }: { params: Promise<{ id: string }> },
) {
   try {
      const { id: postId } = await params
      const post = await getPostById(Number(postId))

      if (!post) {
         return NextResponse.json(
            { error: '게시글을 찾을 수 없습니다.' },
            { status: 404 },
         )
      }

      return NextResponse.json(post)
   } catch (error) {
      console.error('게시글 조회 에러:', error)
      return NextResponse.json(
         { error: '게시글 조회에 실패했습니다.' },
         { status: 500 },
      )
   }
}

// PUT /api/post/[id] - 게시글 수정
export async function PUT(
   request: NextRequest,
   { params }: { params: Promise<{ id: string }> },
) {
   try {
      const { id: postId } = await params

      // 현재 로그인한 사용자 정보 가져오기
      const user = await getUser()

      // 게시글 정보 조회
      const post = await getPostById(Number(postId))
      if (!post) {
         return NextResponse.json(
            { error: '게시글을 찾을 수 없습니다.' },
            { status: 404 },
         )
      }

      // 로그인한 사용자가 작성자인지 확인
      const isAuthor = user && post.author_id && user.id === post.author_id

      const body = await request.json()
      const { password, ...updateData } = body

      if (!isAuthor) {
         // 비회원 게시글인 경우 비밀번호 검증 필요
         if (!password) {
            return NextResponse.json(
               { error: '비밀번호가 필요합니다.' },
               { status: 400 },
            )
         }

         // 비밀번호 검증
         const { verifyPostPassword } = await import('@/entities/post/api')
         const isValid = await verifyPostPassword(Number(postId), password)
         if (!isValid) {
            return NextResponse.json(
               { error: '비밀번호가 일치하지 않습니다.' },
               { status: 401 },
            )
         }
      }

      // 게시글 수정
      const updatedPost = await updatePost(Number(postId), updateData)

      return NextResponse.json({
         success: true,
         message: '게시글이 수정되었습니다.',
         post: updatedPost,
      })
   } catch (error) {
      console.error('게시글 수정 에러:', error)
      return NextResponse.json(
         { error: '게시글 수정에 실패했습니다.' },
         { status: 500 },
      )
   }
}

// DELETE /api/post/[id] - 게시글 삭제
export async function DELETE(
   request: NextRequest,
   { params }: { params: Promise<{ id: string }> },
) {
   try {
      const { id: postId } = await params

      // 현재 로그인한 사용자 정보 가져오기
      const user = await getUser()

      // 게시글 정보 조회
      const post = await getPostById(Number(postId))
      if (!post) {
         return NextResponse.json(
            { error: '게시글을 찾을 수 없습니다.' },
            { status: 404 },
         )
      }

      // 로그인한 사용자가 작성자인지 확인
      const isAuthor = user && post.author_id && user.id === post.author_id

      if (!isAuthor) {
         // 비회원 게시글인 경우 비밀번호 검증 필요
         const body = await request.json().catch(() => ({}))
         const { password } = body

         if (!password) {
            return NextResponse.json(
               { error: '비밀번호가 필요합니다.' },
               { status: 400 },
            )
         }

         // 비밀번호 검증
         const { verifyPostPassword } = await import('@/entities/post/api')
         const isValid = await verifyPostPassword(Number(postId), password)
         if (!isValid) {
            return NextResponse.json(
               { error: '비밀번호가 일치하지 않습니다.' },
               { status: 401 },
            )
         }
      }

      // 게시글 삭제
      await deletePost(Number(postId))

      return NextResponse.json({
         success: true,
         message: '게시글이 삭제되었습니다.',
      })
   } catch (error) {
      console.error('게시글 삭제 에러:', error)
      return NextResponse.json(
         { error: '게시글 삭제에 실패했습니다.' },
         { status: 500 },
      )
   }
}
