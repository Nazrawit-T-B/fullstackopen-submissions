import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    {name:"Ada Lovelace", number:"39-44-5323523" ,id:2},
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchFilter,setSearchFilter]=useState('')
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
    setPersons(persons.concat(infoObject));
    setNewName("");
    setNewNumber("");
  };
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearch=(event)=>{
    setSearchFilter(event.target.value)
  }
  const personsToShow = searchFilter === ''
    ? persons
    : persons.filter(person => 
        person.name.toLowerCase().includes(searchFilter.toLowerCase())
      )
  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <label>filter shown with </label>
        <input value={searchFilter}onChange={handleSearch}/>
        <h2>add a new</h2>
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
        <h2>Numbers</h2>
        <ul>
          {personsToShow.map((p) => (
            <li key={p.id}>{p.name} {p.number}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default App;
