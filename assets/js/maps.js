// ============================== TABLE OF CONTENTS ==============================
// 01. Map Functions
// 02. Location Functions
// 03. Weather Functions
// 04. Toolbar Animations
// TODO: 05. Places Functions
// 06. Farmers Market Functions 
// ============================== TABLE OF CONTENTS ==============================

// --------- 01. MAP FUNCTIONS ------------------
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
            infoWindow.setContent('You');
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

// --- 02. LOCATION FUNCTIONS ---
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

// ----------- 03. WEATHER FUNCTIONS -------------
function getWeather() {
    var api_key = "e1d9840d8542ded69ac25a4b5ffc320b";
    navigator.geolocation.getCurrentPosition(function (position) {

        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        // Set easily referenced variables for lat and lng
        var lat = pos.lat;
        var lng = pos.lng;
        // Structure query URL
        var queryURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&appid=' + api_key;
        // Set data object
        var data = {
            'coord': {
                'lon': lng,
                'lat': lat
            },
            'weather': []
        };
        // Begin AJAX call
        $.ajax({
            url: queryURL,
            method: 'GET',
            data: data
        }).done(function(response) {
            // Loop through JSON response object
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
            // Calculate current temperature in farenheit, round to nearest whole number 
            var currentTemp = Math.round(9 / 5 * (parseInt(response.main.temp) - 273) + 32);
            // Calculate wind speed in MPH, round to nearest whole number
            var windSpeed = Math.round(0.621371 * (response.wind.speed));
            // Write weather data to widget
            var weatherData = '<p><strong>Temperature: </strong>' + currentTemp + '&#8457</p><br>' +
                '<p><strong>Humidity: </strong>' + response.main.humidity + '%</p><br>' + '<p><strong>Wind Speed: </strong>' + windSpeed + ' MPH';
            $('#weatherData').html(weatherData);
        });
    });
}
getWeather();

// -------- 04. TOOLBAR ANIMATIONS ----------
// Show / hide toolbars on map click
$('#map')
  // Fade toolbar out on mouse down
  .mousedown(function(){
    // I'm gonna use css transitions for this because jQuery fades have built in timeouts that we don't want
    $('.topbar, .toolbar').css("opacity", 0);
    $('.card.blue-ish.darken-1').css('background-color', 'rgba(84, 110, 122, 0.35)');
    $("#login-options, #settings-options").fadeOut();
  });
  // Fade toolbar in on mouse up - even if mouse up event isn't over map
$(document).mouseup(function(){
    $('.topbar, .toolbar').css("opacity", "");
    $('.card.blue-ish.darken-1').css('background-color', '');
  });


// -------- 05. FARMERS MARKET FUNCTIONS --------

function getFarmers(lat, lng){

  navigator.geolocation.getCurrentPosition(function(position){
    var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
    var lat = pos.lat;
    var lng = pos.lng;
    console.log(lat);
    console.log(lng);    
    var queryURL = 'https://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=' + lat + '&lng=' + lng;
    $.ajax({
      method: 'GET',
      contentType: 'application/json; charset=utf-8',
      url: queryURL,
      dataType: 'jsonp',
      jsonpCallback: 'detailResultsHandler'
    }).done(function(response){
     for (var i = 0; i < 3; i++){
      var markets = response.results[i].marketname;
      $('#farmersData').append('<p style="color: black;"><strong>Miles: </strong></p>' + markets + '<br>');
     }
  });
});
}
getFarmers();

      
function populateLocationWidget(pos) {
    var google_places_api_key = 'AIzaSyBYvm6i_3YLimMJdS6BAHLKWLW9g723m8o';
    // Structure URL
    var latlng = pos.lat + ',' + pos.lng;
    var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
        latlng + '&result_type=street_address' + '&key=' + google_places_api_key;
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (response) {
        // Loop through JSON object to retrieve desired response result
        for (var i = 0; i < response.results.length; i++) {
            // Define address using JSON object
            var address = response.results[i].formatted_address;
            // Write address to page
            $('#location').html(address);
        }
    });
}

function initMapLocationPlaces() {
    navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        populateLocationWidget(pos);
        map = new google.maps.Map(document.getElementById('map'), {
            center: pos,
            zoom: 15
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: pos,
            radius: 500,
            type: ['store']
        }, callback);
    }); // need to add error handling. what if you never got the location? What will you do
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

