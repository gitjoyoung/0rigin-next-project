interface Props {
   title: string
   stock: string
}
/**
 * @param {string} title - 주식 이름
 * @param {string} stock - 주식 코드
 */
export default function StockIconAndTitle({ title, stock }: Props) {
   return (
      <div className="flex items-center justify-start gap-2">
         <div>
            <svg
               width="34"
               height="34"
               viewBox="0 0 34 34"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <circle cx="16.7908" cy="16.7869" r="16.7869" fill="black" />
               <path
                  d="M23.4607 19.6744C23.0537 20.5968 22.8576 21.0091 22.3341 21.8231C21.6012 22.9607 20.5675 24.3811 19.2905 24.3902C18.1535 24.4007 17.8601 23.6333 16.3162 23.6468C14.7737 23.6544 14.4522 24.4052 13.3138 24.3932C12.0353 24.3811 11.0576 23.1021 10.3247 21.9661C8.275 18.7806 8.05823 15.046 9.32494 13.0598C10.2215 11.6514 11.6386 10.8238 12.9702 10.8238C14.3269 10.8238 15.1792 11.5837 16.2999 11.5837C17.3882 11.5837 18.0503 10.8223 19.6193 10.8223C20.8049 10.8223 22.0584 11.4813 22.9549 12.6189C20.0234 14.259 20.4997 18.5309 23.4607 19.6744ZM18.4278 9.55081C18.9985 8.80298 19.4321 7.74818 19.2743 6.67383C18.3438 6.73853 17.2555 7.34492 16.6199 8.13038C16.0434 8.84662 15.5656 9.90893 15.7514 10.9366C16.7674 10.9697 17.8188 10.3513 18.4278 9.55081Z"
                  fill="white"
               />
            </svg>
         </div>
         <h1 className="font-bold"> {title}</h1>
         <span>∙</span>
         <sub>{stock}</sub>
      </div>
   )
}
