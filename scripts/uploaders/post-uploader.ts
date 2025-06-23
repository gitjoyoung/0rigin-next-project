import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { mockPosts } from '../data/post/mock-posts'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
   process.env.NEXT_PUBLIC_SUPABASE_URL!,
   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

async function uploadPostData() {
   console.log('게시글 데이터 업로드를 시작합니다...')

   if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
   ) {
      console.error('❌ Supabase 환경 변수가 설정되지 않았습니다.')
      process.exit(1)
   }

   let uploadedCount = 0
   for (const post of mockPosts) {
      try {
         const { data, error } = await supabase
            .from('posts')
            .insert(post)
            .select()
            .single()
         if (error) throw error
         console.log(`✅ 게시글 업로드 완료: ${data.title}`)
         uploadedCount++
      } catch (error) {
         console.error(`❌ 게시글 업로드 실패:`, error)
      }
   }

   console.log(`\n=== 업로드 결과 ===`)
   console.log(`✅ 새로 업로드된 게시글: ${uploadedCount}개`)
   console.log('\n게시글 데이터 업로드가 완료되었습니다.')
}

if (require.main === module) {
   uploadPostData()
      .then(() => {
         console.log('모든 게시글 데이터가 성공적으로 업로드되었습니다.')
         process.exit(0)
      })
      .catch((error) => {
         console.error('게시글 데이터 업로드 중 오류가 발생했습니다:', error)
         process.exit(1)
      })
}

export { uploadPostData }
