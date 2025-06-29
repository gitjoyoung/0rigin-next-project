const dayjs = require('dayjs')
const fs = require('fs')
const path = require('path')

// 설정 객체
const CONFIG = {
   rootDir: path.join(__dirname, 'src'),
   excludeFiles: ['page.tsx'],
   fileExtension: '.tsx',
   outputFileName: 'pathname.ts',
   pageIdentifier: 'page.tsx',
}

// 경로 설정
const PATHS = {
   root: CONFIG.rootDir,
   app: path.join(CONFIG.rootDir, 'app'),
   constants: path.join(CONFIG.rootDir, 'constants'),
   constantFile() {
      return path.join(this.constants, CONFIG.outputFileName)
   },
}

const FileSystem = {
   ensureDirectory(dirPath) {
      try {
         if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true })
            return {
               success: true,
               message: `디렉토리 생성 완료: ${dirPath}`,
            }
         }
         return {
            success: true,
            message: `디렉토리 이미 존재함: ${dirPath}`,
         }
      } catch (error) {
         return {
            success: false,
            message: `디렉토리 생성 실패: ${dirPath}`,
            error,
         }
      }
   },

   ensureFile(filePath) {
      try {
         if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '', 'utf8')
            return {
               success: true,
               message: `파일 생성 완료: ${filePath}`,
            }
         }
         return {
            success: true,
            message: `파일 이미 존재함: ${filePath}`,
         }
      } catch (error) {
         return {
            success: false,
            message: `파일 생성 실패: ${filePath}`,
            error,
         }
      }
   },

   writeFile(filePath, content) {
      try {
         fs.writeFileSync(filePath, content, 'utf8')
         return {
            success: true,
            message: `파일 작성 완료: ${filePath}`,
         }
      } catch (error) {
         return {
            success: false,
            message: `파일 작성 실패: ${filePath}`,
            error,
         }
      }
   },
}

const PathProcessor = {
   // 동적 라우트 체크 함수 추가
   hasDynamicRoute(filePath) {
      const relativePath = path.relative(PATHS.app, filePath)
      return relativePath.includes('[') && relativePath.includes(']')
   },

   toConstantName(filePath) {
      // 1) app 폴더 기준 상대 경로로 만든 뒤
      // 2) page.tsx 부분 제거
      // 3) path.sep(운영체제별 \ 또는 /)로 split
      // 4) 괄호가 들어 있는 세그먼트 제거
      const baseName = path
         .relative(PATHS.app, filePath)
         .replace(/[\\/]page\.tsx$/, '')
         .split(path.sep)
         .filter((segment) => !segment.includes('(') && !segment.includes(')'))
         .join('_')
         .toUpperCase()
         .replace(/-/g, '_')

      // 예) ROUTE_ 로 시작하고 싶다면
      return `ROUTE_${baseName}` // 필요에 따라 '-'도 언더스코어로 바꿀 수 있습니다.
   },
   toConstantValue(filePath) {
      const segments = path
         .relative(PATHS.app, filePath)
         .replace(/[\\/]page\.tsx$/, '')
         .split(path.sep)
         .filter((segment) => !segment.includes('(') && !segment.includes(')'))

      // 세그먼트들을 합쳐서 실제 URL 경로로 만듦
      // segment가 없으면 루트('/')로 나오니, 필요시 예외 처리할 수도 있습니다.
      return '/' + segments.join('/')
   },

   traverseDirectory(dir, fileList = []) {
      try {
         const files = fs.readdirSync(dir)

         files.forEach((file) => {
            const filePath = path.join(dir, file)
            const stat = fs.statSync(filePath)

            if (stat.isDirectory()) {
               this.traverseDirectory(filePath, fileList)
            } else if (
               file === CONFIG.pageIdentifier &&
               filePath !== path.join(PATHS.app, CONFIG.pageIdentifier) &&
               !this.hasDynamicRoute(filePath) // 동적 라우트 체크
            ) {
               fileList.push(filePath)
            }
         })

         return fileList
      } catch (error) {
         console.error(`디렉토리 읽기 실패: ${dir}`, error)
         return fileList
      }
   },
}

async function generatePathConstants() {
   console.log('경로 상수 생성 시작...')

   const checks = [
      FileSystem.ensureDirectory(PATHS.root),
      FileSystem.ensureDirectory(PATHS.constants),
      FileSystem.ensureFile(PATHS.constantFile()),
   ]

   const hasErrors = checks.some((check) => !check.success)
   if (hasErrors) {
      console.error('초기 설정 중 오류 발생')
      checks.forEach((check) => {
         if (!check.success) console.error(check.message)
      })
      process.exit(1)
   }

   try {
      const pageFiles = PathProcessor.traverseDirectory(PATHS.app)
      const constants = pageFiles.map((filePath) => {
         const name = PathProcessor.toConstantName(filePath)
         const value = PathProcessor.toConstantValue(filePath)
         return `export const ${name} = "${value}";`
      })

      const fileContent = [
         '// 자동 생성된 경로 상수 - 수정하지 마세요',
         `// 생성 시간: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
         '// 동적 라우트([param])는 제외됨',
         '',
         ...constants,
         '',
      ].join('\n')

      const writeResult = FileSystem.writeFile(
         PATHS.constantFile(),
         fileContent,
      )

      if (!writeResult.success) {
         throw new Error(writeResult.message)
      }

      console.log(`✅ ${constants.length}개의 경로 상수가 생성되었습니다.`)
      console.log(`📁 파일 위치: ${PATHS.constantFile()}`)
   } catch (error) {
      console.error('❌ 경로 상수 생성 실패:', error)
      process.exit(1)
   }
}

generatePathConstants().catch(console.error)
