import {useState} from 'react';
const Display=({counter})=>{
  return (
    <div>
      {counter}
    </div>
  )
}

const Button=({onClick, text})=>{
  return (
    <button onclick={onClick}>
      {text}
    </button>
  )
}
const App=()=>{
  
  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)
  const [counter,setCounter]=useState(0);
  return (
    <div>
      <Display counter={counter}/>
      <Button onClick={increaseByOne} text='plus'/>
      <Button onClick={setToZero} text='zero'/>
      <Button onClick={decreaseByOne} text='minus'/>
     
    </div>
    
  )
}
export default App