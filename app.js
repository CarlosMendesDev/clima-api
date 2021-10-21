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

  const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${key}`);

  res.send(response.data);
});

app.listen(process.env.PORT || port, () => {
  console.log('Listening on port ' + port);
});
