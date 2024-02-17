import axios from 'axios'
/**
 *   일일 글, 일 ,댓글, 방문자수를 가져옵니다.
 * @returns
 */
const fetchCommunityStats = async () => {
   const url = `${process.env.NEXT_PUBLIC_API_URL}stats`
   const { data } = await axios.get(url, {
      headers: {
         'Content-Type': 'application/json',
      },
   })
   return data
}

export default fetchCommunityStats
