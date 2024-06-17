


export async function POST(request: Request) {
    request.headers.set('Content-Type', 'application/json')
   return Response.json(request)
}
