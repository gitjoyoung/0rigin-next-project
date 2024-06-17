export const dynamic = 'force-dynamic'
export async function GET(request: Request) {
   const userAgent = (await request)
      ? request.headers['user-agent']
      : navigator.userAgent
   console.log('GET request', userAgent)
   return Response.json('userAgent ' + userAgent)
}

export async function POST(request: Request) {
   return Response.json(request)
}

export async function PATCH(request: Request) {
   return Response.json(request)
}

export async function DELETE(request: Request) {
   return Response.json(request)
}
