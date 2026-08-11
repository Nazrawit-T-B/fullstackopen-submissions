import { useState } from "react";
import PersonService from "/src/services/persons";
const Form = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const AddInfo = (event) => {
    event.preventDefault();
    if (newName.trim() === "") return;
    const infoObject = {
      name: newName,
      number: newNumber
    };
    const existingPerson = persons.find((p) => p.name === newName);
    if (existingPerson) {
      if (
        confirm(
          `${newName} is already added to the phonebook,replace the old number with a new one?`,
        )
      ) {
        const updatedObject = { ...existingPerson, number: newNumber };
        PersonService.update(existingPerson.id, updatedObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === existingPerson.id ? returnedPerson : p,
              ),
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            alert(
              `Information of '${existingPerson.name}' has already been removed from server`,
            );
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
    }else{
       PersonService.create(infoObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
    }
   
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
