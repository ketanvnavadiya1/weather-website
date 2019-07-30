var request = require('request');

const getForcastData = (lat, long, callback) => {

        var url = 'https://api.darksky.net/forecast/88fd502d25b5319cf7d88309a750dd9e/' + lat + ',' + long;

        request({url, json: true}, (error, {body}) => {

                if (error) {
                    callback('No Internet connection in DARK SKY', undefined);
                } else if (body.error) {
                    callback('API is invalid', undefined);
                }
                else {
                    var temp = body.currently.temperature;
                    var prob = body.currently.precipProbability;
                    callback(undefined, `It is currently ${temp} degree out, there is a ${prob} chanche rain`);
                }
        });
}


module.exports = {
        'getForcastData': getForcastData
}