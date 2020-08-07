
// OpenWeather API Key 3bec66c864ff4db301e895a8b65d8529

function weather(lat,lon){
    let weather_url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=3bec66c864ff4db301e895a8b65d8529"
    fetch(weather_url)
        .then(response => response.json())
        .then(data => {
            const temp = (data.main.temp - 273.15).toFixed(1);
            const city = (data.name);
            const country = (data.sys.country);
            const today_weather = (data.weather[0].main);
            const humidity = (data.main.humidity).toPrecision(3);
            const wind_speed = (data.wind.speed);
            const temp_high = (data.main.temp_max - 273.15).toFixed(1);
            const temp_low = (data.main.temp_min - 273.15).toFixed(1);
            var d = new Date();
            var n = d.getUTCHours();
            const time = (n + new Date(data.timezone * 1000).getUTCHours()) % 24;

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
				main_l = "#83EAF1"; //light colour
				main_d = "#63A4FF"; //dark colour
				accent_l = "#F7B42C"; //light colour
				accent_d = "#FC575E"; //dark colour
            }
            else {
				main_l = "#0033cc"; //light colour
				main_d = "#cc99ff"; //dark colour
				accent_l = "#e89232"; //light colour
				accent_d = "#b057b9"; //dark colour
            }
			DayNight(accent_l,accent_d,main_l,main_d);
			
			
            document.querySelector('#high_temp').innerHTML=`&#11014High: ${temp_high}`;
            document.querySelector('#low_temp').innerHTML=`&#11015Low: ${temp_low}`;
            document.querySelector('#temp').innerHTML=`${temp}`;
            document.querySelector('#humidity').innerHTML=`${humidity}`;
            document.querySelector('#wind_speed').innerHTML=`${wind_speed}`;
            document.querySelector('h2').innerHTML=`${city}, ${country}`;
            document.querySelector('#weather').innerHTML= `${today_weather}`;
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
                document.querySelectorAll(".daily_temp")[i].innerHTML=`${daily_temp}°`;
                document.querySelectorAll(".day")[i].innerHTML=`${weekday}`;
                document.querySelectorAll(".daily_icon")[i].src = icon_url;
            }
        })
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

function DayNight(accent_l,accent_d,main_l,main_d){
	var content = document.querySelectorAll("#wind, #wind_speed, #speed, #water, #humidity, #percent, #location, #degree, #high_temp, #low_temp");
    var m;
	
	document.getElementById("other_container").style.background = `linear-gradient(to bottom right, ${main_l} 0%, ${main_d}) 100%`;
	document.getElementById("search").style.background = `white`;
	document.getElementById("temp_container").style.background = `linear-gradient(to bottom right, ${accent_l} 0%, ${accent_d}) 100%`;
	document.getElementById("heading").style.color = main_d;
	document.getElementById("go").style.background = accent_l;
	for (a = 0; a < 6; a++) {
	document.getElementsByClassName("line")[a].style.background = main_l;
	}
//	for (m = 0; m < content.length; m++) {
//		content[m].style.color = 
//			"#000066"; //dark blue
//				"#d0a1ff"; //light purple
//	}
}

function LightDark(saved_mode, accent_l,accent_d) {
//	chrome.storage.sync.set({
//      savedMode: saved_mode
//    });
	if (saved_mode > 0) {
		document.getElementById("mode_icon").className = "fas fa-lightbulb";
		document.getElementById("mode").style.background = accent_d;
		document.getElementById("mode").style.color = "#000000";
		document.querySelector("body").style.background = "#ffffff";
		document.querySelector("body").style.color = "#000000";
	} else {
		document.getElementById("mode_icon").className = "far fa-lightbulb";
		document.getElementById("mode").style.background = accent_l;
		document.getElementById("mode").style.color = "#ffffff";
		document.querySelector("body").style.background = "#2c3e50";
		document.querySelector("body").style.color = "#ffffff";
	}
}

document.addEventListener('DOMContentLoaded',()=>{
    Main();
    document.getElementById('container').style.visibility="hidden";
    setTimeout(function(){
        document.getElementById('loading').style.visibility="hidden";
        document.getElementById('container').style.visibility="visible";
    },4000);
    var saved_mode = 1;
	var main_l = "#0033cc"; //light colour
	var main_d = "#cc99ff"; //dark colour
	var accent_l = "#e89232"; //light colour
	var accent_d = "#b057b9"; //dark colour
    const form = document.getElementById("search");
    form.addEventListener('submit',function(event){
        Search();
        event.preventDefault();
    });
    Main();
	LightDark(saved_mode, accent_l,accent_d);
    document.querySelector('#mode').addEventListener('click',function() {
//		chrome.runtime.openOptionsPage();
//		if (chrome.runtime.openOptionsPage) {
//            chrome.runtime.openOptionsPage();
//        } else {
//            window.open(chrome.runtime.getURL('options.html'));
//        }
		if (saved_mode > 0) {
			saved_mode = -1;
			LightDark(saved_mode, accent_l,accent_d);
		} else {
			saved_mode = 1;
			LightDark(saved_mode, accent_l,accent_d);
		}
    });
});