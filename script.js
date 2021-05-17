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
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let address = JSON.parse(this.responseText)
                // console.log(address)
                setAddressToInputField(address.results[4].formatted_address)
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

// doNotTouch.addEventListener('click', (e) => {
//     e.preventDefault()
// })







