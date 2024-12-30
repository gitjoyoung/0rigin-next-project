import currency from 'currency.js'

// 대시보드의 통계 수치 표시
const formatStatistic = (value: number) => {
   return currency(value, {
      symbol: '',
      precision: 0,
      pattern: '#,##0',
   }).format()
}

export default function page() {
   return <div>page</div>
}
