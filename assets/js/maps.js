// Display map on page and find location

var map, infoWindow;

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

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
    navigator.geolocation.getCurrentPosition(function (position) {
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
        }).done(function (response) {
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
    .mousedown(function () {
        $('.topbar').hide();
        $('.toolbar').hide();

    })
    .mouseup(function () {
        $('.topbar').show();
        $('.toolbar').show();
        $('.card.blue-grey.darken-1').css('background-color', 'rgba(0, 0, 0, 0)');
    });

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