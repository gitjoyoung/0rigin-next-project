import { DATE_RULES } from '@/shared/constants/validation-rules'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

// dayjs 플러그인 및 로케일 설정
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.locale('ko')

/**
 * 설정된 dayjs 인스턴스를 반환
 * 모든 필요한 플러그인과 한국어 로케일이 적용됨
 */
export const configuredDayjs = dayjs

export const createDate = (date: string) => {
   return dayjs.utc(date).tz('Asia/Seoul').format('YY.MM.DD HH:mm:ss')
}

/**
 * 스마트 날짜 포맷터
 * 7일 이내: 상대시간 ("5분 전", "2시간 전")
 * 올해 내: MM.DD 형식
 * 작년 이전: YY.MM.DD 형식
 */
export const formatSmartDate = (date: string): string => {
   if (!date) return '날짜 없음'

   try {
      const targetDate = dayjs.utc(date).tz('Asia/Seoul')

      if (!targetDate.isValid()) {
         return '잘못된 날짜'
      }

      const now = dayjs()
      const diffInDays = now.diff(targetDate, 'day')

      // 상대시간 표시 기간을 상수로 관리
      if (diffInDays < DATE_RULES.RELATIVE_TIME_DAYS) {
         return targetDate.fromNow()
      }

      // 올해 내는 MM.DD 형식
      if (targetDate.year() === now.year()) {
         return targetDate.format('MM.DD')
      }

      // 작년 이전은 YY.MM.DD 형식
      return targetDate.format('YY.MM.DD')
   } catch (error) {
      console.error('날짜 포맷팅 오류:', error)
      return '날짜 오류'
   }
}

// 기본 export도 제공
export default dayjs
