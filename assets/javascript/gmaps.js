



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
       // marker.setMap(map)
    } //Listen for click on map
    // function mapMarkers(){};


    
    // google.maps.event.addListener(map, 'click',
    //     function(event) {
    //         //add marker on click
    //         addMarker({ coords: event.latLng });
    //     });
    // var marker = new google.maps.Marker({
    //  position: {lat:45.5231, lng: -122.6765},
    //    map:map

    // });

    // var infoWindow = new google.maps.InfoWindow({
    //  content: '<h1> Portland, OR </h1>'
    // });

    // marker.addListener('click', function(){
    //  infoWindow.open(map,marker);
    // })


    // //create array of markers
    // var markers = [{
    //         coords: { lat: 45.5231, lng: -122.6765 },
    //         iconImage: '',
    //         content: '<h1>Portland </h1>'
    //     },
    //     {
    //         coords: { lat: 44.9429, lng: -123.0351 },
    //         iconImage: '',
    //         content: '<h1>Salem </h1>'
    //     },
    //     {
    //         coords: { lat: 45.7054, lng: -121.5215 },
    //         iconImage: '',
    //         content: '<h1>Hood River </h1>'
    //     }
    // ];
    //loop through markers
    

    // addMarker({
    //  coords:{lat:45.5231, lng: -122.6765},
    //  iconImage: '',
    //  content: '<h1>Portland </h1>'
    // });
    // addMarker({
    //  coords:{lat:44.9429, lng: -123.0351},
    //  iconImage: '',
    //  content: '<h1>Salem </h1>'
    // });
    // addMarker({
    //  coords:{lat:45.7054, lng: -121.5215},
    //  iconImage:'',
    //  content: '<h1>Hood River </h1>'
    // });

    

