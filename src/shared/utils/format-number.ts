// 기본 Intl.NumberFormat 사용 (브라우저와 Node.js 모두 지원)
const formatter = new Intl.NumberFormat('en-US', {
   notation: 'compact',
   compactDisplay: 'short',
   maximumFractionDigits: 1,
   minimumFractionDigits: 0,
   useGrouping: false,
})

export const formatNumberCompact = (value: any): string => {
   const num = Number(value)
   if (isNaN(num) || num === 0) return '0'

   const isNegative = num < 0

   const abs = Math.abs(num)

   const truncated = Math.floor(abs * 100) / 100
   // compact notation 적용
   const formatted = formatter.format(truncated)

   return isNegative ? `-${formatted}` : formatted
}
