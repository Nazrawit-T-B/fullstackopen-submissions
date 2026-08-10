import {useState} from 'react'
import PersonService from '/src/services/persons'
const Form = ({persons,setPersons}) => {
     const [newName, setNewName] = useState("");
      const [newNumber, setNewNumber] = useState("");
       const AddInfo = (event) => {
    event.preventDefault();
    if (newName.trim() === "") return;
    if (persons.some((p) => p.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
      return;
    }
    const infoObject = {
      name: newName,
      number: newNumber,
      id:persons.length+1
    };
    PersonService.create(infoObject).then(returnedPerson=>{ setPersons(persons.concat(returnedPerson));
    setNewName("");
    setNewNumber("");})
   
  };
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };
  return (
    <form onSubmit={AddInfo}>
      <div>
        name:
        <input value={newName} onChange={handleNewName} />
        <div>
          number:
          <input value={newNumber} onChange={handleNewNumber} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default Form;
