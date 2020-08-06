
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
            const today_weather = (data.weather[0].main);
            const humidity = (data.main.humidity);
            const wind_speed = (data.wind.speed).toPrecision(2);
            const temp_high = (data.main.temp_max - 273.15).toFixed(1);
            const temp_low = (data.main.temp_min - 273.15).toFixed(1);
            var d = new Date();
            var n = d.getUTCHours();
            const time = (n + new Date(data.timezone * 1000).getUTCHours()) % 24;
	    var content = document.querySelectorAll("#wind, #wind_speed, #speed, #water, #humidity, #percent");
	    var m;

            if (today_weather === "Clouds"){
                document.querySelector('#weather_icon').src = "images/cloudy-weather_200_transparent.gif";}
            if (today_weather === "Clear"){
                document.querySelector('#weather_icon').src = "images/sun-weather_200_transparent.gif";}
            if (today_weather === "Snow"){
                document.querySelector('#weather_icon').src = "images/snow-storm-weather_200_transparent.gif";}
            if (today_weather === "Rain"){
                document.querySelector('#weather_icon').src = "images/rainy-weather_200_transparent.gif";}
            if (today_weather === "Drizzle"){
                document.querySelector('#weather_icon').src = "images/light-rain-weather_200_transparent.gif";}
            if (today_weather === "Thunderstorm"){
                document.querySelector('#weather_icon').src = "images/torrential-rain-weather_200_transparent.gif";}
            
	    if (7 < time && time <= 19){
                document.getElementById("other_container").style.background = "linear-gradient(to bottom right, #ffffcc 0%, #ffcc99 100%)";
		for (m = 0; m < content.length; m++) {
			content[m].style.color = "#ff9933";
		}
            }
            else {
                document.getElementById("other_container").style.background = "linear-gradient(to bottom right, #0033cc 0%, #cc99ff 100%)";
		for (m = 0; m < content.length; m++) {
			content[m].style.color = 
				"#000066"; //dark blue
//				"#d0a1ff"; //light purple
		}
            }
		
            document.querySelector('#high_temp').innerHTML=`High: ${temp_high}`;
            document.querySelector('#low_temp').innerHTML=`Low: ${temp_low}`;
            document.querySelector('h1').innerHTML=`${temp}`;
            document.querySelector('#humidity').innerHTML=`${humidity}`;
            document.querySelector('#wind_speed').innerHTML=`${wind_speed}`;
            document.querySelector('h2').innerHTML=`${city}, ${country}`;
            document.querySelector('#weather').innerHTML= `Current Weather: ${today_weather}`;
        });
    let forecast_url= "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly,current&appid=3bec66c864ff4db301e895a8b65d8529";
    fetch(forecast_url)
        .then(response => response.json())
        .then(data =>{
            var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
            var i;
            for (i = 0; i < 7; i++) {
                const weekday = days[new Date(data.daily[i].dt * 1000).getDay()];
                const daily_temp = (data.daily[i].temp.day - 273.5).toFixed(1);
                const icon_id = (data.daily[i].weather[0].icon);
                let icon_url = "http://openweathermap.org/img/wn/"+icon_id+"@2x.png";
                document.querySelectorAll(".daily_temp")[i].innerHTML=`${daily_temp}'C`;
                document.querySelectorAll(".day")[i].innerHTML=`${weekday}`;
                document.querySelectorAll(".daily_icon")[i].src = icon_url;
            }
        })
    
    // const test = ('The if statment worked');
    // if (document.getElementById('#weather').innerHTML == "Current Weather: Clouds") {
    //     // const testt = (`yes`);
    //     // document.getElementById('#weather_icon').src = "images\cloudy-weather_200_transparent.gif";
    //     document.querySelector('#heading').innerHTML=`${test}`;
    //     // document.querySelector('#weather_icon').innerHTML= $("#weather_icon").attr("src", weather_ic["cloudy"].src);
    // }
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


function Search() {
    var city = document.getElementById("search_input").value;
    location_url = "https://nominatim.openstreetmap.org/search?city="+city+"&format=json&integer=1";
    fetch(location_url)
        .then(response => response.json())
        .then(data =>{
            const lat = (data[0].lat);
            const lon = (data[0].lon);
            weather(lat,lon);
        }).catch(function(){
            alert("Invalid city input.");
    })
}

document.addEventListener('DOMContentLoaded',()=>{
    const form = document.getElementById("search");
    form.addEventListener('submit',function(event){
        Search();
        event.preventDefault();
    });
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
