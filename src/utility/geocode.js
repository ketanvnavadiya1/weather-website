var request = require('request');

const getGeoCOrdinate = (address, callBack) => {

    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2V0YW52bmF2YWRpeWEiLCJhIjoiY2p4dmg1Zjc5MDBtNTNtbGZsdjJlYWI1cyJ9.m4ZJdJBgyYPwOn4HavEIiw';
    request({url, json: true}, (error, {body}) => {


        if (error) {
            callBack('No internet connection in MAP BOX', undefined);
        } else {
            if (body.features.length) {
                callBack(undefined, {
                    lat: body.features[0].center[1],
                    long: body.features[0].center[0],
                    location: body.features[0].place_name
                });
            } else {
                callBack('NOT address found, please enter valid location', undefined);
            }

        }
});
}

module.exports = {
     'getGeoCOrdinate': getGeoCOrdinate
    };