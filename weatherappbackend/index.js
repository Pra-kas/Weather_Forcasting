const express = require('express');
const axios = require('axios');
const app = express();
const cors =require('cors');

const API_KEY = '451946095063acb0a1e8cc4d99dfc2ff';
app.use(cors())
app.get('/weather', async (req, res) => {
  const city = req.query.city || 'Chennai';
  try {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
    //console.log(response.data); 
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

app.listen(3001, () => {
  console.log('Backend server is running on port 3001');
});
