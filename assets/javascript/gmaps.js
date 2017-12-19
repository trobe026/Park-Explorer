var initMap = function() {
    var options = {
        center: { lat: 45.5231, lng: -122.6765 },
        zoom: 4
    };
    map = new google.maps.Map(
        document.getElementById('map'),
        options
    );

}

   var addMarker = function(markers) {

             var options = {
            center: { lat: 45.5231, lng: -122.6765 },
            zoom: 6
             };

            for (var i = 0; i < markers.length; i++) {

                new google.maps.Marker({
                    position: markers[i].coords,
                    map:map
                });
            }


            if (markers.content) {
                var infoWindow = new google.maps.InfoWindow({
                    content: markers[i].content
                });

                marker.addListener('click', function() {
                    infoWindow.open(map, marker);
                });
            };
        }
};
