
// declaring global variables
var state;
var radius;
var options;
var map;
var markers = [];



$.ajax({
    "async": true,
    "crossDomain": true,
    "url": "https://developer.nps.gov/api/v1/campgrounds?limit=10%20=&api_key=FnU7EWa9B2RlDnwnu33mMpYJZuWYhXAbYfGxkFh8",
    "method": "GET",
    "headers": {
        "authorization": "Basic Og==",
        "cache-control": "no-cache",
        "postman-token": "509a7a9e-dd99-d214-70d9-793c94ad5033"
    }
}).done(function(response) {

    // var results = response.
    console.log(response);
});


//Search on-click reveals the map and column with information.
$('#submitButton').on('click', function() {
    var state = $('#state').val().trim();
    var radius = $('#radius').val().trim();
    initMap(state);

})




//Search on-click reveals the map and column with information.
$('#submitButton').on('click', function() {
    state = $('#state').val().trim();
    radius = $('#radius').val().trim();


    //Search result gets passed through NPS/Instagram APIs.
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&limit=10%20=&api_key=FnU7EWa9B2RlDnwnu33mMpYJZuWYhXAbYfGxkFh8",
        "method": "GET",
        "headers": {
            "authorization": "Basic Og==",
            "cache-control": "no-cache",
            "postman-token": "509a7a9e-dd99-d214-70d9-793c94ad5033"
        }
    }

    //AJAX response for NPS and Instagram
    $.ajax(settings).done(function(response) {

        //pulled variables from National Park Service website
        var results = response.data;
        var latitude
        var longitude
        var locationName

        $.each(results, function(index, value) {
            //Latitude variable grabber

          var latLong = results[index].latLong

          // Slice the string to break out latLong into two values.

            latitude = latLong.slice(latLong.indexOf(':') + 1, latLong.indexOf(','));
            longitude = latLong.slice(latLong.lastIndexOf(':') +1);
            console.log(latitude);
            console.log(longitude);
            //Get the location name 
            locationName = results[index].fullName;
            console.log(locationName);

          // add markers from results
            var currentMarker = [{
                    coords: { lat: latitude, lng: longitude},
                    iconImage: '',
                    content: '<h1>Portland </h1>'
                }];

            currentMarker.push(markers)
            console.log(markers)
        })
        console.log(results);
    });


    // Map opens with 10 results (markers) that are based on location. The map is located in the div id "googleMap".
    //Map Options

    //A list version of the results of the google search appear on the left column. The column is named div id "infoColumn".
});

