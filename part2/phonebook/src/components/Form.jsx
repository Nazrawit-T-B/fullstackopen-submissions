import { useState } from "react";
import PersonService from "/src/services/persons";

const Form = ({ persons, setPersons, setMessage }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({}), 5000);
  };

  const AddInfo = (event) => {
    event.preventDefault();
    if (newName.trim() === "") return;

    const infoObject = { name: newName, number: newNumber };
    const existingPerson = persons.find((p) => p.name === newName);

    if (existingPerson) {
      if (
        confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`,
        )
      ) {
        PersonService.update(existingPerson.id, {
          ...existingPerson,
          number: newNumber,
        })
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === existingPerson.id ? returnedPerson : p,
              ),
            );
            setNewName("");
            setNewNumber("");
            showMessage(`Updated ${returnedPerson.name}`, "success");
          })
          .catch((error) => {
            if (error.response?.status === 404) {
              showMessage(
                `Information of ${existingPerson.name} has already been removed from server`,
                "error",
              );
              setPersons(persons.filter((p) => p.id !== existingPerson.id));
            } else {
              showMessage(
                error.response?.data?.error || "Something went wrong",
                "error",
              );
            }
          });
      }
    } else {
      PersonService.create(infoObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          showMessage(`Added ${returnedPerson.name}`, "success");
        })
        .catch((error) => {
          showMessage(
            error.response?.data?.error || "Something went wrong",
            "error",
          );
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