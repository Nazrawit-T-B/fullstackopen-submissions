import { useState, useEffect } from "react";
import Form from "./components/Form";
import Search from "./components/Search";
import Persons from "./components/Persons";
import axios from "axios";
import PersonService from "./services/persons";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [message,setMessage]=useState({});
  useEffect(() => {
    console.log("effect");
    PersonService.getAll().then((initialPerson) => setPersons(initialPerson));
  }, []);
  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (confirm(`Delete ${person.name}?`)) {
      PersonService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id))
      });
    }
  };
  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Notification message={message}/>
        <Search searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
        <h2>add a new</h2>
        <Form persons={persons} setPersons={setPersons} setMessage={setMessage} />
        <h2>Numbers</h2>
        <Persons
          persons={persons}
          searchFilter={searchFilter}
          deletePerson={deletePerson}
        />
      </div>
    </>
  );
};
export default App;
