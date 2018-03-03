var pos
var map;
var service;
var infowindow;
var destinationList = [];
var waypts = [];
var travelModeSelection = "BICYCLING";

$(window).resize(function () {
  $('#map').css(`height`, window.innerHeight);
});

function fetchLocalBreweries(pos) {
  // find breweries near the user or latlng of the brewery we searched
  var settings;
  service = new google.maps.places.PlacesService(map);
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  // Create a renderer for directions and bind it to the map.
  var directionsDisplay = new google.maps.DirectionsRenderer({ map: map });
  // Instantiate an info window to hold step text.
  var stepDisplay = new google.maps.InfoWindow;

  var request = {
    location: {
      lat: pos.lat,
      lng: pos.lng
    },
    radius: '2000',
    keyword: "brewery"
  };
  console.log(request);
  service.nearbySearch(request, cb);
  function cb(results, status) {
    console.log(status);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(results);
      console.log('got em');
      for (var i = 0; i < results.length && i < 4; i++) {
        var place = {
          name: results[i].vicinity,
          place_id: results[i].place_id
        }
        if (results[i].permanently_closed == true) {
          return;
        }

        destinationList.push(place);
        // createMarker(results[i]);
      }
      // if there aren't five breweries nearby, grab some top-rated pubs
      if (destinationList >= 5) {
        console.log('test')
        destinationList.splice(4, (destinationList.length - 5));
        console.log(destinationList);
        calculateAndDisplayRoute(
          directionsDisplay, directionsService, stepDisplay, map);
      } else if (destinationList.length < 5) {
        console.log('test2')
        var request = {
          location: {
            lat: pos.lat,
            lng: pos.lng
          },
          radius: '2000',
          types: ['bar'],
          keyword: "pub"
        };

        service.nearbySearch(request, callback);

        function callback(results, status) {
          console.log(results);
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length && destinationList.length < 5; i++) {
              var place = {
                name: results[i].vicinity,
                place_id: results[i].place_id
              };
              if (results[i].permanently_closed == true) {
                return;
              }
              destinationList.push(place)
              console.log(destinationList)
              // createMarker(results[i]);
            }
          }
          // Display the route between the initial start and end selections.
          calculateAndDisplayRoute(
            directionsDisplay, directionsService, stepDisplay, map);
          // Listen to change events from the start and end lists.
          // var onChangeHandler = function () {
          //   calculateAndDisplayRoute(
          //     directionsDisplay, directionsService,y, stepDisplay, map);
          // };
          // // document.getElementById('start').addEventListener('change', onChangeHandler);
          // document.getElementById('end').addEventListener('change', onChangeHandler);
        }
      }
    } else {
      var request = {
        location: {
          lat: pos.lat,
          lng: pos.lng
        },
        radius: '2000',
        keyword: "pub"
      };

      service.nearbySearch(request, callback);

      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length
            && destinationList.length < 5; i++) {
            var place = {
              name: results[i].vicinity,
              place_id: results[i].place_id
            };
            if (results[i].permanently_closed == true) {
              return;
            }
            destinationList.push(place)
            // createMarker(results[i]);
          }
        }
        // Display the route between the initial start and end selections.
        calculateAndDisplayRoute(
          directionsDisplay, directionsService, stepDisplay, map);
      }
      console.log("no breweries found nearby, but here are some pubs.");
      console.log(status)
    }
  }
}


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 30.307182, lng: -97.755996 },
    zoom: 14
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Your Location');
      // infoWindow.open(map);
      map.setCenter(pos);
      fetchLocalBreweries(pos);
    }, function () {
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
};


// this takes our destinations array and turns them into directions
function calculateAndDisplayRoute(directionsDisplay, directionsService, stepDisplay, map) {
  destinationList.splice(0, (destinationList.length - 5));

  console.log("this is the destination list:")
  console.log(destinationList);


  // First, remove any existing markers from the map.

  // make the waypoints for the round trip
  var waypts = [];
  for (var i = 0; i < destinationList.length; i++) {
    waypts.push({
      location: destinationList[i].name,
      stopover: true
    });
  }
  console.log(waypts);
  console.log(destinationList);

  // Retrieve the start and end locations and create a DirectionsRequest using
  // BICYCLING directions.
  directionsService.route({
    origin: waypts[0].location,
    destination: waypts[0].location,
    waypoints: waypts,
    travelMode: travelModeSelection,
  }, function (response, status) {
    console.log(status)
    console.log(response)
    for (var i = 0; i < response.geocoded_waypoints.length; i++) {
      if (response.geocoded_waypoints[i].geocoder_status === "ZERO_RESULTS") {
        // response.geocoded_waypoints[i].geocoder_status = "OK";
        // status = 'OK';
      }
    }

    // Route the directions and pass the response to a function to create
    // markers for each step.
    if (status === 'OK') {
      document.getElementById('warnings-panel').innerHTML =
        '<b>' + response.routes[0].warnings + '</b>';
      directionsDisplay.setDirections(response);
      console.log("This is the response:")
      console.log(response);
      var summaryPanel = document.getElementById('directions-panel');
      summaryPanel.innerHTML = '';
      // For each route, display summary information.
      var route = response.routes[0];
      // console.log(route.legs);
      summaryPanel.innerHTML = "";
      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        if (i == 0) {
          summaryPanel.innerHTML += '<h3>' + destinationList[0].name +
            '</h3><br>';
        } else {
          summaryPanel.innerHTML += '<h3>to ' + waypts[(response.routes[0].waypoint_order[(i - 1)])].location +
            '</h3><br>';
        }

        summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
          '</b><br>';
        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        summaryPanel.innerHTML += route.legs[i].distance.text + ', ' + route.legs[i].duration.text + '<br><br>';
      };
    } else {
      console.log('Directions request failed due to ' + status);
    }
  });
}
function attachInstructionText(stepDisplay, marker, text, map) {
  google.maps.event.addListener(marker, 'click', function () {
    // Open an info window when the marker is clicked on, containing the text
    // of the step.
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}
