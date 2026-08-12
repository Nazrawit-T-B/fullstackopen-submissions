import CountryService from "/src/services/countries";
const Form = ({searchFilter,setSearchFilter}) => {
    const handleSearch=(event)=>{
        setSearchFilter(event.target.value);
    }
  return (
    <form onSubmit={(e)=>e.preventDefault()} >
      <div>
        find countries:  
        <input value={searchFilter} onChange={handleSearch} className="input-field" />
      </div>
    </form>
  );
};
export default Form;
