import { useState } from 'react'

const StatisticLine = ({text, value})=>{
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({onClick, text})=>{
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics =({good, neutral, bad, average, positive})=>{
  if (good === 0 && neutral===0 && bad===0){
    return(
      <div><p>No feedback given</p></div>
    )
  }
  return(
  <div>
    <table>
      <tbody>
        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral}/>
        <StatisticLine text='bad' value={bad}/>
        <StatisticLine text='all' value={good+bad+neutral}/>
        <StatisticLine text='average' value={average}/>
        <tr>
          <td>positive</td>
          <td>{positive} %</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodButton = ()=>{
    setGood(good+1)
  }

  const neutralButton = ()=>{
    setNeutral(neutral+1)
  }

  const badButton = ()=>{
    setBad(bad+1)
  }
  const average = (good-bad)/(good+bad+neutral)
  const positive = (good*100)/(good+bad+neutral)
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick = {goodButton} text='good'/>
      <Button onClick = {neutralButton} text='netural'/>
      <Button onClick = {badButton} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} average={average} positive={positive}/>

    </div>
  )
}

export default App