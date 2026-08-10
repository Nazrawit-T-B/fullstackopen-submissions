
const Persons=({persons,searchFilter})=>{
     const personsToShow = searchFilter === ''
    ? persons
    : persons.filter(person => 
        person.name.toLowerCase().includes(searchFilter.toLowerCase())
      )
      const deletePersonWith=(persons)=>{
    confirm(`Delete ${persons.name}?`)
      
  }
    return(
        <ul>
          {personsToShow.map((p) => (
            <li key={p.id}>{p.name} {p.number} 
            <button onClick={()=>deletePersonWith(p)}> delete</button></li>
          ))}
        </ul>
    )
}
export default Persons