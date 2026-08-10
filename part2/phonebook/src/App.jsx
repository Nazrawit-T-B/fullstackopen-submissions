import { useState,useEffect } from "react";
import Form from './components/Form'
import Search from './components/Search'
import Persons from "./components/Persons";
import axios from 'axios';
import PersonService from './services/persons'
const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchFilter,setSearchFilter]=useState('')
  useEffect(()=>{
    console.log('effect')
    PersonService.getAll()
    .then(initialPerson=>
      setPersons(initialPerson)
    )  
  },[])
const deletePerson=(name)=>{
  if(confirm()){
    const person = persons.find((p) => p.name === name);
    const changedPerson = { ...person, important: !note.important };
    PersonService.update().then()
  }
}
  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Search searchFilter={searchFilter} setSearchFilter={setSearchFilter}/>
        <h2>add a new</h2>
        <Form persons={persons} setPersons={setPersons} />
        <h2>Numbers</h2>
        <Persons persons={persons} searchFilter={searchFilter} />
      </div>
    </>
  );
};
export default App;
