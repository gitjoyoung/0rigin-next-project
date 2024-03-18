/**
 * 아이디 유효성 검사
 * @param {string} userId
 * @returns {boolean} 유효성 검사 결과
 * - 아이디가 4자 미만이면 false
 * - 허용되지 않는 문자 포함되어 있으면 false
 * - 영어 대소문자, 숫자만 허용
 */

export const validateGender = (gender: string): boolean => {
   const validGenders = ['man', 'girl', 'other']
   if (validGenders.includes(gender)) {
      return true
   }
   alert('성별을 선택해 주세요')
   return false
}

export const validateUserId = (userId: string): boolean => {
   if (userId.length < 4 || userId.length >= 12) {
      alert('아이디 4자 이상 12자 미만이어야 합니다.')
      return false
   }
   const safeRegex = /^[a-z0-9]+$/
   if (!safeRegex.test(userId)) {
      alert('허용되지 않는 문자가 포함되어 있습니다.')
      return false
   }
   return true
}

/**
 * 비밀번호 유효성 검사
 * @param {string} password - 비밀번호 값입니다.
 * @param {string} confirmPassword - 확인 비밀번호 값입니다.
 * @returns {boolean}
 * - 비밀번호가 8자 미만이거나 12자 초과이면 false
 * - 비밀번호가 영어 대소문자, 숫자, 특수문자를 포함하지 않으면 false
 * - 비밀번호와 확인 비밀번호가 같지 않으면 false
 */
export const validatePassword = (
   password: string,
   confirmPassword: string,
): boolean => {
   const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,12}$/

   if (password.length < 8 || password.length > 12) {
      alert('비밀번호는 8자 이상 12자 이하로 입력해야 합니다.')
      return false
   }
   if (!regex.test(password)) {
      alert('비밀번호는 영어 대소문자, 숫자, 특수문자를 포함해야 합니다.')
      return false
   }
   if (password !== confirmPassword) {
      alert('비밀번호와 확인 비밀번호가 일치하지 않습니다.')
      return false
   }

   return true
}

export const validateEmail = (email: string): boolean => {
   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
   if (!emailRegex.test(email)) {
      alert('이메일 형식이 올바르지 않습니다.')
      return false
   }
   return true
}
