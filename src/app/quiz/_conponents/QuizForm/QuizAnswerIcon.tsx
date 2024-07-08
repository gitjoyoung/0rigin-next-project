import { CheckBadgeIcon, XMarkIcon } from '@heroicons/react/20/solid'
import React from 'react'

export default function QuizAnswerIcon({ id, answer }) {
   if (id === answer) {
      return <CheckBadgeIcon className="text-green-500" />
   }
   return <XMarkIcon className="text-red-500" />
}
