



var initMap = function() {
    var options = {
        center: mapCenter,
        zoom: 5
    };
    map = new google.maps.Map(
        document.getElementById('map'),
        options
    );

}

   var addMarker = function(markers) {

             var options = {
            center: { lat: 39.5, lng: -98.35 },
            zoom: 4
             };
            
            for (var i = 0; i < markers.length; i++) {
                
                new google.maps.Marker({
                    position: markers[i].coords,
                    map:map
                });
            }

            
            if (markers.content) {
                var infoWindow = new google.maps.InfoWindow({
                    content: '<h1>' + locationName + '</h1>'
                });


                markers.addListener('click', function() {
                    infoWindow.open(map, markers[i]);
                });
            
            };
       // marker.setMap(map)
    } 