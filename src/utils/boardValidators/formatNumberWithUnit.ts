export const formatNumberWithUnit = (number: number): string => {
   let unit = ''
   let divisor = 1

   if (number >= 100000000) {
      // 억 단위
      unit = '억'
      divisor = 100000000
   } else if (number >= 10000) {
      // 만 단위
      unit = '만'
      divisor = 10000
   }

   const dividedNumber = number / divisor
   return dividedNumber % 1 === 0
      ? `${Math.floor(dividedNumber)}${unit}` // 소수점 이하가 없으면 정수로 반환
      : `${dividedNumber.toFixed(1)}${unit}` // 소수점 이하가 있으면 한 자리까지 표시
}
