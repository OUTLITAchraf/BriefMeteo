let searchButton = document.getElementById("search-button");
let CurrentLocation = document.getElementById("Currentlocation-button");
let cityInput = document.getElementById("city-input");
let todayWeatherElements = document.querySelector("#todayWeather");
let api_key = "561d905e67fc60afecba2387e4877853";

function getCityCoordinates() {
  let cityName = cityInput.value.trim();
  cityInput.value = "";
  if (!cityName) return;
  let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch(() => {
      alert(
        `Error fetching coordinates for ${cityName}. Please try again later.`
      );
    });
}
searchButton.addEventListener("click", getCityCoordinates);
