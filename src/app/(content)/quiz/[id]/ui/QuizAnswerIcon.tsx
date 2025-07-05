import { Check, X } from 'lucide-react'

export default function QuizAnswerIcon({ id, answer }) {
   if (id === answer) {
      return <Check className="text-green-500" />
   }
   return <X className="text-red-500" />
}
