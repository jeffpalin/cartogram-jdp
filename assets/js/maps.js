// Display map on page and find location
var map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };


            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

// --- LOCATION FUNCTION ---
function decodeLocation() {
    var api_key = 'AIzaSyBYvm6i_3YLimMJdS6BAHLKWLW9g723m8o';
    // Use google maps geolocation api to retrieve exact coordinates
    navigator.geolocation.getCurrentPosition(function(position) {
        // Position object, includes latitude and longitude
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        // Define latlng parameter using a variable
        var latlng = pos.lat + ',' + pos.lng;
        console.log(latlng);
        // Structure URL
        var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&result_type=street_address' + '&key=' + api_key;
        // Begin ajax call 
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            // Loop through JSON object to retrieve desired response result
            for (var i = 0; i < response.results.length; i++) {
                // Define address using JSON object
                var address = response.results[i].formatted_address;
                // Write address to page
                $('#location').html(address);
            }
        });
    });
}
decodeLocation();

// // Selected weather information - can be edited as needed
//       var currentLocation = response.name;
//       //Temperature in fahrenheit
//       var currentTemp = 9 / 5 * (parseInt(response.main.temp) - 273) + 32;
//       var currentHumidity = response.main.humidity;
//       //Wind Speed in MPH
//       windSpeed = 0.621371 * (response.wind.speed);
//       //Weather Description Text
//       weatherType = response.weather[0].description;
//       //Weather Icon Code
//       weatherIcon = response.weather[0].icon;
//       //Weather Icon Actual Image File
//       iconImage = "http://openweathermap.org/img/w/" + weatherIcon + ".png";



function getWeather() {
  var api_key = "e1d9840d8542ded69ac25a4b5ffc320b";
    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        var lat = pos.lat;
        var lng = pos.lng;
        var queryURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&appid=' + api_key;
        var data = {
            'coord': {
                'lon': lng,
                'lat': lat
            },
            'weather': []
        };

        $.ajax({
            url: queryURL,
            method: 'GET',
            data: data
        }).done(function(response) {
            for (var i = 0; i < response.weather.length; i++) {
                //Weather Icon Code
                var weatherIcon = response.weather[i].icon;
                //Weather Icon Actual Image File
                var iconImage = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
                // Create image div
                var img = $('<img>');
                // Add iconImage class
                img.addClass('iconImage');
                // Give img div src equal to iconImage variable
                img.attr('src', iconImage);
                //Show icon in weather icon area
                $('#weather-icon').html(img);
            }
            // Calculate current temperature in farenheit 
            var currentTemp = Math.round(9 / 5 * (parseInt(response.main.temp) - 273) + 32);
            // Calculate wind speed in MPH
            var windSpeed = Math.round(0.621371 * (response.wind.speed));
            // Write weather data to screen
            var weatherData = '<p><strong>Temperature: </strong>' + currentTemp + '&#8457</p><br>' +
                '<p><strong>Humidity: </strong>' + response.main.humidity + '%</p><br>' + '<p><strong>Wind Speed: </strong>' + windSpeed + ' MPH';
            $('#weatherData').html(weatherData);
        });
    });
}
getWeather();

$('#map')
  .mousedown(function(){
    $('.topbar').hide();
    $('.toolbar').hide();

  })
  .mouseup(function(){
    $('.topbar').show();
    $('.toolbar').show();
    $('.card.blue-grey.darken-1').css('background-color', 'rgba(0, 0, 0, 0)');
  });









// // ************* NOT WORKING ********************
// function showPlaces() {
//     navigator.geolocation.getCurrentPosition(function(position) {
//         var pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//         };
//         var api_key = 'AIzaSyBYvm6i_3YLimMJdS6BAHLKWLW9g723m8o';
//         var queryURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + pos.lat + ',' + pos.lng + 
//         '&radius=500&type=restaurant&keyword=cruise&key=' + api_key;
//         $.ajax({
//           url: queryURL,
//           method: 'GET',
//           dataType: 'jsonp',
//         }).done(function(response){
//           // for (var i = 0; i < response.results.length; i++) {
//             var pin = response.results[1].icon;
//             var attributions = response.html_attributions[0]
//             // var img = $('<img>');
//             // img.addClass('pins');
//             // img.attr('src', pin);
//             // $('#map').html('img');
//             console.log(pin);
//           // }

//         });
//     });
// }
// showPlaces();