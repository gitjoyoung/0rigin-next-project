// 기본 Intl.NumberFormat 사용 (브라우저와 Node.js 모두 지원)
const formatter = new Intl.NumberFormat('en-US', {
   notation: 'compact',
   compactDisplay: 'short',
   maximumFractionDigits: 2,
   minimumFractionDigits: 0,
   useGrouping: false,
})

export const formatNumberToString = (value: any): string => {
   const num = Number(value)
   if (isNaN(num) || num === 0) return '0'

   const isNegative = num < 0
   const abs = Math.abs(num)

   // 소수점 절삭: 둘째 자리까지 유지
   const truncated = Math.floor(abs * 100) / 100

   // compact notation 적용
   const formatted = formatter.format(truncated)

   return isNegative ? `-${formatted}` : formatted
}
