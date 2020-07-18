//bootsraping
const express = require('express');
const app =express();
const bodyParser = require('body-parser');
const request = require('request');

// configurations
const apiKey='***************';
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.get('/',(req,res)=>res.render('index', {weather: null, error: null}));
app.post('/',(req,res)=>{
	let city = req.body.city;
  	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
	request(url, function (err, response, body) {
	    if(err){
	      res.render('index', {weather: null, error: 'Error, please try again'});
	    } else {
	      let weather = JSON.parse(body)
	      if(weather.main == undefined){
	        res.render('index', {weather: null, error: 'Error, please try again'});
	      } else {
	        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
	        res.render('index', {weather: weatherText, error: null});
	      }
	    }
	});

});

// Server start
app.listen(3000,()=>console.log('Server is starting '));