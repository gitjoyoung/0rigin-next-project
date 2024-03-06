import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function AlramButton() {
   return (
      <button className="flex gap-1" type="button" aria-label="알림 버튼">
         <p className="text-xs">{1}</p>{' '}
         <FontAwesomeIcon icon={faBell} size="lg" />
      </button>
   )
}
