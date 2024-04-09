export const formatValue = (value: number): string => {
   if (value === undefined) {
      return ''
   }
   const suffixes = ['', 'K', 'M', 'B']
   const updatedValue = value
   const index = suffixes.findIndex((_, i) => value < 1000 ** (i + 1))

   const formattedValue = (updatedValue / 1000 ** index)
      .toFixed(1)
      .replace(/\.0$/, '')
   return `${formattedValue}${suffixes[index]}`
}
