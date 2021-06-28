import React from 'react'

import { fetchJson } from '../../api'
import { PersonType } from '../../types'
import Person from '../Person'

function People() {
  const [people, setPeople] = React.useState<PersonType[]>([])
  const [search, setSearch] = React.useState<string>('')

  async function getAll (allResponses: any){                                                    // reduce array of arrays into a singular array of results
    allResponses = allResponses.map((person: { results: object }) => person.results)
    return [].concat.apply([], allResponses)
  }

  React.useEffect(() => {
    fetchJson<{}>('people')
      .then(peopleResponse => getAll(peopleResponse))
      .then(result => setPeople(result))
  }, [])

  function handleSearch(event: { preventDefault: () => void }){
    event.preventDefault()                                                                
    fetchJson<{}>(`people/?search=${search}`)                                                   // uses swapi's search parameter to filter resources
      .then(peopleResponse => getAll(peopleResponse))
      .then(result => setPeople(result))
  }

  function handleSearchChange(event: { target: { value: React.SetStateAction<string> } }){
    setSearch(event.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="search any character!"
          value={search}
          onChange={handleSearchChange}
          name="Search"
        />
        <input type="submit" value="Submit"/>
      </form>

      {people.map(person => <Person person={person} />)}
    </div>
  )
}

export default People
