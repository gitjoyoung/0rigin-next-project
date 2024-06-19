interface Props {
   params: {
      id: string
   }
}
export default function page({ params }: Props) {
   const { id } = params
   
   return <div>page</div>
}
