const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const API_KEY = '451946095063acb0a1e8cc4d99dfc2ff';

app.use(cors());

mongoose.connect('mongodb://localhost:27017/weatherDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const citySchema = new mongoose.Schema({
  name: String,
  temperature: Number,
  description: String 
});
const City = mongoose.model('City', citySchema);

const fetchWeatherForCity = async (cityName) => {
  try {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
    const response = await axios.get(url);
    
    
    const temperature = response.data.main.temp;
    const description = response.data.weather && response.data.weather[0] ? response.data.weather[0].description : null;
    
    
    // console.log("*******MUTHUVELTemperature:*******", temperature);
    // console.log("Description:", description);
    
    return { temperature, description };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};



app.get('/weather', async (req, res) => {
  try {
    const { city } = req.query;
    const { temperature: searchedCityTemperature, description: searchedCityDescription } = await fetchWeatherForCity(city); 

    const cities = await City.find();
    const citydata = cities.map(async (city) => {
      const { temperature, description } = await fetchWeatherForCity(city.name); 
      await City.findByIdAndUpdate(city._id, { temperature, description });
      return { name: city.name, temperature, description };
    });

    const weatherData = await Promise.all(citydata);
    res.json({ searchedCityTemperature, searchedCityDescription, cities: weatherData }); 
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});