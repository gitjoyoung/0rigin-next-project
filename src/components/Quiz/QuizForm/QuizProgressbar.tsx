import React from 'react'
import ProgressBar from '../../common/progress/ProgressBar'

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
