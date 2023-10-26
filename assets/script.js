console.log("script", "connected");

var ApiKey = "5baa3eb3f1fb49cff1d20f45856a9452";
var cityName = "Philadelphia";
var fetchButton = document.getElementById("fetch-button");
var cityBox = document.querySelector("boxCity");

function weatherApi() {
  var weatherUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${ApiKey}`;

  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      // console.log(lat, lon);
      return [lat, lon];
    })

    .then(function (coordinates) {
      console.log(coordinates);
      return fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${ApiKey}`
      );
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data); //grab data
    });
}
weatherApi();

function citySearch() {
  var weatherUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${ApiKey}`;

  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (cityName) {
      // console.log(cityName)
      var cityName = data[0].city;

      var cityBoxTitle = document.createElement("h2"); //create
      cityBoxTitle.textContent = cityName; //text
      cityBox.appendChild(cityBoxTitle); // append
    });
  // .then(function (data) {
  //   var wind = data[0].list[0].wind;
  //   console.log(wind);
  //   return wind;
  // });
}
citySearch();
// fetchButton.addEventListener("click", citySearch);

// 1 fetch: make a call to the geocoding api url with the city name, and get coordinates from that response

// 2 fetch: using the coordinates from the call to geocoding, make a call to the forecase url
