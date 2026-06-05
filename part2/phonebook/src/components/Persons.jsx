const Persons = ({persons, filter, deletePerson})=>{
  if(filter===''){
    return(
    persons.map(person=>
    <li key={person.id}>
      {person.name} {person.number}
      <button onClick={()=>deletePerson(person.id)}>delete</button>
    </li>)
    )
  }
  else{
    const personsToShow = []
    for (const person of persons){
      if(person.name.toLowerCase().includes(filter.toLowerCase())){
        personsToShow.push(person)
      }
    }
    return(
      personsToShow.map(person=>
      <li key={person.id}>
        {person.name} {person.number}
        <button onClick={()=>deletePerson(person.id)}>delete</button>
      </li>)
    )
  }   
}

export default Persons