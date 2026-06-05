
const PersonForm = (props)=>{
  return(
  <form>
    <div>
      name: <input value={props.newName} onChange={props.handleNewName} />
    </div>
    <div>
      number: <input value={props.newNumber} onChange={props.handleNewNumber} />
    </div>
    <div>
      <button type="submit" onClick={props.addNewPerson}>add</button>
    </div>
  </form>
  )
}
export default PersonForm