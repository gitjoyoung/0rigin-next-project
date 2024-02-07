import axios from 'axios'

interface DataObject {
   nickname: string
   password: string
   title: string
   body: string[]
   timestamp: number
   isPublic: boolean
   category: string
}

/**
 * 글쓰기 폼을 서버로 전송하는 함수
 * @param dataObject
 * @returns
 */
const fetchCreateForm = async (dataObject: DataObject): Promise<any> => {
   const options = {
      url: `${process.env.NEXT_PUBLIC_API_URL}board`,
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      data: JSON.stringify(dataObject),
   }

   try {
      const res = await axios(options)
      const { data } = res
      return data
   } catch (error) {
      console.log('error:', error)
   }

   return null
}

export default fetchCreateForm
