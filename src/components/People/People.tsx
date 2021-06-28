import React from 'react'

import { fetchJson } from '../../api'
import { PersonType } from '../../types'
import Person from '../Person'

function People() {
  const [people, setPeople] = React.useState<PersonType[]>([])

  async function getAll (allResponses: any){                             // reduce array of arrays into a singular array of results
    allResponses = allResponses.map((person: { results: object }) => person.results)
    return [].concat.apply([], allResponses)
  }

  React.useEffect(() => {
    fetchJson<{}>('people')
      .then(peopleResponse => getAll(peopleResponse))
      .then(result => setPeople(result))
  }, [])

  return (
    <div>
      {people.map(person => <Person person={person} />)}
    </div>
  )
}

export default People
