console.log("script", "connected");

var ApiKey = "5baa3eb3f1fb49cff1d20f45856a9452";
var cityName = "";
var fetchButton = document.getElementById("fetch-button");
var cityBox = document.querySelector("boxCity");

function weatherApi(name) {
  var weatherUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=${ApiKey}`;

  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      console.log(lat, lon);
      return fetchForecast(lat, lon).then(function () {
        return fetchCurrent(lat, lon);
      });
    })

    .then(function (data) {
      console.log(data); //grab data
    });
}
weatherApi("philadelphia");

function fetchForecast(lat, lon) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${ApiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.list.length; i = i + 8) {
        console.log(data.list[i]);
      }
    });
}

function fetchCurrent(lat, lon) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&units=imperial&lon=${lon}&appid=${ApiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.main.temp); //current temp
    });

  //create/ show current search
  var searchInput = $("#inputCity").value;
  var currentSearchEl = cityBox.createElement
  var currentDay = moment().format("M/D/YYYY");
  console.log(currentDay)

  currentTitle.text(`${cityName} (${currentDay})`)

  searchInput.append(currentSearchEl);
}

// fetchButton.addEventListener("click", fetchCurrent);


//local storage 