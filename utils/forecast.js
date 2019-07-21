const request = require('request');

const forecast = (x, y, callback) => {

    const url = `https://api.darksky.net/forecast/6e81aade1ee868b1f64d7be0daa250ca/${x},${y}?units=si&lang=de`;

    request( { url, json: true }, (error, {body}) => {
        if (error) {
            callback('Verbindung zu den Wetter Services konnte nicht hergestellt werden!', undefined);
        } else if (body.error) {
            callback('Standort konnte nicht gefunden werden! Versuchen Sie es mit einer anderen Suche!', undefined);
        } else {
            const summary = body.daily.data[0].summary;
            callback( undefined, { 
                m1: summary,
                m2: `Es ist gerade ${body.currently.temperature}°C, und die Luftfeuchtigkeit ist ${body.currently.humidity*100}%`,
                m3: `Heute haben wir eine Tiefsttemperatur von ${body.daily.data[0].temperatureMax}°C und eine Tiefsttemperatur von ${body.daily.data[0].temperatureMin}`
            });
        }
    });
};

module.exports = forecast;