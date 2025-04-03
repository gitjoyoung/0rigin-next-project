export const formatNumberToString = (num: number): string => {
   if (num === 0) return '0'

   // 10억 이상
   if (num >= 1e9) {
      return `${(num / 1e9).toFixed(1)}B`
   }

   // 100만 이상
   if (num >= 1e6) {
      return `${(num / 1e6).toFixed(1)}M`
   }

   // 1000 이상
   if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
   }

   // 1000 미만은 천 단위 구분자만 추가
   return num.toLocaleString('ko-KR')
}
