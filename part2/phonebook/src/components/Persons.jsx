
const Persons=({persons,searchFilter})=>{
     const personsToShow = searchFilter === ''
    ? persons
    : persons.filter(person => 
        person.name.toLowerCase().includes(searchFilter.toLowerCase())
      )
    return(
        <ul>
          {personsToShow.map((p) => (
            <li key={p.id}>{p.name} {p.number}</li>
          ))}
        </ul>
    )
}
export default Persons