const axios = require('axios');

const API_KEY = '451946095063acb0a1e8cc4d99dfc2ff'; 
const CITY_NAME = 'Chennai'; 

const url = `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`;

axios.get(url)
  .then(response => {
    console.log('Weather data:', response.data);
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  }
);  
