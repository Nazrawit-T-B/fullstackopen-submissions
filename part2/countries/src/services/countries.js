import axios from 'axios';
const API_KEY= import.meta.env.VITE_API_KEY;
const baseUrl = "https://studies.cs.helsinki.fi/restcountries";
const getAll=()=>{
    const request=axios.get(`${baseUrl}/api/all`)
    return request.then((response)=>response.data)
}
const searchByName=(name)=>{
    const request=axios.get(`${baseUrl}/api/name/${name}`)
    return request.then((response)=>response.data)
}
const getWeatherData=(city)=>{
    const request=axios.get("https://api.openweathermap.org/data/2.5/weather",{
        params:{
            q:city,
            appid:API_KEY,
            units: 'metric'
        }
    })
    return request.then((response)=>response.data.main.temp)
}
const getWind=(city)=>{
    const request=axios.get("https://api.openweathermap.org/data/2.5/weather",{
        params:{
            q:city,
            appid:API_KEY,
            units: 'metric'
        }
    })
    return request.then((response)=>response.data.wind.deg)
}
export default{getAll,searchByName,getWeatherData,getWind};