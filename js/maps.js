// Display map on page and ask for location
var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
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

// Use api to call for lat / lng
var apikey = 'AIzaSyBYvm6i_3YLimMJdS6BAHLKWLW9g723m8o';
var queryURL = 'https://www.googleapis.com/geolocation/v1/geolocate?key=' + apikey;

function findCoords() {
  $.ajax({
    url: queryURL,
    data: {
      "considerIp": "true",
      "wifiAccessPoints": [
        {
            "macAddress": "00:25:9c:cf:1c:ac",
            "signalStrength": -43,
            "signalToNoiseRatio": 0
        },
        {
            "macAddress": "00:25:9c:cf:1c:ad",
            "signalStrength": -55,
            "signalToNoiseRatio": 0
        }
      ]
    },
    method: 'POST'

  }).done(function(response){
    $('#location').html(response.location.lat);
    console.log(response);
});
}
findCoords();








