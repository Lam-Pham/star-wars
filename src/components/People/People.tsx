import React from 'react'

import { fetchJson } from '../../api'
import { PersonType } from '../../types'
import Person from '../Person'
import Search from '../Search'

function People() {
  const [people, setPeople] = React.useState<PersonType[]>([])
  const [search, setSearch] = React.useState<string>('')

  async function getAll (responses: any){                                                       // reduce array of arrays into a singular array of results
    responses = responses.map((person: { results: object }) => person.results)
    return [].concat.apply([], responses)
  }

  React.useEffect(() => {
    fetchJson<{}>('people')
      .then(peopleResponse => getAll(peopleResponse))
      .then(result => setPeople(result))
  }, [])

  function handleSearch(event: { preventDefault: () => void }){
    event.preventDefault()
    if(search == ''){                                                                            // an empty search fetches all people
      fetchJson<{}>('people')
        .then(peopleResponse => getAll(peopleResponse))
        .then(result => setPeople(result))
    } else {                                                  
      fetchJson<{}>(`people/?search=${search}`)                                                  // uses swapi's search parameter to filter resources
        .then(peopleResponse => getAll(peopleResponse))
        .then(result => setPeople(result))
    }    
  }

  function handleSearchChange(event: { target: { value: React.SetStateAction<string> } }){
    setSearch(event.target.value)
  }

  return (
    <div>
      <h1>STAR WARS CHARACTERS</h1>
      <p>Note: Click on a character's name to view species and film appearances!</p>
      
      <Search
        handleSubmit={handleSearch}
        handleChange={handleSearchChange}
        search={search}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Species</th>
            <th>Film Appearances</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => <Person person={person} />)}
        </tbody>
      </table>
    </div>
  )
}

export default People
