// for resources with paginated results

export async function fetchJson<Response = any>(url: string, init?: RequestInit): Promise<Response> {
  
  let allResponses: any = []
  let nextPage: string = ''

  let response = await fetch(
    `https://swapi.dev/api/${url}`,
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

// for resources without pagination; designate wanted property

export async function fetchSingleJson<Response = any>(url: string, property: string, init?: RequestInit): Promise<Response> {               
  let response = await fetch(
    url,
    {
      ...init ?? {},
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(json => json[property])
  
  return response
}
