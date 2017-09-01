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

// Find location of user
function getLocation() {
  var format = 'json';
  var queryURL = 'https://freegeoip.net/' + format + '/?callback=?';
  // Use google maps geolocation api to retrieve exact coordinates
  navigator.geolocation.getCurrentPosition(function(position){
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    // Define data object using JSON response from freegeoip.net
    var data = {
    lat: pos.lat,
    lng: pos.lng
  };
  // Call upon data and write to page in desired locations
  $.ajax({
    url: queryURL,
    method: 'GET',
    dataType: 'json',
    data: data,
  }).done(function(response){
    $('#location').html(data.lat);
  }); 
  });
}
getLocation();





