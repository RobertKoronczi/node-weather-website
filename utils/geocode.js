const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmtkZXYiLCJhIjoiY2p4bG53OHo2MDJ6cTNwb2J6ajljamdxNiJ9.3fMw-tLcW7vgZH505qriSQ`;

    request( { url, json: true }, (error, {body}) => {

        // callback(error, data)

        if (error) {
            callback('Unable to connect to weather services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location! Try an other search!', undefined);
        } else {
            const data = body.features[0];
            const x = data.center[0];
            const y = data.center[1];
            const location = data.place_name;

            callback(undefined, {x, y, location});
        }

    })
};

module.exports = geocode;