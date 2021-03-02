function formatDate (timestamp) {
    let date = new Date(timestamp);
    let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function showTodayData(response) {
    let condition = document.querySelector("#cc-text")
    let city = document.querySelector("#city-name");
    let temp = document.querySelector("#current-temp");
    let feelsLike = document.querySelector("#feels-data")
    let minTemp = document.querySelector("#min-data");
    let maxTemp = document.querySelector("#max-data");
    let humidity = document.querySelector("#humidity-data");
    let wind = document.querySelector("#wind-data");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#cc-icon");

    celsiusTemperature = response.data.main.temp;

    temp.innerHTML = Math.round(celsiusTemperature);
    city.innerHTML = response.data.name;
    condition.innerHTML = response.data.weather[0].description;
    feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}°C`;
    minTemp.innerHTML= Math.round(response.data.main.temp_min);
    maxTemp.innerHTML= Math.round(response.data.main.temp_max);
    humidity.innerHTML = `${response.data.main.humidity}%`;
    wind.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    
}

function showHourlyForecast(response) {

  console.log(response.data)

  let hour1Temp = document.querySelector("#hour1-temp");
  let hour1Icon = document.querySelector("#hour1-icon");
  let hour1Description = document.querySelector("#hour1-description");
  let hour1Time = document.querySelector("#hour1-time");
  let hour2Temp = document.querySelector("#hour2-temp");
  let hour2Icon = document.querySelector("#hour2-icon");
  let hour2Description = document.querySelector("#hour2-description");
  let hour2Time = document.querySelector("#hour2-time");
  let hour3Temp = document.querySelector("#hour3-temp");
  let hour3Icon = document.querySelector("#hour3-icon");
  let hour3Description = document.querySelector("#hour3-description");
  let hour3Time = document.querySelector("#hour3-time");
  let hour4Temp = document.querySelector("#hour4-temp");
  let hour4Icon = document.querySelector("#hour4-icon");
  let hour4Description = document.querySelector("#hour4-description");
  let hour4Time = document.querySelector("#hour4-time");
  let hour5Temp = document.querySelector("#hour5-temp");
  let hour5Icon = document.querySelector("#hour5-icon");
  let hour5Description = document.querySelector("#hour5-description");
  let hour5Time = document.querySelector("#hour5-time");
  hour1Temp.innerHTML = Math.round(response.data.list[0].main.temp);
  hour1Icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`);
  hour1Description.innerHTML = response.data.list[0].weather[0].description;
  hour1Time.innerHTML = formatDate(response.data.list[0].dt * 1000);
  hour2Temp.innerHTML = Math.round(response.data.list[1].main.temp);
  hour2Icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.list[1].weather[0].icon}@2x.png`);
  hour2Description.innerHTML = response.data.list[1].weather[0].description;
  hour2Time.innerHTML = formatDate(response.data.list[1].dt * 1000);
  hour3Temp.innerHTML = Math.round(response.data.list[2].main.temp);
  hour3Icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.list[2].weather[0].icon}@2x.png`);
  hour3Description.innerHTML = response.data.list[2].weather[0].description;
  hour3Time.innerHTML = formatDate(response.data.list[2].dt * 1000);
  hour4Temp.innerHTML = Math.round(response.data.list[3].main.temp);
  hour4Icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.list[3].weather[0].icon}@2x.png`);
  hour4Description.innerHTML = response.data.list[3].weather[0].description;
  hour4Time.innerHTML = formatDate(response.data.list[3].dt * 1000);
  hour5Temp.innerHTML = Math.round(response.data.list[4].main.temp);
  hour5Icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.list[4].weather[0].icon}@2x.png`);
  hour5Description.innerHTML = response.data.list[4].weather[0].description;
  hour5Time.innerHTML = formatDate(response.data.list[4].dt * 1000);

}

function search(city) {
  let apiKey = "c5b44a0c5076580570a03d22a1979a59";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTodayData);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showHourlyForecast);

}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}


let celsiusLink = document.querySelector("#unit-c");
celsiusLink.addEventListener("click", displayCelsius); 

let fahrenheitLink = document.querySelector("#unit-f");
fahrenheitLink.addEventListener("click", displayFahrenheit); 

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "c5b44a0c5076580570a03d22a1979a59";
  let locApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(locApi).then(showTodayData);

  locApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(locApi).then(showHourlyForecast);

}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let hereButton = document.querySelector("#here-button");
hereButton.addEventListener("click", getCurrentLocation);

search("New York");