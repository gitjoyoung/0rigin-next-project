import Decimal from 'decimal.js'

export const formatValue = (value: number | string): string => {
   if (value === 0 || value === undefined || value === null) return '0'
   if (value === undefined || value === null) return ''

   try {
      const decimalValue = new Decimal(value)
      const suffixes = ['', 'K', 'M', 'B', 'T', 'Q']

      // 절대값 기준으로 계산
      const absValue = decimalValue.abs()

      // 로그 스케일로 접미사 결정
      const magnitude = absValue.log(1000).floor().toNumber()
      const safeIndex = Math.min(magnitude, suffixes.length - 1)

      // 포맷팅
      const formatted = decimalValue
         .dividedBy(new Decimal(1000).pow(safeIndex))
         .toDecimalPlaces(1)
         .toString()
         .replace(/\.0$/, '')

      return `${formatted}${suffixes[safeIndex]}`
   } catch (error) {
      throw new Error('Invalid number input')
   }
}
