// 데이타 예시
const day = 'dayCandle'
const week = 'weekCandle'
const month = 'monthCandle'
const yearQuery = 'year&range=10' // 10 years
const monthQuery = 'month&range=1' // 1 month

export interface StockPrice {
   localDate: string
   closePrice: number
   openPrice: number
   highPrice: number
   lowPrice: number
   accumulatedTradingVolume: number
}
/**
 * @param {string} code 주식 코드 해외, 국내  TSLA.O or 293490(카카오게임즈)
 * @param {string} periodType 기간 타입 dayCandle ,  weekCandle , monthCandle,  year , month
 * ${periodType}&range=${range}
 * @param {string } stockExchangeType 주식 NASDAQ,
 * @returns {object} 주식 가격 정보
 *   {
 *           "localDate": "20140627",
 *           "closePrice": 15.9373,
 *           "openPrice": 15.3007,
 *           "highPrice": 16.1253,
 *           "lowPrice": 15.2147,
 *           "accumulatedTradingVolume": 97339038
 *       },
 */
export const stockPriceApi = async (
   code: string,
   periodType: string,
   stockExchangeType: string,
): Promise<StockPrice> => {
   const URL = `https://api.stock.naver.com/chart/foreign/item/${code}?periodType=${periodType}&stockExchangeType=${stockExchangeType}`
   console.log(URL)
   const fetchData = await fetch(URL, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
   })
   const data = await fetchData.json()
   console.log(data)

   return data
}
