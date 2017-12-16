var initMap = function() {
    var options = {
        center: { lat: 45.5231, lng: -122.6765 },
        zoom: 4
    };

    var map = new google.maps.Map(
        document.getElementById('map'),
        options
    );
    //Listen for click on map

    google.maps.event.addListener(map, 'click',
        function(event) {
            //add marker on click
            addMarker({ coords: event.latLng });
        });
    // var marker = new google.maps.Marker({
    //  position: {lat:45.5231, lng: -122.6765},
    //    map:map

    // });

    var infoWindow = new google.maps.InfoWindow({
     content: '<h1> Portland, OR </h1>'
    });

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
    for (var i = 0; i < markers.length; i++) {
        //add markers
        addMarker(markers[i]);
    };

    addMarker({
     coords:{lat:45.5231, lng: -122.6765},
     iconImage: '',
     content: '<h1>Portland </h1>'
    });
    addMarker({
     coords:{lat:44.9429, lng: -123.0351},
     iconImage: '',
     content: '<h1>Salem </h1>'
    });
    addMarker({
     coords:{lat:45.7054, lng: -121.5215},
     iconImage:'',
     content: '<h1>Hood River </h1>'
    });

    // function addMarker(props) {

    //     var marker = new google.maps.Marker({
    //         position: props.coords,
    //         map: map,
    //         // icon:props.iconImage
    //     });

    //     //Displays Icon Image if available
    //     if (props.iconImage) {
    //         //sets icon image
    //         marker.setIcon(props.iconImage);
    //     };

    //     if (props.content) {
    //         var infoWindow = new google.maps.InfoWindow({
    //             content: props.content
    //         });


    //         marker.addListener('click', function() {
    //             infoWindow.open(map, marker);
    //         });
    //     };
    // };
}