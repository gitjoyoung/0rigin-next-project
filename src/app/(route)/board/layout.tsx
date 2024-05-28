import React from 'react'

export default function layout({ dashboard, children }) {
   return (
      <div>
         <div>{dashboard && <div>dashboard</div>}</div>
         {children}
      </div>
   )
}
