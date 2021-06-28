import React from 'react'

import { PersonType } from '../../types';
import { fetchJson, fetchSingleJson } from '../../api'

interface PersonProps {
  person: PersonType
}

function Person({ person }: PersonProps) {
  const [species, setSpecies] = React.useState<string>('')
  const [films, setFilms] = React.useState<string[]>([])

  async function getSpecies (url: string){
    let speciesUrl = await fetchSingleJson<{}>(url, "species")
      .then(res => res.toString())

    if (speciesUrl == ''){                                                    // human characters don't have species url so we need to add it manually
      speciesUrl = 'https://swapi.dev/api/species/1'
    }
    
    await fetchSingleJson<{}>(speciesUrl, "name")
      .then(res => res.toString())
      .then(res => setSpecies(res))

    let filmsUrl = await fetchSingleJson<[]>(url, "films")
    
    let allFilms: string[] = []
    for (let film of filmsUrl){
      await fetchSingleJson<string>(film, "title")
        .then(res => allFilms.push(res))
    }
    setFilms(allFilms)
  }


  return (
    <div>
      <a onClick={() => getSpecies(person.url)}>{person.name}</a>
      {species}
      <ul>
        {films.map(film => <li>{films}</li>)}
      </ul>
    </div>
  )
}

export default Person
