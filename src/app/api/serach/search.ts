/** 검색 API
 * @param {string} search
 */
export default async function fetchSearch(search) {
   try {
      const res = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}search?search=${search}`,
      )
      const data = await res.json()
      return data
   } catch (error) {
      console.log('error :', error)
   }
   return null
}
