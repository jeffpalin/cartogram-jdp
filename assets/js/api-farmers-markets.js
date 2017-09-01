$("#submitCoordinates").on("click", function(event) {
  event.preventDefault();
  lat = $("#lat").val();
  lng = $("#lng").val();
  getResults(lat, lng);
  });

// AJAX Get based on Lat & Lng

function getResults(lat, lng) {
    urlFarmersMarkets = "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=" + lat + "&lng=" + lng;
    console.log(urlFarmersMarkets);

        $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        // submit a get request to the restful service mktDetail.
        url: urlFarmersMarkets,
        dataType: 'jsonp',
        jsonpCallback: 'detailResultHandler'
    }).done(function(response) {
    console.log(response);
});

    //iterate through the JSON result object.
    function detailResultHandler(detailresults) {
        for (var key in detailresults) {
            alert(key);
            var results = detailresults[key];
            alert(results['GoogleLink']);
            console.log(results);
        }
    }
}



