console.log("loaded")

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(location)
    // if(!search.value){
    //     return console.log('Please enter something')
    // } 
    msg1.textContent = 'Loading'
    msg2.textContent = ''
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
             return msg1.textContent = data.error

        }
        msg1.textContent = data.location
        msg2.textContent = data.forecast
    })
})
})