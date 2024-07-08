import StockIconAndTitle from "./common/StockIconAndTitle"
import StockPriceAndChange from "./common/StockPriceAndChange"

export default function StockHeader() {
   const data = {
      title: '애플',
      stock: 'AAPL',
      price: 1000,
      fluctuation: 1.75,
      changeRate: 0.82,
   }
   return (
      <div className="flex flex-col">
         <StockIconAndTitle title="애플" stock="AAPL" />
         <StockPriceAndChange
            price={data.price}
            fluctuation={data.fluctuation}
            changeRate={data.changeRate}
         />
      </div>
   )
}
