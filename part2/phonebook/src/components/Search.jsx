const Search = ({searchFilter,setSearchFilter}) => {
    
  const handleSearch=(event)=>{
    setSearchFilter(event.target.value)
  }
  return (
    <>
      <label>filter shown with </label>
      <input value={searchFilter} onChange={handleSearch} />
    </>
  );
};
export default Search;
