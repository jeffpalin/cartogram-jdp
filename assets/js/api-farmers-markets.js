$("#submitCoordinates").on("click", function (event) {
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
  }).done(function (response) {
    console.log(response);

    //Variable for Distance and Name

    var marketName1 = (response.results[0].marketname);
    var marketName2 = (response.results[1].marketname);
    var marketName3 = (response.results[2].marketname);

    console.log(marketName1);
    console.log(marketName2);
    console.log(marketName3);

    $("#farmersMarket1").text(marketName1);
    $("#farmersMarket2").text(marketName2);
    $("#farmersMarket3").text(marketName3);
  });
};