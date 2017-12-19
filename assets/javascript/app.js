// declaring global variables

var state;
var radius;
var options;
var map;
var markers = [];
var mapCenter;


// $(window).on('load', function() {


    //Search on-click reveals the map and column with information.
    $('#submitButton').on('click', function() {
        var state = $('#state').val().trim();
        markers = [];
        var infoWindow = new google.maps.InfoWindow();
        //Display Map
        $('#map').css({
            'display': 'inline-block',
            'width': '100%',
            'height': '400px',
            'border': 'solid',
            'border-left': 'none',
            'margin-top': '20px'
            });
        $('#infoColumn').css({
            'display': 'inline-block',
            'width': '100%',
            'height': '400px',
            'border': 'solid',
            'margin-top': '20px'
        })
        $('#images').css({
            'display': 'inline-block',
            'width': '100%',
            'height': '350px',
            'margin-top': '20px',
            'overflow': 'scroll'
        })
        $('html, body').animate({
            scrollTop: $('#searchForm').offset().top
        }, 1000);

        //Search result gets passed through NPS/ API.
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&limit=20%20=&api_key=FnU7EWa9B2RlDnwnu33mMpYJZuWYhXAbYfGxkFh8",
            "method": "GET",
            "headers": {
                "authorization": "Basic Og==",
                "cache-control": "no-cache",
                "postman-token": "509a7a9e-dd99-d214-70d9-793c94ad5033"
            }
        }

        //AJAX response for NPS and Instagram
        $.ajax(settings).done(function(response) {
            console.log(response);
            //pulled variables from National Park Service website
            var results = response.data;
            var latitude
            var longitude
            var locationName

            $.each(results, function(index, value) {

                var latLong = results[index].latLong

                //Get the location name
                locationName = results[index].fullName;
                // console.log(locationName);
                // FLICKR API LOGIC

              //   var url = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=jsonpcallback&tagmode=all&tags=' + locationName;
              //
              //   $.ajax({
              //     url: url,
              //     method: "GET",
              //     dataType: 'jsonp'
              //   })
              //   .done(function(response) {
              //       console.log("test");
              //     })
              //   .fail(function(error) {
              //     console.log(error);
              //   })
              // console.log(locationName);


                // Slice the string to break out latLong into two values.
                latitude = parseFloat(latLong.slice(latLong.indexOf(':') + 1, latLong.indexOf(',')));
                longitude = parseFloat(latLong.slice(latLong.lastIndexOf(':') + 1));

                //  add markers/ from results


            if (isNaN(latitude)) {
                console.log(locationName + 'does not have latitude');
            } else {

                var currentMarker = {

                    coords: { lat: latitude, lng: longitude },
                    content: '<h1>' + locationName + '</h1>',
                    flickrImg: locationName
                };


                // Push the markers into the array
                markers.push(currentMarker);
            }

        });
        mapCenter = markers[0].coords;
        console.log(mapCenter);
        initMap();
        addMarker(markers);
    });
    // Map opens with 10 results (markers) that are based on location. The map is located in the div id "googleMap".
    //Map Options



    //A list version of the results of the google search appear on the left column. The column is named div id "infoColumn".
});