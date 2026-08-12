import axios from 'axios';
const baseUrl = "https://studies.cs.helsinki.fi/restcountries";
const getAll=()=>{
    const request=axios.get(`${baseUrl}/api/all`)
    return request.then((response)=>response.data)
}
const searchByName=(name)=>{
    // for a single full on search 
    const request=axios.get(`${baseUrl}/api/name/${name}`)
    return request.then((response)=>response.data)
}
export default{getAll,searchByName};