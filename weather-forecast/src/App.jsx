import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/weather?city=${city}`);
        console.log('Weather data:', response.data);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
  
    if (city) {
      fetchWeather();
    }
  }, [city]);
  

  const handleSearch = async (event) => {
    event.preventDefault();
    const newCity = document.getElementById('locationInput').value;
    setCity(newCity);
  };

  return (
    <>
      <div className="Container">
        <h1>Weather App</h1>
        <input type="text" id="locationInput" placeholder="Enter city name" />
        <button id="searchButton" onClick={handleSearch}>Search </button>
        <div className="weather-info">
          <h2>Weather</h2>
          {weatherData ? (
            <>
            <p>Temperature: {weatherData.searchedCityTemperature ? ((weatherData.searchedCityTemperature - 273.15).toFixed(2)) : 'N/A'} C</p>
            <p>Description: {weatherData && weatherData.searchedCityDescription ? weatherData.searchedCityDescription : 'N/A'}</p>


          </>
          
          
          
          ) : (
            <p>Please enter a city name and search.</p>
          )}
        </div>
      </div>
      <div className="Container2">
        <h3>Popular Cities in TN</h3>
        {weatherData && weatherData.cities ? (
          weatherData.cities.map((data, index) => (
            <div className="main-details-container" key={index}>
              {data.name}: {data.temperature ? ((data.temperature - 273.15).toFixed(2)) : 'NOT FOUND'} C
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default App;
