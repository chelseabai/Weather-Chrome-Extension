
// OpenWeather API Key 3bec66c864ff4db301e895a8b65d8529
// Geocoding API Key AIzaSyA-kn96agu6mhp9zee4zcyCn5dhVntJISw

function weather(lat,lon){
    let weather_url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=3bec66c864ff4db301e895a8b65d8529"
    fetch(weather_url)
        .then(response => response.json())
        .then(data => {
            const temp = (data.main.temp - 273.15).toFixed(1);
            const city = (data.name);
            const country = (data.sys.country);
            const weather = (data.weather[0].main);
            const humidity = (data.main.humidity);
            const wind_speed = (data.wind.speed);
            const temp_high = (data.main.temp_max - 273.15).toFixed(1);
            const temp_low = (data.main.temp_min - 273.15).toFixed(1);
            document.querySelector('#high_temp').innerHTML=`High: ${temp_high}`;
            document.querySelector('#low_temp').innerHTML=`Low: ${temp_low}`;
            document.querySelector('h1').innerHTML=`${temp}`;
            document.querySelector('#humidity').innerHTML=`Humidity: ${humidity}`;
            document.querySelector('#wind_speed').innerHTML=`Wind Speed: ${wind_speed}`;
            document.querySelector('h2').innerHTML=`${city}, ${country}`;
            document.querySelector('#weather').innerHTML= `Current Weather: ${weather}`;
        })
    let forecast_url= "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly,current&appid=3bec66c864ff4db301e895a8b65d8529"
    fetch(forecast_url)
        .then(response => response.json())
        .then(data =>{
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var i;
            for (i = 0; i < 7; i++) {
                const weekday = days[new Date(data.daily[i].dt * 1000).getDay()];
                const daily_temp = (data.daily[i].temp.day - 273.5).toFixed(1);
                document.querySelectorAll(".daily")[i].innerHTML=`${weekday},${daily_temp}`;
            }

        })
}

// function city(lat,lon){
//     let city_url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&result_type=administrative_area_level_1&key=AIzaSyA-kn96agu6mhp9zee4zcyCn5dhVntJISw"
//     fetch(city_url)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             const city = (data['results'][0].formatted_address);
//             document.querySelector('h2').innerHTML=`${city}`;
//         })
// }
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
    // city(lat,lon);
}

function error() {
    alert('Sorry, no position available.');
}

const options = {
    enableHighAccuracy: true,
    maximumAge: 60000,
    timeout: 10000
};


document.addEventListener('DOMContentLoaded',()=>{
    Main();
    document.querySelector('#go-to-options').addEventListener('click',function() {
        // chrome.runtime.openOptionsPage();
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    });
});


