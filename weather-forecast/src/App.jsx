import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class="Container">
        <h1>Weather App</h1>
        <input type="text" id="locationInput" placeholder="Enter city name"/>
        <button id="searchButton">Search</button>
        <div class="weather-info">
            <h2>Weather</h2>
            <p>Temperature</p>
            <p>Description</p>
        </div>
      </div>
    </>
  )
}

export default App
