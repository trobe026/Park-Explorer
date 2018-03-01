var pos
var map;
var service;
var infowindow;
var destinationList = [];

var fetchLocalBreweries = function (pos) {
  // find breweries near the user or latlng of the brewery we searched
  var settings;
  
  var request = {
    location: {
      lat: pos.lat,
      lng: pos.lng
    },
    radius: '2000',
    type: ['bar'],
    keyword: "brewery"
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);


  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length && i < 4; i++) {
        var place = results[i];
        if (results[i].permanently_closed == true) {
          return;
        }
        destinationList.push(results[i].id);
        // createMarker(results[i]);
      }
    }
  }
  // if there aren't five breweries nearby, grab some top-rated pubs
  if (destinationList.length < 5) {
    var request = {
      location: {
        lat: pos.lat,
        lng: pos.lng
      },
      radius: '2000',
      type: ['bar'],
      keyword: "pub"
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);


    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length && destinationList.length < 5; i++) {
          var place = results[i];
          if (results[i].permanently_closed == true) {
            return;
          }
          destinationList.push(results[i].id)
          // createMarker(results[i]);
        }
      }
    }
  }
  destinationList.splice(0, (destinationList.length - 5));
  console.log(destinationList);

  // now that we have destinations, let's have google brew up a nice path among them and slap it on the map
  calculateAndDisplayRoute(destinationList);

}
// if we've already searched for the brewery, center the map on that and find nearby destinations
if (1 == 9) {


}
// // otherwise, use current location
else {
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 30.307182, lng: -97.755996 },
      zoom: 12
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
        fetchLocalBreweries(pos)
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
};


// this takes our destinations array and turns them into directions

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var waypts = [];
  for (var i = 2; i < destinationList.length; i++) {
    waypts.push({
      location: destinationList[i],
      stopover: true
    });
  }
  console.log(destinationList);


  directionsService.route({
    origin: {
      id: destinationList[0]
    },
    destination: {
     id: destinationList[1]
    },
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: 'TRANSIT'
  }, function (response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      var summaryPanel = document.getElementById('map');
      summaryPanel.innerHTML = '';
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
          '</b><br>';
        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      }
    } else {
      window.alert('Directions request failed due to ' + status);
    };
  });
}



// // AJAX response for NPS and Instagram
// $.ajax(settings).done(function (response) {
//   console.log(response);
//   //pulled variables from National Park Service website
//   var results = response.data;
//   var latitude
//   var longitude
//   var locationName

//   $.each(results, function (index, value) {

//     var latLong = results[index].latLong

//     //Get the location name
//     locationName = results[index].fullName;


//     // Slice the string to break out latLong into two values.
//     latitude = parseFloat(latLong.slice(latLong.indexOf(':') + 1, latLong.indexOf(',')));
//     longitude = parseFloat(latLong.slice(latLong.lastIndexOf(':') + 1));



//     //  add markers/ from results
//     var currentMarker = {
//       coords: { lat: latitude, lng: longitude },
//       content: '<h1>' + locationName + '</h1>',
//       flickrImg: locationName
//     };

//     if (isNaN(latitude)) {
//       badMarkers.push(currentMarker);
//       console.log(locationName + 'does not have latitude');
//     } else {
//       markers.push(currentMarker);
//     }

//     // Push the markers into the array


//   });
//   mapCenter = markers[2].coords;
//   console.log(mapCenter);
//   initMap();
//   addMarker(markers);
// });
