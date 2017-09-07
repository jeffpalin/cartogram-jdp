// Initial Variables

var apiKey = "e1d9840d8542ded69ac25a4b5ffc320b";
var lat = "";
var lng = "";
var urlCurrentWeather = "";

// Grab coordinates on click from HTML form. Edit this to match working index.html

$("#submitCoordinates").on("click", function (event) {
  event.preventDefault();
  lat = $("#lat").val();
  lng = $("#lng").val();
  getWeather(lat, lng);
});

// AJAX Get based on Lat & Lng 

function getWeather(lat, lng) {
  urlCurrentWeather = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid=" + apiKey;
  console.log(urlCurrentWeather);

  $.ajax({
    url: urlCurrentWeather,
    method: "GET"
  }).done(function (response) {
    console.log(response);

    // Selected weather information - can be edited as needed
    var currentLocation = response.name;
    //Temperature in fahrenheit
    var currentTemp = 9 / 5 * (parseInt(response.main.temp) - 273) + 32;
    var currentHumidity = response.main.humidity;
    //Wind Speed in MPH
    var windSpeed = 0.621371 * (response.wind.speed);
    //Weather Description Text
    var weatherType = response.weather[0].description;
    //Weather Icon Code
    var weatherIcon = response.weather[0].icon;
    //Weather Icon Actual Image File
    var iconImage = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
    //Weather icon send to HTML class="icon"
    $(".icon").html("<img src='" + iconImage + "'>");

    console.log("Location: ", currentLocation);
    console.log("Temp: ", currentTemp);
    console.log("Humidity: ", currentHumidity);
    console.log("Wind: ", windSpeed);
    console.log("Description: ", weatherType);
    console.log("Weather Icon: ", weatherIcon);
  });
};