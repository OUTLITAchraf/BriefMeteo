let searchButton = document.getElementById("search-button");
let currentLocationButton = document.getElementById("currentlocation-button");
let cityInput = document.getElementById("city-input");
let todayWeatherElements = document.querySelector("#todayWeather");
let fiveDaysForecastElements = document.querySelector("#forecastFiveDays");
let hoursForecastElements = document.querySelector("#hoursWeather");
let api_key = "561d905e67fc60afecba2387e4877853";
let chartInstance = null; 

function displayWeatherChart(data) {
  const ctx = document.getElementById('weatherChart').getContext('2d');

  // Détruire l’ancien graphique s’il existe
  if (chartInstance) {
    chartInstance.destroy();
  }

  const labels = data.list.map(item => {
    const date = new Date(item.dt_txt);
    return `${date.getDate()}/${date.getMonth() + 1} ${date.getHours()}:00`;
  });

  const temperatures = data.list.map(item =>
    (item.main.temp - 273.15).toFixed(1)
  );

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Température (°C)',
        data: temperatures,
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: 'white'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: 'white'
          }
        },
        y: {
          ticks: {
            color: 'white'
          }
        }
      }
    }
  });
}


function getWeatherData(name, lat, lon, country) {
  let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
  let WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
  let chartInstance = null;

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
          <h1 class="mx-5 italic font-bold text-3xl lg:text-6xl text-yellow-400 mt-12">
            Now ${name} , ${country}
          </h1>
          <div class="flex gap-5 mx-10 mt-8 lg:ml-10">
            <img
              src="https://openweathermap.org/img/wn/${
                data.weather[0].icon
              }@4x.png"
              alt=""
              class="h-[130px] w-[130px] lg:h-[250px] lg:w-[250px]"
            />
            <div class="ml-5 lg:mt-5">
              <p class="text-xl lg:text-2xl font-semibold lg:mt-5 text-white">
                Today
              </p>
              <p class="text-sm lg:text-2xl font-semibold my-3 lg:mt-5 text-white">
                ${days[date.getDay()]} ${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}
              </p>
              <p class="text-3xl lg:text-6xl font-extrabold my-3 lg:my-5 text-white">${(
                data.main.temp - 273.15
              ).toFixed(2)} &deg;C</p>
              <p class="text-xl lg:text-2xl font-bold text-white">${
                data.weather[0].description
              }</p>
            </div>
          </div>
          <div class="flex gap-8 mx-5 lg:gap-10 lg:mt-10 lg:ml-10">
            <div class="flex gap-3 lg:gap-5 mt-10 lg:mr-5 items-center">
              <img
                src="./Img/icons/humidity.png"
                alt=""
                class="w-[20px] h-[20px] lg:h-[70px] lg:w-[70px]"
              />
              <div>
                <p class="font-bold text-sm lg:text-2xl text-white">Humidity</p>
                <p class="font-bold text-xs lg:text-2xl text-white">${
                  data.main.humidity
                } %</p>
              </div>
            </div>
            <div class="flex gap-3 lg:gap-5 mt-10 lg:mr-5 items-center">
              <img src="./Img/icons/gauge.png" alt="" class="w-[20px] h-[20px] lg:h-[70px] lg:w-[70px]" />
              <div>
                <p class="font-bold text-sm lg:text-2xl text-white">Pressure</p>
                <p class="font-bold text-xs lg:text-2xl text-white">${
                  data.main.pressure
                } hPA</p>
              </div>
            </div>
            <div class="flex gap-3 lg:gap-5 mt-10 lg:mr-5 items-center">
              <img
                src="./Img/icons/wind.png"
                alt=""
                class="w-[20px] h-[20px] lg:h-[70px] lg:w-[70px]"
              />
              <div>
                <p class="font-bold text-sm lg:text-2xl text-white">Wind Speed</p>
                <p class="font-bold text-xs lg:text-2xl text-white">${
                  data.wind.speed
                } m/s</p>
              </div>
            </div>
          </div>
          <div class="flex gap-8 mx-5 lg:gap-10 lg:mt-10 lg:ml-12">
            <div class="flex gap-2 mt-10 lg:mr-8">
              <img
                src="./Img/icons/temperature.png"
                alt=""
                class="w-[25px] h-[25px] lg:h-[70px] lg:w-[70px]"
              />
              <div>
                <p class="font-bold text-sm lg:text-2xl text-white">Feel Like</p>
                <p class="font-bold text-xs lg:text-2xl text-white">${(
                  data.main.feels_like - 273.15
                ).toFixed(2)}  &deg;C</p>
              </div>
            </div>
            <div class="flex gap-5 mt-10 lg:mr-8">
              <img
                src="./Img/icons/sunrise.png"
                alt=""
                class="w-[25px] h-[25px] lg:h-[70px] lg:w-[70px]"
              />
              <div>
                <p class="font-bold text-sm lg:text-2xl text-white">Sunrise</p>
                <p class="font-bold text-xs lg:text-2xl text-white">${formatTime(
                  data.sys.sunrise
                )}</p>
              </div>
            </div>
            <div class="flex gap-5 mt-10">
              <img src="./Img/icons/sunset.png" alt="" class="w-[30px] h-[30px] lg:h-[70px] lg:w-[70px]"/>
              <div>
                <p class="font-bold text-sm lg:text-2xl text-white">Sunset</p>
                <p class="font-bold text-xs lg:text-2xl text-white">${formatTime(
                  data.sys.sunset
                )}</p>
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
              }@4x.png" alt="" width="100" height="100" />
              <p class="text-xl lg:text-2xl font-bold text-white">${(
                forecast.main.temp - 273.15
              ).toFixed(2)}  &deg;C</p>
              <p class="text-2xl font-bold text-white">${date.getHours()}:00</p>
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
      let daysMap = {};
      data.list.forEach((forecast) => {
        let date = new Date(forecast.dt_txt);

        let dayKey = date.toISOString().split("T")[0];

        if (!daysMap[dayKey]) {
          daysMap[dayKey] = [];
        }
        daysMap[dayKey].push(forecast);
      });

      let allDays = Object.keys(daysMap);

      let nextFiveDays = allDays.slice(1, 6);

      fiveDaysForecastElements.innerHTML = "";
      nextFiveDays.forEach((dayKey) => {
        let forecasts = daysMap[dayKey];

        let avgTemp =
          forecasts.reduce((sum, f) => sum + f.main.temp, 0) / forecasts.length;

        let icon = forecasts[Math.floor(forecasts.length / 2)].weather[0].icon;
        icon = icon.replace("n", "d");

        let date = new Date(dayKey);
        let dayName = days[date.getDay()];

        fiveDaysForecastElements.innerHTML += `
        <div
            class="bg-blue-500 text-white text-center justify-items-center py-3 lg:py-5 lg:px-3 mx-20 lg:mx-0 my-5 lg:my-0 rounded-4xl shadow-lg border-black border-2"
          >
            <p class="font-bold text-2xl lg:text-3xl">${dayName}</p>
            <img
              src="https://openweathermap.org/img/wn/${icon}@4x.png"
              alt=""
              class="w-[200px] h-[200px] lg:h-[300px] lg:w-[300px]"
            />
            <p class="font-bold text-xl lg:text-3xl">${(
              avgTemp - 273.15
            ).toFixed(2)} &deg;C</p>
          </div>
      `;
      });
      displayWeatherChart(data);
    })
    .catch(() => {
      alert("Error fetching forecast data. Please try again later.");
    });

}

function getCityCoordinates() {
  let cityName = cityInput.value.trim();
  cityInput.value = "";
  if (!cityName) return;
  let GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      if (!data[0]) {
        alert("Could not find city for your location.");
        return;
      }
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
    let REVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;

    fetch(REVERSE_GEOCODING_URL)
      .then((res) => res.json())
      .then((data) => {
        let { name, country } = data[0];
        getWeatherData(name, latitude, longitude, country);
      })
      .catch((err) => {
        console.error("Reverse geocoding error:", err);
        alert("Error fetching coordinates of user.");
      });
  });
}

searchButton.addEventListener("click", getCityCoordinates);
currentLocationButton.addEventListener("click", getUserCoordinates);
window.addEventListener("DOMContentLoaded", getUserCoordinates);
