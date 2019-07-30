const path = require('path');
var express = require('express');
var hbs = require('hbs');

var geocode = require('./utility/geocode');
var forcast = require('./utility/forcast');

var app = express();

var resourcePath = path.join(__dirname, '../public');
var templatePath = path.join(__dirname, '/templates/views');
var partialPath = path.join(__dirname, '/templates/partials');


app.use(express.static(resourcePath));
hbs.registerPartials(partialPath);

app.set('view engine', 'hbs');
app.set('views', templatePath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        data: 'Weather application is for predict weather',
        name: 'Ketan Navadiya'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About template Page',
        data: 'Get knowledge about weather',
        name: 'Manish'
    });
});


app.get('/help', (req, res) => {
    
    res.render('help', {
        title: 'help page',
        data: 'Help to weather',
        helptext: 'Thsi is the help page where you can ger help',
        name: 'Mohit'
    });
});


app.get('/weather', (req, res) => {

    if(!req.query.address){
        res.send({
            error: 'Please provide any Address'
        });
    } else {

        address = req.query.address;


        geocode.getGeoCOrdinate(address, (error, {lat, long, location} = {}) => {

            if(error) {
                res.send({
                    error: 'Unable to find location, Please tra another string',
                    detail: error
                });
            } else {

                    forcast.getForcastData(lat, long, (error, data) => {

                        if(error) {
                            res.send({
                                error: 'error in forcast',
                                detail: error
                            });
                        } else {
                            res.send({
                                Forcast: data,
                                location,
                                address
                            });
                        }

                    });
            }

        });






















        // res.send({
        //     forecast: 'there will be today',
        //     location: 'Parwala, Gujrat, India',
        //     address: req.query.address
        // });
    }

    
});


app.get('/help/*', (req, res) => {
    res.render('pageNotFound',
    {
        title: '404 Help Page Not found',
        name: 'K Navadiya',
        message: 'Help Page Not found'
    });
});

app.get('*', (req, res) => {
    res.render('pageNotFound', {
        title: '404 Page Not found',
        name: 'Ketan Navadiya',
        message: 'Page Not found'
    });
});
 
app.listen(3070, () => {
    console.log("Webserver is started in port 3000");
});