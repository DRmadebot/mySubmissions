import Content from './components/Content'
import Header from './components/Header'
import Total from './components/Total'


const Course = ({course}) =>{
    return(
    <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
    </div>
    )
}
export default Course