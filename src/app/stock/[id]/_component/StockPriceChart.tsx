'use client'
import {
   Area,
   AreaChart,
   CartesianGrid,
   ResponsiveContainer,
   Tooltip,
   XAxis,
   YAxis,
} from 'recharts'

interface Props {
   data?: any
}
export default function StockPriceChart({ data }: Props) {
   data = [
      {
         name: 'Page A',
         uv: 4000,
         pv: 2400,
         amt: 2400,
      },
      {
         name: 'Page B',
         uv: 3000,
         pv: 1398,
         amt: 2210,
      },
      {
         name: 'Page C',
         uv: 2000,
         pv: 9800,
         amt: 2290,
      },
      {
         name: 'Page D',
         uv: 2780,
         pv: 3908,
         amt: 2000,
      },
      {
         name: 'Page E',
         uv: 1890,
         pv: 4800,
         amt: 2181,
      },
      {
         name: 'Page F',
         uv: 2390,
         pv: 3800,
         amt: 2500,
      },
      {
         name: 'Page G',
         uv: 3490,
         pv: 4300,
         amt: 2100,
      },
   ]
   return (
      <div className="flex flex-col gap-3 p-8">
         <h1 className="font-bol text-2xl">주가 차트</h1>
         <ResponsiveContainer width={500} height={250}>
            <AreaChart
               width={500}
               height={400}
               data={data}
               margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
               }}
            >
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="name" ticks={['Page A','Page A', 'Page D', 'Page G']} />
               {/* <YAxis /> */}
               <Tooltip />
               <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fill="green"
               />
            </AreaChart>
         </ResponsiveContainer>
      </div>
   )
}
