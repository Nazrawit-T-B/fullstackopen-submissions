import { useState,useEffect } from "react";
import Form from './components/Form'
import Search from './components/Search'
import Persons from "./components/Persons";
import axios from 'axios';
const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchFilter,setSearchFilter]=useState('')
  useEffect(()=>{
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response=>{
      console.log('promise fulfilled')
      setPersons(response.data)
    })  
  },[])
   console.log('render',persons.length,'persons')
  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Search searchFilter={searchFilter} setSearchFilter={setSearchFilter}/>
        <h2>add a new</h2>
        <Form persons={persons} setPersons={setPersons}/>
        <h2>Numbers</h2>
        <Persons persons={persons} searchFilter={searchFilter}/>
      </div>
    </>
  );
};
export default App;
