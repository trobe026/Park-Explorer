var initMap = function() {
    var options = {
        center: { lat: 39.5, lng: -98.35 },
        zoom: 4
    };
    map = new google.maps.Map(
        document.getElementById('map'),
        options
    );
}

var addMarker = function(markers) {
        
        for (var i = 0; i < markers.length; i++) {

        var content = markers[i].content

           var marker =  new google.maps.Marker({
                position: markers[i].coords,
                content: content,
                map:map
            });

           console.log(markers[i].content);


           (function(marker, i) {
                    // add click event
                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow = new google.maps.InfoWindow({
                            content: marker.content
                        });
                        infowindow.open(map, marker);
                    });
                })(marker, i);     
        };//close For loop
}//close addMarker function 