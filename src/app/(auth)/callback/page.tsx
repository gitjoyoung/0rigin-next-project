import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import { redirect } from 'next/navigation'
import LoadingAnimation from './ui'

export default async function CallbackPage() {
   const supabase = await SupabaseServerClient()
   const {
      data: { session },
   } = await supabase.auth.getSession()

   console.log(session?.user.id)
   if (!session?.user.id) {
      redirect(`/`)
   }

   const profile = await supabase
      .from('profile')
      .select('*')
      .eq('id', session?.user.id)
      .single()

   if (!profile.data?.is_active) {
      redirect(`/sign/form?email=${session?.user.email}`)
   }

   setTimeout(() => {
      redirect('/')
   }, 2000)

   return <LoadingAnimation />
}
