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

// --- LOCATION FUNCTION ---
function decodeLocation(){
  var api_key = 'AIzaSyBYvm6i_3YLimMJdS6BAHLKWLW9g723m8o';
  // Use google maps geolocation api to retrieve exact coordinates
  navigator.geolocation.getCurrentPosition(function(position){
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
  }).done(function(response){
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







