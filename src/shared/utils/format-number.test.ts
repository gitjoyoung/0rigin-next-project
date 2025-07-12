import { formatNumberCompact } from './format-number'

describe('formatNumberToString', () => {
   describe('기본 숫자 처리', () => {
      test('0을 입력하면 "0"을 반환한다', () => {
         expect(formatNumberCompact(0)).toBe('0')
         expect(formatNumberCompact('0')).toBe('0')
         expect(formatNumberCompact(0.0)).toBe('0')
      })

      test('유효하지 않은 입력은 "0"을 반환한다', () => {
         expect(formatNumberCompact(NaN)).toBe('0')
         expect(formatNumberCompact('invalid')).toBe('0')
         expect(formatNumberCompact(null)).toBe('0')
         expect(formatNumberCompact(undefined)).toBe('0')
         expect(formatNumberCompact('')).toBe('0')
      })
   })

   describe('1000 미만 숫자', () => {
      test('정수는 그대로 표시한다', () => {
         expect(formatNumberCompact(1)).toBe('1')
         expect(formatNumberCompact(123)).toBe('123')
         expect(formatNumberCompact(999)).toBe('999')
      })

      test('소수는 둘째 자리까지만 표시한다', () => {
         expect(formatNumberCompact(1.5)).toBe('1.5')
         expect(formatNumberCompact(123.45)).toBe('123.45')
         expect(formatNumberCompact(999.99)).toBe('999.99')
      })

      test('소수점 셋째 자리는 절삭된다', () => {
         expect(formatNumberCompact(1.234)).toBe('1.23')
         expect(formatNumberCompact(123.456)).toBe('123.45')
         expect(formatNumberCompact(999.999)).toBe('999.99')
      })
   })

   describe('1000 이상 숫자 (K 단위)', () => {
      test('1000-999999 범위는 K 단위로 표시한다', () => {
         expect(formatNumberCompact(1000)).toBe('1K')
         expect(formatNumberCompact(1500)).toBe('1.5K')
         expect(formatNumberCompact(12345)).toBe('12.35K')
         expect(formatNumberCompact(999999)).toBe('1M')
      })

      test('소수점 둘째 자리까지만 표시한다', () => {
         expect(formatNumberCompact(1234.567)).toBe('1.23K')
         expect(formatNumberCompact(12345.678)).toBe('12.35K')
      })
   })

   describe('100만 이상 숫자 (M 단위)', () => {
      test('100만-999999999 범위는 M 단위로 표시한다', () => {
         expect(formatNumberCompact(1000000)).toBe('1M')
         expect(formatNumberCompact(1500000)).toBe('1.5M')
         expect(formatNumberCompact(12345678)).toBe('12.35M')
         expect(formatNumberCompact(999999999)).toBe('1B')
      })

      test('소수점 둘째 자리까지만 표시한다', () => {
         expect(formatNumberCompact(1234567.89)).toBe('1.23M')
         expect(formatNumberCompact(12345678.9)).toBe('12.35M')
      })
   })

   describe('10억 이상 숫자 (B 단위)', () => {
      test('10억 이상은 B 단위로 표시한다', () => {
         expect(formatNumberCompact(1000000000)).toBe('1B')
         expect(formatNumberCompact(1500000000)).toBe('1.5B')
         expect(formatNumberCompact(12345678900)).toBe('12.35B')
      })

      test('소수점 둘째 자리까지만 표시한다', () => {
         expect(formatNumberCompact(1234567890.12)).toBe('1.23B')
         expect(formatNumberCompact(12345678901.23)).toBe('12.35B')
      })
   })

   describe('음수 처리', () => {
      test('음수는 부호를 유지한다', () => {
         expect(formatNumberCompact(-1)).toBe('-1')
         expect(formatNumberCompact(-123)).toBe('-123')
         expect(formatNumberCompact(-1.5)).toBe('-1.5')
         expect(formatNumberCompact(-1000)).toBe('-1K')
         expect(formatNumberCompact(-1500)).toBe('-1.5K')
         expect(formatNumberCompact(-1000000)).toBe('-1M')
         expect(formatNumberCompact(-1500000)).toBe('-1.5M')
         expect(formatNumberCompact(-1000000000)).toBe('-1B')
      })
   })

   describe('문자열 입력', () => {
      test('숫자 문자열을 올바르게 처리한다', () => {
         expect(formatNumberCompact('123')).toBe('123')
         expect(formatNumberCompact('1234')).toBe('1.23K')
         expect(formatNumberCompact('1234567')).toBe('1.23M')
         expect(formatNumberCompact('1234567890')).toBe('1.23B')
      })

      test('소수점이 포함된 문자열을 처리한다', () => {
         expect(formatNumberCompact('1.5')).toBe('1.5')
         expect(formatNumberCompact('1234.56')).toBe('1.23K')
         expect(formatNumberCompact('1234567.89')).toBe('1.23M')
      })
   })

   describe('경계값 테스트', () => {
      test('999와 1000 경계를 올바르게 처리한다', () => {
         expect(formatNumberCompact(999)).toBe('999')
         expect(formatNumberCompact(999.99)).toBe('999.99')
         expect(formatNumberCompact(1000)).toBe('1K')
         expect(formatNumberCompact(1000.01)).toBe('1K')
      })

      test('999999와 1000000 경계를 올바르게 처리한다', () => {
         expect(formatNumberCompact(999999)).toBe('1M')
         expect(formatNumberCompact(999999.99)).toBe('1M')
         expect(formatNumberCompact(1000000)).toBe('1M')
         expect(formatNumberCompact(1000000.01)).toBe('1M')
      })

      test('999999999와 1000000000 경계를 올바르게 처리한다', () => {
         expect(formatNumberCompact(999999999)).toBe('1B')
         expect(formatNumberCompact(999999999.99)).toBe('1B')
         expect(formatNumberCompact(1000000000)).toBe('1B')
         expect(formatNumberCompact(1000000000.01)).toBe('1B')
      })
   })

   describe('실제 사용 시나리오', () => {
      test('좋아요 수, 팔로워 수 등 소셜 미디어 스타일', () => {
         expect(formatNumberCompact(42)).toBe('42')
         expect(formatNumberCompact(1234)).toBe('1.23K')
         expect(formatNumberCompact(56789)).toBe('56.79K')
         expect(formatNumberCompact(1234567)).toBe('1.23M')
         expect(formatNumberCompact(987654321)).toBe('987.65M')
      })

      test('조회수, 댓글 수 등', () => {
         expect(formatNumberCompact(0)).toBe('0')
         expect(formatNumberCompact(1)).toBe('1')
         expect(formatNumberCompact(999)).toBe('999')
         expect(formatNumberCompact(1000)).toBe('1K')
         expect(formatNumberCompact(1500)).toBe('1.5K')
      })
   })
})
