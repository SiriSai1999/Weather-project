// jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/", function(req, res){

res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req,res){
  console.log(req.body.city);

  const query = req.body.city;
  const key = "e2a5d54d7aabe3311992d305185bb92f";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + key;
  https.get(url, function(response){


    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The weather in " + query + " has a temperature of " + temp +"</h1>");
      res.write("<p>Weather Description: " + description + "</p>");
      res.write("<img src = " + imgUrl + ">");
      res.send();

    });
  });
});



app.listen(3000, function(){
  console.log("Server started on port 3000");
});
