let currentWeather = document.querySelector('.current-weather'),
    feelsLike = document.querySelector('.feels-like');

(function () {
    const locatorSection = document.querySelector('#locator-input-section')
    const input = document.querySelector('#autocomplete');

    function init() {
        let locatorButton = document.querySelector('#locator-button').addEventListener('click', () => {
            locatorSection.classList.add('loading')

            navigator.geolocation.getCurrentPosition((position) => {getUserAddressBy(position.coords.latitude, position.coords.longitude)}, () => {
                    locatorSection.classList.remove("loading")
                    alert("The Locator was denied :( Please add your address manually")
                })
        })
    }

    function getUserAddressBy(lat, long) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = async function () {
            if (this.readyState == 4 && this.status == 200) {
                let address = JSON.parse(this.responseText)
                setAddressToInputField(address.results[4].formatted_address)

                // get weather data based on user's location and pass the value to the script file
                const weatherApi = document.querySelector('script#weatherApi')
                weatherApi.src = `https://api.openweathermap.org/data/2.5/weather?lat=${address.results[4].geometry.location.lat}&lon=${address.results[4].geometry.location.lng}&appid=0925dd6be044b4e39cc129ed0f21e56f`
                // console.log(weatherApi)

                // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${address.results[4].geometry.location.lat}&lon=${address.results[4].geometry.location.lng}&appid=0925dd6be044b4e39cc129ed0f21e56f`)
                //     .then(results => results.json()).then()

                let url = `https://api.openweathermap.org/data/2.5/weather?lat=${address.results[4].geometry.location.lat}&lon=${address.results[4].geometry.location.lng}&units=metric&lang=ru&appid=0925dd6be044b4e39cc129ed0f21e56f`
                let response = await fetch(url)
                let jsonWeather = await response.json()
                console.log(jsonWeather)
                currentWeather.textContent = `Current weather is ${ jsonWeather.weather[0].main }`
                feelsLike.textContent = `Feels like ${ Math.floor(jsonWeather.main.feels_like) } \u2103`

            }
        };
        xhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyAXU7Jq5_dCqYHtzCKX01aksb20xl1vzaA", true);
        xhttp.send();
    }

    function setAddressToInputField(address) {

        input.value = address
        locatorSection.classList.remove("loading")
    }

    let defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(45.4215296, -75.6971931),
    );

    let options = {
        bounds: defaultBounds
    };
    let autocomplete = new google.maps.places.Autocomplete(input, options);


    init()

})();

let doNotTouch = document.querySelector('.do-not-touch')





// window.addEventListener('DOMContentLoaded',() => {
//
//     console.log(weatherApi.src)
//
// } )
// doNotTouch.addEventListener('click', (e) => {
//     e.preventDefault()
// })







