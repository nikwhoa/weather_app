'use strict';

const currentWeatherContainer = document.createElement('div'),
    currentWeather = document.createElement('div'),
    feelsLike = document.createElement('div'),
    header = document.querySelector('.header'),
    firstContainer = document.querySelector('.first-container');

currentWeatherContainer.classList.add('container', 'current-weather-container');
currentWeather.classList.add('current-weather');
feelsLike.classList.add('feels-like');


const locatorSection = document.querySelector('.locator-input-section');
const locatorButton = document.querySelector('#locator-button');
let storage;




const getPosition = new Promise((resolve, reject) => {

        const geo = navigator.geolocation;
        const geoOptions = {
            enableHighAccuracy: true,
            maximumAge: 0
        };

        locatorButton.addEventListener('click', () => {

            locatorSection.classList.add('loader'); // добавляем иконку загрузку

            geo.getCurrentPosition((position) => {
                const userPosition = position.coords; // получаем координаты
                resolve(userPosition); // передаем координаты
            }, (err) => {
                alert('Location has been denied');
                return console.warn(`ERROR(${err.code}): ${err.message}`);
            }, geoOptions);
        });
    })
    .then(data => {

        locatorSection.classList.remove('loader'); // убираем иконку загрузки

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&lang=en&units=metric&appid=0925dd6be044b4e39cc129ed0f21e56f`)
            .then((response) => response.json())
            .then(data => {

                let weather = data.weather[0].description;
                const temp = data.main.feels_like;
                // let correctTemp = temp.toFixed(2);
                firstContainer.insertAdjacentElement('afterend', currentWeatherContainer);
                currentWeatherContainer.append(currentWeather);
                currentWeather.insertAdjacentElement('afterend', feelsLike);
                firstContainer.remove();

                currentWeather.textContent = `There is ${weather}`;
                feelsLike.textContent = `Feels like ${Math.floor(temp)} \u2103`;


                return weather;
            })
            .then(weather => weather)
            .then(weather => {
                fetch(`https://api.giphy.com/v1/gifs/search?q=${`fall ${weather}`}&api_key=5d0kUraA0PAjYljYQh0JvKFAVbU7I1RX&limit=30`)
                    .then((response) => response.json())
                    .then(data => {
                        const getRandomInt = (max) => Math.floor(Math.random() * max);
                        const giphyUrl = data.data[getRandomInt(data.data.length)].images.original.url;

                        document.body.style.background = `url('${giphyUrl}')`;
                        document.body.style.backgroundRepeat = 'no-repeat';
                        document.body.style.backgroundSize = 'cover';
                        document.body.style.backgroundPosition = 'center center';
                    });
            });
    });