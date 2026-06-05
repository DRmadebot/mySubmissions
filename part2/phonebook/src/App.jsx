import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]=useState('')
  const [newFilter,setNewFilter]=useState('')

  useEffect(()=>{
    personService
    .getAll()
    .then(newPersons=>{
      setPersons(newPersons)
    })
  },[])

  const handleNewName = (event)=>{
    setNewName(event.target.value)
  }
  const handleNewNumber=(event)=>{
    setNewNumber(event.target.value)
  }
  const handleNewFilter=(event)=>{
    setNewFilter(event.target.value)
  }


  const addNewPerson=(event)=>{
    event.preventDefault()
    const personNames = persons.map(person=>person.name)
    if (!personNames.includes(newName)){
      const newPerson = {name:newName, number:newNumber,}
      
    personService
    .create(newPerson)
    .then(returnedPerson=>{
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
      
    }
    else{
      const PERSON = persons.find(person=>person.name===newName)
      if (confirm(`${PERSON.name} is already added to the phonebook, replace the old number with a new one?`)){
        const updatedPerson = {...PERSON, number:newNumber}
        personService
        .update(PERSON.id,updatedPerson)
        .then(returnedPerson=>{
          setPersons(persons.map(person=>person.id===PERSON.id?updatedPerson:person))
        })
        setNewName('')
        setNewNumber('')
      }
    }
  }

  const deletePerson=(id)=>{
    if (persons.map(person=>person.id).includes(id)){
      const person_name=persons.find(person=>person.id===id).name
      const confirmed=confirm(`delete ${person_name} ?`)
      if(confirmed){
        personService
        .remove(id)
        .then(returnedPerson=>{
          setPersons(persons.filter(n=>n.id!==id))
        })        
      }
    }
    else{
      alert('Person does not exist')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter}/>
      <h1>Add a new</h1>
      <PersonForm newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} addNewPerson={addNewPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App