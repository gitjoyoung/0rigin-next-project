import CryptoJS from 'crypto-js'

/**
 * 암호화와 복호화를 위한 비밀 키
 * 실제 프로젝트에서는 환경 변수로 관리하는 것이 좋습니다.
 * 예: process.env.CRYPTO_SECRET_KEY
 */
const SECRET_KEY = process.env.CRYPTO_SECRET_KEY

/**
 * 문자열을 암호화합니다.
 * @param plainText 암호화할 텍스트
 * @param secretKey (선택) 암호화에 사용할 비밀 키
 * @returns 암호화된 문자열
 */
export function encrypt(
   plainText: string,
   secretKey: string = SECRET_KEY,
): string {
   try {
      const cipherText = CryptoJS.AES.encrypt(plainText, secretKey).toString()
      return cipherText
   } catch (error) {
      console.error('암호화 과정에서 오류가 발생했습니다:', error)
      throw new Error('암호화 실패')
   }
}

/**
 * 암호화된 문자열을 복호화합니다.
 * @param cipherText 복호화할 암호화된 텍스트
 * @param secretKey (선택) 복호화에 사용할 비밀 키
 * @returns 복호화된 원본 문자열
 */
export function decrypt(
   cipherText: string,
   secretKey: string = SECRET_KEY,
): string {
   try {
      const bytes = CryptoJS.AES.decrypt(cipherText, secretKey)
      const originalText = bytes.toString(CryptoJS.enc.Utf8)

      if (!originalText) {
         throw new Error(
            '복호화된 텍스트가 비어있습니다. 키가 올바른지 확인하세요.',
         )
      }

      return originalText
   } catch (error) {
      console.error('복호화 과정에서 오류가 발생했습니다:', error)
      throw new Error('복호화 실패')
   }
}

/**
 * 객체를 암호화합니다.
 * @param data 암호화할 객체
 * @param secretKey (선택) 암호화에 사용할 비밀 키
 * @returns 암호화된 문자열
 */
export function encryptObject<T>(
   data: T,
   secretKey: string = SECRET_KEY,
): string {
   try {
      const jsonString = JSON.stringify(data)
      return encrypt(jsonString, secretKey)
   } catch (error) {
      console.error('객체 암호화 과정에서 오류가 발생했습니다:', error)
      throw new Error('객체 암호화 실패')
   }
}

/**
 * 암호화된 문자열을 객체로 복호화합니다.
 * @param cipherText 복호화할 암호화된 텍스트
 * @param secretKey (선택) 복호화에 사용할 비밀 키
 * @returns 복호화된 객체
 */
export function decryptObject<T>(
   cipherText: string,
   secretKey: string = SECRET_KEY,
): T {
   try {
      const jsonString = decrypt(cipherText, secretKey)
      return JSON.parse(jsonString) as T
   } catch (error) {
      console.error('객체 복호화 과정에서 오류가 발생했습니다:', error)
      throw new Error('객체 복호화 실패')
   }
}

/**
 * 문자열을 단방향 해시로 변환합니다. (비밀번호 저장 등에 활용)
 * @param text 해시할 텍스트
 * @returns SHA-256 해시 문자열
 */
export function hashString(text: string): string {
   return CryptoJS.SHA256(text).toString()
}

/**
 * 로컬 스토리지에 암호화된 데이터를 저장합니다.
 * @param key 로컬 스토리지 키
 * @param value 저장할 값
 * @param secretKey (선택) 암호화에 사용할 비밀 키
 */
export function setEncryptedStorage<T>(
   key: string,
   value: T,
   secretKey: string = SECRET_KEY,
): void {
   try {
      const encryptedValue = encryptObject(value, secretKey)
      localStorage.setItem(key, encryptedValue)
   } catch (error) {
      console.error(
         '암호화된 로컬 스토리지 저장 중 오류가 발생했습니다:',
         error,
      )
   }
}

/**
 * 로컬 스토리지에서 암호화된 데이터를 가져와 복호화합니다.
 * @param key 로컬 스토리지 키
 * @param secretKey (선택) 복호화에 사용할 비밀 키
 * @returns 복호화된 데이터 또는 null (오류 발생 시)
 */
export function getEncryptedStorage<T>(
   key: string,
   secretKey: string = SECRET_KEY,
): T | null {
   try {
      const encryptedValue = localStorage.getItem(key)
      if (!encryptedValue) return null
      return decryptObject<T>(encryptedValue, secretKey)
   } catch (error) {
      console.error(
         '암호화된 로컬 스토리지 읽기 중 오류가 발생했습니다:',
         error,
      )
      return null
   }
}

/**
 * 사용 예시:
 *
 * // 1. 기본 문자열 암호화/복호화
 * const plainText = '안녕하세요, 이것은 중요한 메시지입니다!';
 * const encrypted = encrypt(plainText);
 * console.log('암호화된 텍스트:', encrypted);
 * // 결과: U2FsdGVkX1+AbCd...와 같은 암호화된 문자열
 *
 * const decrypted = decrypt(encrypted);
 * console.log('복호화된 텍스트:', decrypted);
 * // 결과: 안녕하세요, 이것은 중요한 메시지입니다!
 *
 * // 2. 객체 암호화/복호화
 * const userInfo = {
 *   name: '홍길동',
 *   email: 'hong@example.com',
 *   role: 'admin',
 *   loginCount: 42
 * };
 *
 * const encryptedUser = encryptObject(userInfo);
 * console.log('암호화된 객체:', encryptedUser);
 * // 결과: U2FsdGVkX1+AbCd...와 같은 암호화된 문자열
 *
 * const decryptedUser = decryptObject<typeof userInfo>(encryptedUser);
 * console.log('복호화된 객체:', decryptedUser);
 * // 결과: { name: '홍길동', email: 'hong@example.com', role: 'admin', loginCount: 42 }
 *
 * // 3. 비밀번호 해싱 (단방향)
 * const password = 'mySecurePassword123!';
 * const hashedPassword = hashString(password);
 * console.log('해시된 비밀번호:', hashedPassword);
 * // 결과: 7a8b9c... 와 같은 해시 문자열 (복호화 불가능)
 *
 * // 4. 로컬 스토리지에 암호화된 데이터 저장
 * const sensitiveData = {
 *   accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *   userDetail: {
 *     personalId: '123456-7890123',
 *     phoneNumber: '010-1234-5678'
 *   }
 * };
 *
 * // 데이터 암호화하여 저장
 * setEncryptedStorage('user-credentials', sensitiveData);
 *
 * // 나중에 암호화된 데이터 불러오기
 * const retrievedData = getEncryptedStorage<typeof sensitiveData>('user-credentials');
 * console.log('복호화된 민감 정보:', retrievedData);
 * // 결과: 원래 저장했던 sensitiveData 객체
 *
 * // 5. 커스텀 키를 사용한 암호화/복호화
 * const customKey = 'my-special-secret-key';
 * const sensitiveName = '주민등록번호: 123456-1234567';
 *
 * const encryptedWithCustomKey = encrypt(sensitiveName, customKey);
 * console.log('커스텀 키로 암호화:', encryptedWithCustomKey);
 *
 * const decryptedWithCustomKey = decrypt(encryptedWithCustomKey, customKey);
 * console.log('커스텀 키로 복호화:', decryptedWithCustomKey);
 * // 결과: 주민등록번호: 123456-1234567
 */
