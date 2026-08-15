import { useState, useEffect } from "react";
import Form from "./components/Form";
import CountryService from "./services/countries";
const WeatherDetail=({country})=>{
     const [weather, setWeather] = useState(null);
  useEffect(() => {

    if (country.capital && country.capital.length > 0) {
      CountryService.getWeatherData(country.capital[0])
        .then((data) => {
          setWeather(data);
        })
        .catch((err) => console.error("Error fetching weather:", err));
    }
  }, [country]);
  if (!weather) {
    return <p>Loading weather...</p>;
  }
  return (
    <div>
      <h1>Weather in {country.name.common}</h1>
             <p>Tempreture {weather.main?.temp}</p>
             <p>Wind {weather.wind?.speed}</p>
    </div>
  )
  }
const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
 
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
             <WeatherDetail country={countriesToShow[0]}/>
        </div>):(<p>No countries match your search</p>)
        }
      </div>
    </div>
  );
};
export default App
