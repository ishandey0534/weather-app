const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicpath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewspath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicpath))

app.get('', (req,res) => {
    res.render('index', {
        name: 'Weather App',
        author: 'Ishan Dey'

    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        name: 'About me',
        author: 'Ishan Isaac Dey'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        clientname: 'Client',
        name: 'Help',
        author: 'Ishan Dey'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please enter address'
        })
    }

    geocode(req.query.address, (error, {lat,long,location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(lat,long, (error,forecastdata) => {
            if(error){
                return res.send({error})
            }
            res.send( {
                forecast: forecastdata,
                location: location,
                address: req.query.address
            })
        })
    })

    // res.send([{
    //     location: 'boston',
    //     forecast: 'sunny',
    //     address: req.query.address
    // }])
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        errormsg: 'Help article not found.',
        name: '404 Error',
        author: 'Ishan Dey'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        errormsg: 'Page not found.',
        name: '404 Error',
        author: 'Ishan Dey'
    })
})

app.listen(port, () => {
    console.log('Server started on '+port)
})