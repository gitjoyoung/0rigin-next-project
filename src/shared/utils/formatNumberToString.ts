import currency from 'currency.js'

// 지원하는 언어 타입
export type SupportedLanguage = 'ko' | 'en' | 'ja' | 'zh'

// 단위 시스템 타입
type UnitSystem = {
   value: number
   symbol: string
   precision?: number
}

// 포맷팅 옵션 타입
export interface FormatNumberOptions {
   lang?: SupportedLanguage
   maxValue?: number
   precision?: number
   showSymbol?: boolean
   compact?: boolean
   currency?: boolean
   currencySymbol?: string
}

// 언어별 단위 시스템
const UNIT_SYSTEMS: Record<SupportedLanguage, UnitSystem[]> = {
   en: [
      { value: 1000000000000, symbol: 'T', precision: 1 },
      { value: 1000000000, symbol: 'B', precision: 1 },
      { value: 1000000, symbol: 'M', precision: 1 },
      { value: 1000, symbol: 'K', precision: 1 },
   ],
   ko: [
      { value: 1000000000000, symbol: '조', precision: 0 },
      { value: 100000000, symbol: '억', precision: 0 },
      { value: 10000, symbol: '만', precision: 0 },
      { value: 1000, symbol: '천', precision: 0 },
   ],
   ja: [
      { value: 1000000000000, symbol: '兆', precision: 0 },
      { value: 100000000, symbol: '億', precision: 0 },
      { value: 10000, symbol: '万', precision: 0 },
      { value: 1000, symbol: '千', precision: 0 },
   ],
   zh: [
      { value: 1000000000000, symbol: '萬億', precision: 0 },
      { value: 100000000, symbol: '億', precision: 0 },
      { value: 10000, symbol: '萬', precision: 0 },
      { value: 1000, symbol: '千', precision: 0 },
   ],
}

// 기본 옵션
const DEFAULT_OPTIONS: FormatNumberOptions = {
   lang: 'en',
   maxValue: 999999999999,
   precision: 0,
   showSymbol: true,
   compact: true,
   currency: false,
   currencySymbol: '$',
}

export const formatNumberToString = (
   num: number,
   options: FormatNumberOptions = {},
): string => {
   // 옵션 병합
   const opts = { ...DEFAULT_OPTIONS, ...options }
   const absNum = Math.abs(num)

   // 최대값 체크
   if (opts.maxValue && absNum > opts.maxValue) {
      return 'X'
   }

   // 통화 형식이 필요한 경우
   if (opts.currency) {
      return currency(num, {
         symbol: opts.currencySymbol,
         precision: opts.precision,
      }).format()
   }

   // 축약형이 필요없는 경우
   if (!opts.compact) {
      return currency(num, {
         precision: opts.precision,
         symbol: '',
      }).format()
   }

   // 단위 변환
   const units = UNIT_SYSTEMS[opts.lang!]
   for (const { value, symbol, precision = opts.precision } of units) {
      if (absNum >= value) {
         const converted = num / value
         const formatted = currency(converted, {
            precision,
            symbol: opts.showSymbol ? symbol : '',
            pattern: opts.lang === 'en' ? '# !' : '# !',
         }).format()

         return formatted
      }
   }

   // 기본 포맷
   return currency(num, {
      precision: opts.precision,
      symbol: '',
   }).format()
}

// 축약형 숫자 포맷팅 (이전 formatCompactNumber의 기능을 유지하면서 새로운 formatNumber 사용)
export const formatCompactNumber = (
   num: number,
   options: Omit<FormatNumberOptions, 'compact'> = {},
): string => {
   return formatNumberToString(num, { ...options, compact: true })
}
