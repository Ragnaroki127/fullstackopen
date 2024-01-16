import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({country}) => {
  const [weather, setWeather] = useState({})

  const hook = () => {
    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]}&limit=1&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        const lat = response.data[0].lat
        const lon = response.data[0].lon
        
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`)
      })
      .then(response => {
        setWeather(response.data)
      })
  }

  useEffect(hook, [country])

  return (
    <div>
      {weather !== undefined && Object.entries(weather).length !== 0 && (
        <>
          <h2>Weather in {country.capital[0]}</h2>
          <p>temperature {(weather.main.temp - 273.15).toFixed(2)} degrees Celcius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt=""/>
          <p>wind {weather.wind.speed} m/s</p>
        </>
      )}
      
    </div>
  )
}  


const CountryInfo = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages</h3>
      <ul key={country.name.common}>
        {Object.values(country.languages).map(elem => <li key={country.name.common}>{elem}</li>)}
      </ul>
      <img src={country.flags.png} alt="" />
      <Weather country={country} />
    </div>
  )
}

const Entry = ({country}) => {
  const [show, setShow] = useState(false)

  const handleBtnShow = () => {
    setShow(!show)
  }

  return (
    <div>
      <p>{country.name.common}</p>
      <button onClick={handleBtnShow}>show</button>
      {show && (<CountryInfo country={country} />)}
    </div>
  )
}

const Countries = ({countries, searchCountry}) => {
  if (searchCountry === '') return (
    <div>
      <p>Please enter the country you are trying to find</p>
    </div>
  )
  const showCountries = countries.filter(country => country.name.common.toLowerCase().indexOf(searchCountry.toLowerCase()) !== -1)

  if (showCountries.length > 10) {
    return (
      <div>
        <p>Too many countries, please specify another filter</p>
      </div>
    )
  } else if (showCountries.length === 0) {
    return (
      <div>
        <p>Your request does not match any country in our database</p>
        <p>Please try again</p>
      </div>
    )
  } else {
    return (
      <div>
        {showCountries.map(country => {
          return (
            <div key={country.name.common}>
              <Entry country={country} />
            </div>
          )
        })}
      </div>
    )
  }
}

const App = () => {
  const [searchCountry, setSearchCountry] = useState('')
  const [countries, setCountries] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      }, [])
  }

  useEffect(hook, [])

  const handleSearchCountry = (event) => {
    setSearchCountry(event.target.value)
  }

  return (
    <div>
      <form>
        find countries: <input value={searchCountry} onChange={handleSearchCountry} />
      </form>
      <div>
        <Countries countries={countries} searchCountry={searchCountry} />
      </div>
    </div>
  )
}

export default App;
