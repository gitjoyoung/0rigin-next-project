export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {
   const userAgent = (await request)
      ? request.headers['user-agent']
      : navigator.userAgent
   console.log('GET request', userAgent)
}
