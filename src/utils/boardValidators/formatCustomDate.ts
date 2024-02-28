import dayjs from 'dayjs'

const formatCustomDate = (createdAt, formating): string => {
   // 'YYYY년 MM월 DD일 HH:mm:ss'
   if (!createdAt) return '시간 없음'
   const postDate = dayjs(createdAt).format(formating)
   return postDate
}

export default formatCustomDate
