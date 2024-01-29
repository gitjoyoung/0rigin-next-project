import React, { useState } from 'react'

export default function SearchButton() {
   const [search, setSearch] = useState('')

   const handleSearch = async () => {
      try {
         const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}search?search=${search}`,
         )
         const data = await res.json()
         console.log('data :', data)
      } catch (error) {
         console.log('error :', error)
      }
   }

   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         handleSearch()
      }
   }
   return (
      <section>
         <div className="flex items-center justify-center text-sm ">
            <input
               className="border p-0.5"
               type="text"
               onChange={(e) => setSearch(e.target.value as string)}
               onKeyDown={handleKeyDown}
               placeholder="검색"
            />
            <button onClick={handleSearch} type="submit">
               검색
            </button>
         </div>
      </section>
   )
}
