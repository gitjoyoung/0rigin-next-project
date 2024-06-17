import {
   fetchLatestPostId,
   fetchPosts,
} from '@/service/board/post/fetchPostApi'
import { validatePostQuery } from '@/utils/slugValidators/validatePostQuery'

export async function GET(request: Request) {
   const { searchParams } = new URL(request.url)
   const page = searchParams.get('page') || '1'
   const lastPostId = await fetchLatestPostId()
   const postData = await fetchPosts(page, lastPostId, 20)
   return Response.json({ lastPostId, postData })
}

export async function POST(request: Request) {
   return Response.json(request)
}

export async function PATCH(request: Request) {
   return Response.json(request)
}

export async function DELETE(request: Request) {
   return Response.json(request)
}
