import { Icons } from '@/shared/ui/icons'

export default function QuizAnswerIcon({ id, answer }) {
   if (id === answer) {
      return <Icons.check className="text-green-500" />
   }
   return <Icons.x className="text-red-500" />
}
