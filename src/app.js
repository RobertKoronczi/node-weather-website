const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views');
const publicPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static direcory to serve
app.use(express.static(publicPath));

const name = 'Robert Koronczi'

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        message: 'Its a help message.',
        name
    });
});


// Weather forecast
app.get('/weather', (req, res) =>{
    
    const adress = req.query.adress;

    if (!adress) return res.send( { error: 'You must provide an adress!' } );

    geocode(adress, (error, {x, y, location} = {}) => {
        if (error) return res.send( { error } );
        forecast(x, y, (error, data) => {
            if (error) return res.send( { error } );
            res.send({
                title: 'weather',
                name,
                forecast: data,
                location
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) return res.send( { error: 'You must provide a search term.'} );
    
    res.send( {
        products: []
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name,
        message: 'My 404 page'  
    });
});

// app.com
// app.com/help
// app.com/about

app.listen(9000, () => {
    console.log('Server is up on port 9000');
});