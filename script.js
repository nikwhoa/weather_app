'use strict'
// let currentWeather = document.querySelector('.current-weather'),
//     feelsLike = document.querySelector('.feels-like'),
let    currentWeatherContainer = document.createElement('div'),
    currentWeather = document.createElement('div'),
    feelsLike = document.createElement('div'),
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
            navigator.geolocation.getCurrentPosition((position) => {getUserAddressBy(position.coords.latitude, position.coords.longitude)}, () => {
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
                currentWeather.textContent = `Current weather is ${ jsonWeather.weather[0].main }`
                feelsLike.textContent = `Feels like ${ Math.floor(jsonWeather.main.feels_like) } \u2103`
            }
        };
        xhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyAXU7Jq5_dCqYHtzCKX01aksb20xl1vzaA", true);
        xhttp.send();
    }

    init()

})();


(async () => {
    let unsUrl = 'https://api.unsplash.com/photos/?client_id=cwAg2UkyqbQtcQeocOenGhBu-mLWT-dJlUN0uQZIL5E'
    let unsResponse = await fetch(unsUrl)

    let unsData = await unsResponse.json()

    console.log(unsData[0].urls.raw)
})()

