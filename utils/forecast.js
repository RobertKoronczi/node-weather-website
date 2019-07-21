const request = require('request');

const forecast = (x, y, callback) => {

    const url = `https://api.darksky.net/forecast/6e81aade1ee868b1f64d7be0daa250ca/${x},${y}?units=si`;

    request( { url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined);
        } else if (body.error) {
            callback('Unable to find location! Try an other search!', undefined);
        } else {
            const summary = body.daily.data[0].summary;
            callback( undefined, `${summary} Its currently ${body.currently.temperature}°C. There is a ${body.currently.humidity*100}% humidity.`);
        } 
    });
};

module.exports = forecast;