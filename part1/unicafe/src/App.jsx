import {useState} from 'react'
const Statistics=({good,neutral, bad,all})=>{
  if (all === 0){
    return <p>No feedback given</p>
  }else{
    return (
    <>
    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={(good-bad)/all}/>
      <StatisticLine text="positive" value={`${(good/all)*100} %`}/>
      </tbody>
    </table>
    </>
  )
  }
}
const StatisticLine =({text,value})=>{
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>

  )
}

const Button=({text, onClick})=>{
  return <button onClick={onClick}>{text}</button>
}

const App=()=>{
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll]=useState(0)
  const handleGoodClick=()=>{
    setGood(good+1)
    setAll(all+1)
  }
  const handleNeutralClick=()=>{
    setNeutral(neutral+1)
    setAll(all+1)
  }
  const handleBadClick=()=>{
    setBad(bad+1)
    setAll(all+1)
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={handleGoodClick}/>
      <Button text="neutral" onClick={handleNeutralClick}/>
      <Button  text="bad" onClick={handleBadClick}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    
    </div>
  )
}


export default App