import ProgressBar from '@/components/common/progress/ProgressBar'
import React from 'react'

function QuizProgressbar({ value = 0, max = 100 }) {
   const progress = (value / max) * 100

   return (
      <div className="w-full">
         <ProgressBar progress={progress} />
         <div className="flex justify-center font-bold">
            {progress.toFixed(0)}%
         </div>
      </div>
   )
}

export default QuizProgressbar
