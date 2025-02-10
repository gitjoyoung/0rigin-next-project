export const fetchSearchStorage = async (keyword) =>
   await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search/`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyword }),
   })
