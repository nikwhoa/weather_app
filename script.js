'use strict'

/* comment if you don't need dark theme */
// const data = new Date
// console.log(data.getHours());
// if (data.getHours() >= 21 || data.getHours() <= 6) {
//     document.body.classList.add('dark-theme')
//     document.querySelector('h2.header').classList.add('header-white')
// } 


// let currentWeather = document.querySelector('.current-weather'),
//     feelsLike = document.querySelector('.feels-like'),
let currentWeatherContainer = document.createElement('div'),
    currentWeather = document.createElement('div'),
    feelsLike = document.createElement('div'),
    header = document.querySelector('.header'),
    firstContainer = document.querySelector('.first-container');

currentWeatherContainer.classList.add('container', 'current-weather-container')
currentWeather.classList.add('current-weather')

feelsLike.classList.add('feels-like');


(function () {
    const locatorSection = document.querySelector('.locator-input-section');

    // const input = document.querySelector('#autocomplete');

    function init() {
        let locatorButton = document.querySelector('#locator-button').addEventListener('click', () => {
            locatorSection.classList.add('loader')
            navigator.geolocation.getCurrentPosition((position) => {
                getUserAddressBy(position.coords.latitude, position.coords.longitude)
            }, () => {
                locatorSection.classList.remove("loading")
                alert("The Location was denied :( Please add your address manually")
            })
        })
    }

    function getUserAddressBy(lat, long) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = async function () {
            if (this.readyState == 4 && this.status == 200) {
                let address = JSON.parse(this.responseText)

                locatorSection.classList.remove('loader')
                header.remove()
                // get weather data based on user's location and pass the value to the script file
                const weatherApi = document.querySelector('script#weatherApi')
                weatherApi.src = `https://api.openweathermap.org/data/2.5/weather?lat=${address.results[4].geometry.location.lat}&lon=${address.results[4].geometry.location.lng}&appid=0925dd6be044b4e39cc129ed0f21e56f`
                // console.log(weatherApi)

                // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${address.results[4].geometry.location.lat}&lon=${address.results[4].geometry.location.lng}&appid=0925dd6be044b4e39cc129ed0f21e56f`)
                //     .then(results => results.json()).then()

                let url = `https://api.openweathermap.org/data/2.5/weather?lat=${address.results[4].geometry.location.lat}&lon=${address.results[4].geometry.location.lng}&units=metric&lang=ru&appid=0925dd6be044b4e39cc129ed0f21e56f`
                let response = await fetch(url)
                let jsonWeather = await response.json()
                firstContainer.insertAdjacentElement('afterend', currentWeatherContainer)
                currentWeatherContainer.append(currentWeather)
                currentWeather.insertAdjacentElement('afterend', feelsLike)
                currentWeather.textContent = `Current weather is ${jsonWeather.weather[0].main}`
                let currentWeatherForGyphy
                switch (jsonWeather.weather[0].main) {
                    case 'Clear':
                        currentWeatherForGyphy = 'sunny'    
                        break;
                    case 'Rain':
                        currentWeatherForGyphy = 'rain'    
                        break;
                    default:
                        currentWeatherForGyphy = 'amazing'
                        break;
                }
                // alert(jsonWeather.weather[0].main);
                // alert(currentWeatherForGyphy);
    
                feelsLike.textContent = `Feels like ${Math.floor(jsonWeather.main.feels_like)} \u2103`
                // console.log(`${jsonWeather.weather[0].main}${' weather'}`);
                let gifUrl = `https://api.giphy.com/v1/gifs/search?q=${currentWeatherForGyphy}${' sky'}&api_key=5d0kUraA0PAjYljYQh0JvKFAVbU7I1RX&limit=15`
                // let gifUrl = `https://api.giphy.com/v1/gifs/search/tags?q=${jsonWeather.weather[0].main}${' weather'}&api_key=5d0kUraA0PAjYljYQh0JvKFAVbU7I1RX&limit=5`
                let gifResponse = await fetch(gifUrl)
                let gifData = await gifResponse.json()
                let getRandomInt = (max) => Math.floor(Math.random() * max);
                // console.log(gifData);
                // console.log(getRandomInt(15));
                // console.log(gifData.data[getRandomInt(10)].images)
                let gifDiv = document.querySelector('#gif-picture');
                document.body.style.background = `url('${gifData.data[getRandomInt(15)].images.original.url}')`;
                document.body.style.backgroundRepeat = 'no-repeat';
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundPosition = 'center center';
                
                // console.log(body);
                // gifDiv.classList.add('gif-picture-mob')
                // gifDiv.src = gifData.data[getRandomInt(15)].images.original.url
                // gifDiv.alt = currentWeatherForGyphy
                // gifDiv.src = gifData.data[0].images.original.url
                // gifDiv.innerHTML = `<img src="${gifData.data[getRandomInt(5)].url}" alt="" />`
            }
        };
        xhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyAXU7Jq5_dCqYHtzCKX01aksb20xl1vzaA", true);
        xhttp.send();
    }

    init()

})();


(async () => {


    //javascript, jQuery
    // while (currentWeather.textContent === '' && currentWeather.textContent === ' ') {
    //
    // }
    // let gifUrl = `http://api.giphy.com/v1/gifs/search?q=${currentWeather.textContent}&api_key=5d0kUraA0PAjYljYQh0JvKFAVbU7I1RX&limit=5`
    // let gifResponse = await fetch(gifUrl)
    // let gifData = await gifResponse.json()
    // console.log(gifData.data[0].url)
    // let xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
    // xhr.done(function(data) { console.log("success got data", data); });

    // let unsUrl = 'https://api.unsplash.com/photos/?client_id=cwAg2UkyqbQtcQeocOenGhBu-mLWT-dJlUN0uQZIL5E'
    // let unsResponse = await fetch(unsUrl)
    //
    // let unsData = await unsResponse.json()
    //
    // console.log(unsData[0].urls.raw)
})()

