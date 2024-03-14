import dayjs from 'dayjs'

const formatCustomDate = (createdAt): string => {
   if (!createdAt) return '시간 없음'

   const today = dayjs().startOf('day')
   const postDate = dayjs(createdAt)

   if (postDate.isSame(today, 'day')) {
      return postDate.format('HH:mm:ss')
   }
   return postDate.format('YY.MM.DD')
}

export default formatCustomDate
