
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js')

const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const staticFilesDirectory = path.join(__dirname,'..','public');
const viewsPath = path.join(__dirname, '..','templates','views');
const partialsPath = path.join(__dirname, '..','templates','partials');

//Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath)

//Setup static directpry to serve
app.use(express.static(staticFilesDirectory))

app.get('', (req, res) => {
    res.render('index',{
        title : 'Weather App',
        name : "Ashish"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About Page",
        name : "Ashish"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help Page",
        message:"You can contact on 9423788396 in-case of any issues",
        name : "Ashish"
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please enter a valid address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, {temperature,description, icon, feels}) => {
            if (error){
                return res.send({error})
            }
            res.send({
                icon,
                location:`Location: ${location}`, 
                temperature : `${description} .Temperature is ${temperature}\u00B0 Celcius, but feels like ${feels}\u00B0 Celcius`
            })
        })
    })
}); 

app.get('/help/*',(req,res) =>{
    res.render('error',{        
        title :"404",
        name: "Ashish",
        error : 'Help article not found'
    })
})

app.get('*',(req,res) =>{
    res.render('error',{        
        title :"404",
        name: "Ashish",
        error : 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server started on port ' + port)
});