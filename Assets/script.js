function weatherApi() {
  var weatherUrl = "https://api.openweathermap.org/data/3.0/onecall?";

  // lat={lat}&lon={lon}&exclude={part}&appid={API key}";

  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
    });
}
