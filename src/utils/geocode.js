const request = require('request')

const geocode = (address,callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaXNoYW41MzQiLCJhIjoiY2s4Mnp4emx3MDFrZjNlbXV4Yms2Y3hoMyJ9.GvjezN-gpPiI5vKibi3xrQ'
    request({ url, json: true}, (err, {body}={}) => {
        if(err){
            callback('Not able to connect to weather services!',undefined)
        }else if(body.features.length===0){
            callback('Unable to find location. Please search again!')
        }else{
            callback(undefined,{
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode