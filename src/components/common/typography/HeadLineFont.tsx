interface Props {
   bgColor?: string
   children?: React.ReactNode
   width?: string
   height?: string
   padding?: boolean
   className?: string
}
/**
 * 기본 배경 색상이 white인 라운드 2xl(16px) 카드 컴포넌트
 *  패딩은 8로 설정되어 있음 padding 옵션을 true로 설정하면 패딩이 8로 설정됨
 *  배경색, 가로 , 높이 , children 설정 을 인자로 받음 모두 옵셔널
 *  가로 최소 320px 지정 width값이 320보다 작아도 320으로 고정
 * @param {string | null} bgColor - 카드 배경 색상
 * @param {string | null} width - 카드 너비
 * @param {string | null} height - 카드 높이
 * @param {boolean} padding - 카드 패딩 여부 기본값은 false
 * @param {React.ReactNode | null} children - 카드 안에 들어갈 내용
 * 사용 예시 : <CardWrap bgColor="red" width="320px" height="240px">내용</CardWrap>
 */
export default function CardWrap({
   bgColor = 'white',
   width = '320px',
   height = '240px',
   padding = false,
   className,
   children,
}: Props) {
   return (
      <>
         {/* 기본 스타일  배경은 흰색, 라운드는 2xl, 패딩은 8*/}
         <article
            className={`rounded-2xl ${padding && 'p-8'} ${className}`}
            style={{
               backgroundColor: bgColor,
               width,
               height,
            }}
         >
            {children}
         </article>
      </>
   )
}
