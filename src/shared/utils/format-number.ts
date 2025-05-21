export const formatNumberToString = (value: any): string => {
   // 값을 숫자로 변환 (숫자, 숫자형 문자열 처리)
   const num = Number(value)

   // 유효하지 않은 숫자면 0 반환
   if (isNaN(num) || num === 0) return '0'

   // 숫자 크기에 따른 포맷팅
   if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`
   if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`
   if (num >= 1000) return `${(num / 1000).toFixed(1)}K`

   // 1000 미만 숫자
   return num.toLocaleString('ko-KR')
}
