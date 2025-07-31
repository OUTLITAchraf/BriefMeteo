let searchButton = document.getElementById("search-button");
let currentLocationButton = document.getElementById("currentlocation-button");
let cityInput = document.getElementById("city-input");
let todayWeatherElements = document.querySelector("#todayWeather");
let fiveDaysForecastElements = document.querySelector("#forecastFiveDays");
let hoursForecastElements = document.querySelector("#hoursWeather");
let api_key = "561d905e67fc60afecba2387e4877853";

function getWeatherData(name, lat, lon, country) {
  let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
  let WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  fetch(WEATHER_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let date = new Date();

      function formatTime(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      }

      todayWeatherElements.innerHTML = `
          <h1 class="italic font-bold text-6xl text-[#FFD700] mt-12">
            Meteo ${name} , ${country}
          </h1>
          <div class="flex gap-4 mt-8 ml-10">
            <img src="https://openweathermap.org/img/wn/${
              data.weather[0].icon
            }@2x.png" alt="" width="200" height="200" />
            <div class="ml-5">
              <p class="text-2xl font-semibold mt-5">
                ${days[date.getDay()]} ${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}
              </p>
              <p class="text-6xl font-extrabold my-5">${(
                data.main.temp - 273.15
              ).toFixed(2)}&deg;C</p>
              <p class="text-2xl font-bold">${data.weather[0].description}</p>
            </div>
          </div>
          <div class="flex gap-10 mt-10 ml-10">
            <div class="flex gap-5 mt-10 mr-5">
              <img src="./Img/icons/humidity.png" alt="" width="70" height="70" />
              <div>
                <p class="font-bold text-2xl">Humidity</p>
                <p class="font-bold text-2xl">${data.main.humidity} %</p>
              </div>
            </div>
            <div class="flex gap-5 mt-10">
              <img
                src="./Img/icons/gauge.png"
                alt=""
                width="70"
                height="70"
              />
              <div>
                <p class="font-bold text-2xl">Pressure</p>
                <p class="font-bold text-2xl">${data.main.pressure} hPA</p>
              </div>
            </div>
            <div class="flex gap-5 mt-10 ml-5">
              <img src="./Img/icons/wind (2).png" alt="" width="70" height="70" />
              <div>
                <p class="font-bold text-2xl">Wind Speed</p>
                <p class="font-bold text-2xl">${data.wind.speed} m/s</p>
              </div>
            </div>
          </div>
          <div class="flex gap-10 mt-10 ml-10">
            <div class="flex gap-5 mt-10 mr-5">
              <img
                src="./Img/icons/sunrise.png"
                alt=""
                width="70"
                height="70"
              />
              <div>
                <p class="font-bold text-2xl">Sunrise</p>
                <p class="font-bold text-2xl">${formatTime(
                  data.sys.sunrise
                )}</p>
              </div>
            </div>
            <div class="flex gap-5 mt-10">
              <img src="./Img/icons/sunset.png" alt="" width="70" height="70" />
              <div>
                <p class="font-bold text-2xl">Sunset</p>
                <p class="font-bold text-2xl">${formatTime(data.sys.sunset)}</p>
              </div>
            </div>
          </div>
        `;
    })
    .catch(() => {
      alert("Error fetching weather data. Please try again later.");
    });

  fetch(FORECAST_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let uniqueForecastsHours = [];
      let threeHoursForecast = data.list.filter((forecast) => {
        let forecastHour = new Date(forecast.dt_txt).getHours();
        if (!uniqueForecastsHours.includes(forecastHour)) {
          return uniqueForecastsHours.push(forecastHour);
        }
      });

      hoursForecastElements.innerHTML = "";
      for (let i = 0; i < threeHoursForecast.length; i++) {
        if (i == 4) {
          break;
        } else {
          let forecast = threeHoursForecast[i];
          let date = new Date(forecast.dt_txt);

          hoursForecastElements.innerHTML += `
            <div class="flex gap-8 mt-5 items-center">
              <img src="https://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png" alt="" width="100" height="100" />
              <p class="text-2xl font-bold">${(
                forecast.main.temp - 273.15
              ).toFixed(2)} &deg;C</p>
              <p class="text-2xl font-bold">${date.getHours()}:00</p>
            </div>
          `;
        }
      }
    })
    .catch(() => {
      alert("Error fetching hourly forecast data. Please try again later.");
    });

  fetch(FORECAST_API_URL)
    .then((res) => res.json())
    .then((data) => {

      let uniqueForecastsDays = [];
      let fiveDaysForecast = data.list.filter((forecast) => {
        let forecaseDate = new Date(forecast.dt_txt).getDate();

        if (!uniqueForecastsDays.includes(forecaseDate)) {
          return uniqueForecastsDays.push(forecaseDate);
        }
      });

      fiveDaysForecastElements.innerHTML = "";
      for (let i = 1; i < fiveDaysForecast.length; i++) {
        let forecast = fiveDaysForecast[i];

        let date = new Date(forecast.dt_txt);

        let dayName = days[date.getDay()];

        fiveDaysForecastElements.innerHTML += `
            <div class="bg-[#00809D] text-white text-center py-5 px-3 rounded-4xl shadow-lg border-black border-2">
              <p class="font-bold text-3xl">${dayName}</p>
              <img src="https://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png" alt="" width="300" height="300" />
              <p class="font-bold text-3xl">${(
                forecast.main.temp - 273.15
              ).toFixed(2)}&deg;C</p>
            </div>
          `;
      }
    })
    .catch(() => {
      alert("Error fetching forecast data. Please try again later.");
    });

}

function getCityCoordinates() {
  let cityName = cityInput.value.trim();
  cityInput.value = "";
  if (!cityName) return;
  let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let { name, lat, lon, country } = data[0];
      getWeatherData(name, lat, lon, country);
    })
    .catch(() => {
      alert(
        `Error fetching coordinates for ${cityName}. Please try again later.`
      );
    });
}

function getUserCoordinates() {
  navigator.geolocation.getCurrentPosition((position) => {
    let { latitude, longitude } = position.coords;
    let REVERSE_GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;

    fetch(REVERSE_GEOCODING_URL)
      .then((res) => res.json())
      .then((data) => {
        let { name, country } = data[0];
        getWeatherData(name, latitude, longitude, country);
      })
      .catch(() => {
        alert("Error fetching coordinates of user.");
      });
  });
}

searchButton.addEventListener("click", getCityCoordinates);
currentLocationButton.addEventListener("click", getUserCoordinates);
