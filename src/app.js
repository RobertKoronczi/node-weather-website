const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();
const port = process.env.PORT || 9000;

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
    res.render('weather', {
        title: 'Wetter app',
        name
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Beschreibung',
        name
    });
});

app.get('/kontakt', (req, res) => {
    res.render('kontakt', {
        title: 'Kontakt',
        // labels
        lMail: 'e-mail: ',
        lTel: 'Tel: ',
        lWeb: 'Web: ',
        //
        mail: 'korrob1990@gmail.com',
        tel: '0177/5126785',
        web: 'rk-portfolio.herokuapp.com',
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

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});