import { useState, useEffect, use } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'
import './index.css'



const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]=useState('')
  const [newFilter,setNewFilter]=useState('')
  const [message, setMessage]=useState(null)
  const [error, setError]=useState(null)

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
      setMessage(`added ${newPerson.name}`)
      setNewName('')
      setNewNumber('')
    
    })      
    .catch(error=>{
      setError(error.response.data.error)
      setTimeout(() => {
        setError(null)
      }, 5000)
    })
    }
    else{
      const PERSON = persons.find(person=>person.name===newName)
      if (confirm(`${PERSON.name} is already added to the phonebook, replace the old number with a new one?`)){
        const updatedPerson = {...PERSON, number:newNumber}
        personService
        .update(PERSON.id,updatedPerson)
        .then(returnedPerson=>{
          setPersons(persons.map(person=>person.id===PERSON.id?returnedPerson:person))
          setMessage(`number of ${PERSON.name} changed`)
        })
        .catch(error=>{
          if (error.response && error.response.data.error){
            setError(error.response.data.error)
            setTimeout(() => {
              setError(null)
            }, 5000)
          }
          else{
            setError(`Information of ${PERSON.name} has already been removed from the server`)
            setTimeout(() => {
              setError(null)
            }, 5000)
          }
        })
        setNewName('')
        setNewNumber('')
      }
    }
    setTimeout(()=>{setMessage(null)},5000)

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
          setMessage(`${person_name} deleted`)
        })
        .catch(()=>{
          setError(`information of ${person_name} does not exist in the server`)
        })        
      }
    }
    else{
      alert('Person does not exist')
    }
    setTimeout(()=>{setMessage(null)},5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Error message={error}/>
      <Notification message={message}/>
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter}/>
      <h1>Add a new</h1>
      <PersonForm newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} addNewPerson={addNewPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App