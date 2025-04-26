import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const formatDate = (createdAt: string): string => {
   if (!createdAt) return '데이터 오류'

   const today = dayjs().startOf('day')
   const postDate = dayjs.utc(createdAt)

   // 오늘 날짜면 시간만 표시
   if (postDate.isSame(today, 'day')) {
      return postDate.format('HH:mm:ss')
   }
   // 오늘이 아니면 년, 월, 일 표시
   return postDate.format('YY.MM.DD')
}

export default formatDate
