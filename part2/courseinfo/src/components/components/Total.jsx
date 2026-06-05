
const Total = (props)=>{
  return(
    <div>
      <h4>Total of {props.course.parts.map(part => part.exercises).reduce((accumulator, currentValue) => accumulator + currentValue, 0)} exercises</h4>
    </div>
  )
}
export default Total