export const formatNumberWithUnit = (number: number): string => {
   if (!number) return '0'

   const units = ['', '만', '억']
   const divisors = [1, 10000, 100000000]

   const index = Math.floor(Math.log10(number) / 4)
   const dividedNumber = Math.floor(number / divisors[index])

   return `${dividedNumber}${units[index]}`
}
