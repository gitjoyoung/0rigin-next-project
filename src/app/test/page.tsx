export default async function page() {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
      cache: 'no-store',
   })

   const resJson = await res.json()
   console.log(resJson)
   return <div>{JSON.stringify(resJson)}</div>
}
