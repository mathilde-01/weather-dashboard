console.log("script", "connected");

var ApiKey = "5baa3eb3f1fb49cff1d20f45856a9452";
var cityName = "";
var fetchButton = document.getElementById("fetch-button");
var cityBox = document.querySelector(".boxCity");
var lat = "";
var lon = "";
var savedSearches = [];

function weatherApi(cityName) {
  var weatherUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${ApiKey}`;

  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      lat = data[0].lat;
      lon = data[0].lon;
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

// Current search box
function fetchCurrent(lat, lon) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?=${cityName}&lat=${lat}&units=imperial&lon=${lon}&appid=${ApiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // current city
      cityBox.innerHTML = "";
      var currentCity = document.createElement("h6");
      currentCity.textContent = `${data.name}`;
      cityBox.appendChild(currentCity);
      // create current day
      var currentDay = moment().format("M/D/YYYY");
      console.log(currentDay);
      var day = document.createElement("p");
      day.textContent = currentDay;
      cityBox.appendChild(day);
      var imgIcon = document.createElement("img");
      imgIcon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
      cityBox.appendChild(imgIcon);
      // create current temp
      var temp = document.createElement("p");
      temp.textContent = `\n` + `Temp:${data.main.temp}`;
      cityBox.appendChild(temp);
      // create current wind
      var wind = document.createElement("p");
      wind.textContent = `\n` + `Wind:${data.wind.speed}` + `MPH`;
      cityBox.appendChild(wind);
      // create current humidity
      var humid = document.createElement("p");
      humid.textContent = `\n` + `Humidity:${data.main.humidity}` + `%`;
      cityBox.appendChild(humid);

      fetchForecast(lat, lon);
    });
}

// called when the search form is submitted
$(".form").on("submit", function () {
  event.preventDefault();

  // get name of city searched
  var cityName = $("#inputCity").val();

  if (cityName === "" || cityName == null) {
    // send alert if search input is empty when submitted
    alert("Please enter name of city.");
    event.preventDefault();
  } else {
    // if cityName is valid, add it to search history list and display its weather conditions
    weatherApi(cityName);
    //local Storage code
  }
});

// weather cards
function fetchForecast(lat, lon) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${ApiKey}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var cardFiveDay = document.querySelectorAll(".card-fiveday");
      var j = 0;
      for (var i = 0; i < data.list.length; i = i + 8) {
        console.log(data.list[i]);
        cardFiveDay[j].innerHTML = "";
        var currentDay = moment(data.list[i].dt_txt).format("M/D/YYYY");
        console.log(currentDay);
        var day = document.createElement("h2");
        day.textContent = currentDay;
        cardFiveDay[j].appendChild(day);
        var imgIcon = document.createElement("img");
        imgIcon.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`
        );
        cardFiveDay[j].appendChild(imgIcon);
        var temp = document.createElement("p");
        temp.textContent = `Temp:${data.list[i].main.temp}`;
        cardFiveDay[j].appendChild(temp);
        // create current day
        // create current temp

        // create current wind
        var wind = document.createElement("p");
        wind.textContent = `\n` + `Wind:${data.list[i].wind.speed}` + `MPH`;
        cardFiveDay[j].appendChild(wind);
        // create current humidity
        var humid = document.createElement("p");
        humid.textContent =
          `\n` + `Humidity:${data.list[i].main.humidity}` + `%`;
        cardFiveDay[j].appendChild(humid);
        j++;
      }
    });
}

//local storage
var searchList = function (savedCities) {
  // create entry with city name
  var searchHistoryEntry = $("<button>");
  var searchHistoryContainer = document.querySelector(
    ".search-history-container"
  );

  searchHistoryEntry.text(cityName);
  console.log();
  searchHistoryContainer.append(searchHistoryEntry);

  fetchButton.addEventListener("click", savedCities()); //click event

  if (savedSearches.length > 0) {
    // update savedSearches array with previously saved searches
    var savedSearches = localStorage.getItem("");
    savedSearches = JSON.parse();
  }

  // add city name to array of saved searches
  savedSearches.push(cityName);
  localStorage.setItem("savedSearches", JSON.stringify(savedSearches));

  // reset search input
  $("#inputCity").val("");
};
