
function weather(lat,lon){
    let weather_url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=3bec66c864ff4db301e895a8b65d8529"
    fetch(weather_url)
        .then(response => response.json())
        .then(data => {
            const temp = (data.main.temp - 273.15).toFixed(0);
            chrome.browserAction.setBadgeBackgroundColor({ color: [18,171,255,255] });
            chrome.browserAction.setBadgeText({text: `${temp}°`});
        });
}

function Main(){
    if ('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(success, error, options);
    }
}

function success(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log(lat,lon);
    weather(lat,lon);
}

function error() {
    alert('Sorry, no position available.');
}

const options = {
    enableHighAccuracy: true,
    maximumAge: 60000,
    timeout: 10000
};

Main();