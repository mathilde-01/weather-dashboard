console.log("script", "connected");

var ApiKey = "5baa3eb3f1fb49cff1d20f45856a9452";
var cityName = "";
var fetchButton = document.getElementById("fetch-button");
var cityBox = document.querySelector(".boxCity");

function weatherApi(cityName) {
  var weatherUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${ApiKey}`;

  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      console.log(lat, lon);
      return fetchCurrent(lat, lon);
      // .then(function () { // this should be in fetchCurrent
      //   return fetchCurrent(lat, lon);
      // });
    })

    .then(function (data) {
      console.log(data); //grab data
    });
}
// weatherApi(cityName);

// Current search box
function fetchCurrent(lat, lon) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?=${cityName}&lat=${lat}&units=imperial&lon=${lon}&appid=${ApiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      // current city
      var currentCityInput = $("#inputCity").val("")
      var currentCityEl = document.getElementById("inputCity")
      console.log(currentCityInput)
      currentCityEl.textContent = currentCityInput
      // create current day
      var currentDay = moment().format("M/D/YYYY")
      console.log(currentDay)
      var day = document.createElement('h2')
      day.textContent = currentDay
      cityBox.appendChild(day)
      // create current temp
      var temp = document.createElement('p')
      temp.textContent = `\n`+`Temp:${data.main.temp}`
      cityBox.appendChild(temp)
      // create current wind 
      var wind = document.createElement('p')
      wind.textContent = `\n`+`Wind:${data.wind.speed}` + `MPH`
      cityBox.appendChild(wind)
      // create current humidity
      var humid = document.createElement('p')
      humid.textContent = `\n`+`Humidity:${data.main.humidity}`+ `%`
      cityBox.appendChild(humid)
    
    });
 
}

// called when the search form is submitted
$(".form").on("submit", function() {
  event.preventDefault();
  
  // get name of city searched
  var cityName = $("#inputCity").val();

  if (cityName === "" || cityName == null) {
      // send alert if search input is empty when submitted
      alert("Please enter name of city.");
      event.preventDefault();
  } else {
      // if cityName is valid, add it to search history list and display its weather conditions
      fetchCurrent(cityName);
      fetchForecast(cityName);
      weatherApi(cityName);
  }
});

// fetchButton.addEventListener("click", fetchCurrent);

// weather cards
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
        var temp = document.createElement('p')
      temp.textContent = `\n`+`Temp:${data.main.temp}`
      cityBox.appendChild(temp)
      }
    });
}

//local storage
