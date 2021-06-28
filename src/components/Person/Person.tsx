import { PersonType } from '../../types';

interface PersonProps {
  person: PersonType
}

function Person({ person }: PersonProps) {
  return (
    <div>
      {person.name}
      {person.species}
    </div>
  )
}

export default Person
