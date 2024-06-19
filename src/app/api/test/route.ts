export async function GET(request: Request) {
   const fakeResponse = {
      message: 'Hello from the API',
   }
   return new Response(JSON.stringify(fakeResponse), {
      headers: { 'Content-Type': 'application/json' },
   })
}

export async function POST(request: Request) {
   const body = await request.json()
   return new Response(JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' },
   })
}

export async function PATCH(request: Request) {
   const body = await request.json()
   return new Response(JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' },
   })
}

export async function DELETE(request: Request) {
   const body = await request.json()
   return new Response(JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' },
   })
}
