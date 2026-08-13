import { useState, useEffect } from "react";
import Form from "./components/Form";
import CountryService from "./services/countries";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchFilter, setSearchFilter] = useState(" ");
  useEffect(() => {
    CountryService.getAll().then((intiCount) => setCountries(intiCount));
  }, []);
  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchFilter.toLowerCase()),
  );
  const handleView=(country)=>{
   setSearchFilter(country.name.common)
  }
  return (
    <div>
      <Form searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
      <div>
        {
         countriesToShow.length >10? (  <p>Too many matches, specify another filter</p>): countriesToShow.length >1? (countriesToShow.map(country => (
          <p key={country.cca3}>{country.name.common} <button onClick={()=>handleView(country)}>Show</button></p>
        ))):countriesToShow.length === 1 ? (<div>
          <h1>{countriesToShow[0].name.common}</h1>
          <p>Capital {countriesToShow[0].capital}</p>
          <p>Area {countriesToShow[0].area}</p>
          <h1>Languages</h1>
          <ul>
            {Object.values(countriesToShow[0].languages || {}).map(lang => (
    <li key={lang}>{lang}</li>))}
          </ul>
          <div>
           <img src={countriesToShow[0]?.flags?.png || countriesToShow[0]?.flags?.svg} alt="Country flag" />
            </div>
        </div>):(<p>No countries match your search</p>)
        }
      </div>
    </div>
  );
};
export default App;
