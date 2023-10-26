console.log('script', 'connected')

function weatherApi() {
  var weatherUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=5baa3eb3f1fb49cff1d20f45856a9452";

  // lat={lat}&lon={lon}&exclude={part}&appid={API key}";

  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
    });
}
