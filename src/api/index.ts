export async function fetchJson<Response = any>(url: string, init?: RequestInit): Promise<Response> {
  
  let allResponses: any = []
  let nextPage: string = ''

  let response = await fetch(
    `https://swapi.dev/api/${url}/`,
    {
      ...init ?? {},
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())

  nextPage = await response.next
  allResponses.push(response)

  while(nextPage){
    response = await fetch(
      nextPage,
      {
        ...init ?? {},
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
        .then(res => res.json())
    nextPage = await response.next
    allResponses.push(response)
  }

  return allResponses
}
