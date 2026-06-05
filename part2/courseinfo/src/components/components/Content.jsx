const Part = ({part}) =>{
  return(
    <li>
        {part.name} {part.exercises}
    </li>
  )
}


const Content = ({course})=>{
  return(
    <div>
        {course.parts.map(part => <Part part={part} key={part.id}/>)}
    </div>
  )  
}
export default Content