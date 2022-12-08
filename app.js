const express = require("express");
const https = require("https"); // built-in module in Node
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
  const { city, unit } = req.body;
  console.log(city, unit, "sdfsdfsdfsdfs");
  const apiKey = `a7ee6a4bd0c31eeac7b926646de080e5&units=${unit}`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      let { temp } = weatherData.main;
      temp = temp.toFixed(1);
      const city = weatherData.name;
      const icon = weatherData.weather[0].icon;
      const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      const description = weatherData.weather[0].description;

      res.send(
        `<p>The temperature is ${temp} in ${city} with a ${description} sky.<br> <img src=${imageURL} alt='An image of ${description}'> </p>`
      );
    });
  });
});
// A comment has been added
app.listen(3000);
