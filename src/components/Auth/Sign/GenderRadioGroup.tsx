import React from 'react'

interface Props {
   inputState: any
}

export default function GenderRadioGroup({ inputState }: Props) {
   return (
      <div>
         {' '}
         <ul className="flex gap-3 my-1 ">
            <li>
               <label htmlFor="gender-man">
                  <input
                     type="radio"
                     className="m-1"
                     name="gender"
                     value="man"
                     id="gender-man"
                  />
                  남성
               </label>
            </li>
            <li>
               <label htmlFor="gender-girl">
                  <input
                     id="gender-girl"
                     type="radio"
                     className="m-1"
                     name="gender"
                     value="girl"
                  />
                  여성
               </label>
            </li>
            <li>
               <label htmlFor="gender-other">
                  <input
                     type="radio"
                     className="m-1"
                     name="gender"
                     value="other"
                     id="gender-other"
                  />
                  기타
               </label>
            </li>
         </ul>
         <p
            className={`${inputState.gender.hasError ? 'text-xs text-red-500' : 'text-xs '}`}
         >
            {inputState.gender.message}
         </p>
      </div>
   )
}
