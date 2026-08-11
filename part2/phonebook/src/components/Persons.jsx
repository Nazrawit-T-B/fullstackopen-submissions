const Persons = ({ persons, searchFilter,deletePerson }) => {
  const personsToShow =
    searchFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(searchFilter.toLowerCase()),
        );
  return (
    <ul>
      {personsToShow.map((p) => (
        <li key={p.id}>
          {p.name} {p.number}
          <button onClick={() => deletePerson(p.id)}> delete</button>
        </li>
      ))}
    </ul>
  );
};
export default Persons;
