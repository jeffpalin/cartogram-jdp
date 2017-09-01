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

// NOT WORKING: AJAX call to get location
// function getLocation(){
//   var api_key = 'AIzaSyBYvm6i_3YLimMJdS6BAHLKWLW9g723m8o';
//   var queryURL = 'http://www.googleapis.com/geolocation/v1/geolocate?key=' + api_key;
  
//   navigator.geolocation.getCurrentPosition(function(position){
//     var pos = {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude
//     };
//     var data = {
//       "location": {
//       "lat": pos.lat,
//       "lng": pos.lng
//       },
//       "accuracy": 1200.4
//     };

//     $.ajax({
//       url: queryURL,
//       method: 'GET',
//       dataType: 'json',
//       data: data
//     }).done(function(response){
//       console.log(data.location.pos.lat);
//     });
//   });
// }  
// getLocation();

// Find IP address of user
function getIP() {
  var format = 'json';
  var queryURL = 'http://freegeoip.net/' + format + '/?callback=?';
  navigator.geolocation.getCurrentPosition(function(position){
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    var data = {
    lat: pos.lat,
    lng: pos.lng
  };
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
getIP();





