const express = require('express');
const axios = require('axios');
const cors = require('cors');

const port = 3001;

const app = express();

const key =  '9421549cc6b4e80478eaeadbe1626f5f';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/get-weather', async (req, res) => {
  const { latitude, longitude } = req.body;

  const { data: weather } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=pt_br&units=metric&appid=${key}`);
  const { data: oneCall } = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=pt_br&units=metric&appid=${key}`);

  const weekday = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

  oneCall.daily.forEach((date) => {
    const day = new Date(date.dt * 1000).getDay();

    date.day = weekday[day];
  });

  const table = oneCall.daily.map((date) => {
    const rows = {
      weekDays: date.day,
      iconTemperature: date.weather[0].icon,
      maxTemperature: `${Math.floor(date.temp.max)}°`, 
      minTemperature: `${Math.floor(date.temp.min)}°`,
    };

    return rows;
  });

  res.send({
    city: weather.name,
    prevision: oneCall.daily,
    table
  });
});

app.listen(process.env.PORT || port, () => {
  console.log('Listening on port ' + port);
});
