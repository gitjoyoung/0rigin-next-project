// 숫자를 단위에 맞게 포맷팅하는 함수
export const formatNumberWithUnit = (number: number): string => {
   if (!number) return '0'

   const units = ['', '만', '억']
   const divisors = [1, 10000, 100000000]

   const index = Math.floor(Math.log10(number) / 4)
   const dividedNumber = number / divisors[index]

   return `${dividedNumber.toFixed(1)}${units[index]}`
}
