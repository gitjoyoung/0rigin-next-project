import type { Metadata } from 'next'

export const metadata: Metadata = {
   // 기본 페이지 제목 설정
   // default: 기본 제목 (타이틀이 지정되지 않았을 때 사용)
   // template: 동적 제목 템플릿 (%s는 페이지별 제목으로 대체됨)
   // absolute: 템플릿을 무시하고 절대적인 제목 사용
   title: {
      default: '기본 제목',
      template: '%s | 사이트 이름',
      absolute: '절대 제목',
   },

   // 페이지 설명 (검색 결과에 표시되는 설명)
   description: '페이지 설명',

   // 검색 엔진 최적화를 위한 키워드
   keywords: ['키워드1', '키워드2', '키워드3'],

   // 브라우저 탭, 북마크 등에 표시되는 아이콘
   icons: {
      icon: '/favicon.ico', // 기본 파비콘
      shortcut: '/shortcut-icon.png', // 바로가기 아이콘
      apple: '/apple-icon.png', // iOS 디바이스용 아이콘
      other: {
         rel: 'apple-touch-icon-precomposed',
         url: '/apple-touch-icon-precomposed.png',
      },
   },

   // Facebook, LinkedIn 등 소셜 미디어에서 공유될 때 표시되는 정보
   openGraph: {
      title: '소셜 미디어 공유 제목', // 공유 시 표시되는 제목
      description: '소셜 미디어 공유 설명', // 공유 시 표시되는 설명
      url: 'https://example.com', // 공유될 URL
      siteName: '사이트 이름', // 사이트 이름
      images: [
         // 공유 시 표시될 이미지
         {
            url: 'https://example.com/og-image.jpg',
            width: 800, // 이미지 너비
            height: 600, // 이미지 높이
            alt: '이미지 설명', // 이미지 대체 텍스트
         },
      ],
      locale: 'ko_KR', // 언어 및 지역 설정
      type: 'website', // 콘텐츠 유형
   },

   // Twitter에서 공유될 때 표시되는 정보
   twitter: {
      card: 'summary_large_image', // 카드 유형
      title: '트위터 공유 제목', // 트위터 공유 시 제목
      description: '트위터 공유 설명', // 트위터 공유 시 설명
      images: ['https://example.com/twitter-image.jpg'], // 트위터 공유 이미지
      creator: '@username', // 콘텐츠 작성자
   },

   // 검색 엔진 크롤링 및 색인화 설정
   robots: {
      index: true, // 페이지 색인 허용 여부
      follow: true, // 링크 따라가기 허용 여부
      nocache: true, // 캐시 사용 여부
      googleBot: {
         // Google 봇 전용 설정
         index: true,
         follow: true,
         'max-video-preview': -1, // 비디오 미리보기 최대 길이
         'max-image-preview': 'large', // 이미지 미리보기 크기
         'max-snippet': -1, // 스니펫 최대 길이
      },
   },

   // 대체 URL 및 언어 설정
   alternates: {
      canonical: 'https://example.com', // 표준 URL
      languages: {
         // 다국어 지원
         'ko-KR': 'https://example.com/ko',
         'en-US': 'https://example.com/en',
      },
   },

   // 검색 엔진 소유권 확인
   verification: {
      google: 'google-site-verification-code', // Google 검색 콘솔
      yandex: 'yandex-verification-code', // Yandex 웹마스터
      yahoo: 'yahoo-verification-code', // Yahoo 검색
   },

   // 모바일 앱 연동
   appLinks: {
      ios: {
         url: 'https://example.com/ios', // iOS 앱 URL
         app_store_id: '123456789', // App Store ID
      },
      android: {
         url: 'https://example.com/android', // Android 앱 URL
         package: 'com.example.app', // 패키지 이름
      },
   },

   // 사용자 정의 메타 태그
   other: {
      'custom-meta': 'custom value', // 커스텀 메타 태그
   },

   // 모바일 뷰포트 설정
   viewport: {
      width: 'device-width', // 디바이스 너비에 맞춤
      initialScale: 1, // 초기 확대/축소 비율
      maximumScale: 1, // 최대 확대/축소 비율
      userScalable: false, // 사용자 확대/축소 허용 여부
   },

   // 브라우저 테마 색상
   themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'white' }, // 라이트 모드
      { media: '(prefers-color-scheme: dark)', color: 'black' }, // 다크 모드
   ],

   // PWA(Progressive Web App) 설정
   manifest: '/manifest.json', // PWA 매니페스트 파일
   appleWebApp: {
      capable: true, // iOS 웹 앱 지원
      title: '앱 제목', // iOS 웹 앱 제목
      statusBarStyle: 'black-translucent', // 상태바 스타일
   },

   // 아카이브 링크
   archives: ['https://example.com/archive'], // 아카이브 페이지 URL

   // 콘텐츠 카테고리
   category: 'technology', // 사이트 카테고리

   // 콘텐츠 분류
   classification: 'Business', // 콘텐츠 분류
}
