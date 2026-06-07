import { useState, useEffect} from 'react'
import axios from 'axios'
const apiKey = import.meta.env.VITE_SOME_KEY

const Languages = ({country})=>{
  return(
    Object.values(country.languages).map(language=><li key={language}>{language}</li>)
  )
}



const CountriesToShow = ({filteredCountries, showThisCountry, weather})=>{
  if(filteredCountries.length>10){
    return(
      <li>
        Too many matches, specify another filter
      </li>
    )
  }
  if(filteredCountries.length==1){
    const country = filteredCountries[0]
    return(
      
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h1>languages</h1>
        <ul>
          <Languages country={country}/>
        </ul>
        <img src={country.flags.png} alt={`flag of ${country.name.common}`}/>
        <h1>Weather in {country.capital}</h1>
        {weather.main?(
          <div>
          <p>Temperature {weather.main.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
          <p>Wind {weather.wind.speed} m/s</p>
          </div>
        ):(<p>loading weather...</p>)}
        
      </div>
    )
  }
  return(
   filteredCountries.map(country=><li key={country.cca3}>{country.name.common} <button onClick={()=>showThisCountry(country)}>show</button></li>)
  )
}

const App = () => {
  const [countries,setCountries]=useState([])
  const [newCountry,setNewCountry]=useState('')
  const [weather, setWeather]=useState([])
  
  const showThisCountry = (country)=>{
    setNewCountry(country.name.common)
  }
  const handleNewCountry = (event)=>{
    event.preventDefault()
    setNewCountry(event.target.value)
  }
  const filter=newCountry
  const filteredCountries=countries.filter(country=>country.name.common.toLowerCase().includes(filter.toLowerCase()))
  useEffect(()=>{
  axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountries(response.data)
    })
  },[])
  useEffect(()=>{
    if (filteredCountries.length===1){
      const country = filteredCountries[0]
      const lat= country.capitalInfo.latlng[0]
      const lng= country.capitalInfo.latlng[1]
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`)
      .then(response=>{
        setWeather(response.data)
      })
    }
  },[filteredCountries])
  
  return (
    <div>
      <form>
        <input value={newCountry} onChange={handleNewCountry}/>
      </form>
      <CountriesToShow filteredCountries={filteredCountries} showThisCountry={showThisCountry} weather={weather}/>
    </div>
  )
}

export default App