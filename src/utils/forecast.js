const request = require('request')

const forecast = (lat,long,callback) => {
    const url = 'https://api.darksky.net/forecast/922b297145b68dda829967adaf8d6b4e/'+lat+','+long
    request({url, json: true}, (err, {body}) => {
        if(err){
            callback('Not able to connect to weather services!',undefined)
        }else if(body.error){
            callback('Not able to find location Search again!',undefined)
        }else{
            callback(undefined, body.daily.data[0].summary+' It is '+body.currently.temperature+' degrees out and there is '+body.currently.precipProbability+'% chance of rain.')
        }
    })
}

module.exports=forecast