const request = require('postman-request');

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=c3b1d359e9a624f57603a4ca52292223&query='+ latitude + ',' + longitude + '&units=m';

    request({ url, json:true} , (error, {body}) => {
            if(error){
               callback(`Unable to connect to weather service !`);
            }else if (body.error) {
                callback(`Unable to find location !`);        
            }else
               callback(undefined, {
                  temperature : body.current.temperature,
                  description: body.current.weather_descriptions[0],
                  icon: body.current.weather_icons[0],
                  feels: body.current.feelslike
               });
        })
}

module.exports = forecast;