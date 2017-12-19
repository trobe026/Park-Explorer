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


        

        for (var i = 0; i < markers.length; i++) {

        var content = '<div id="iw-content"' + markers[i].content + '</div>'

           var marker =  new google.maps.Marker({
                position: markers[i].coords,
                content: content,
                map:map
            });

           console.log(markers[i].flickrImg);
          var infoWindow = new google.maps.InfoWindow();


           (function(marker, i) {

                    marker.addListener('mouseover', function() {
                            infoWindow.setContent(marker.content);
                            infoWindow.open(map, marker);
                        });
                        // add click event
                    google.maps.event.addListener(marker, 'click', function() {
                        infoWindow.setContent(marker.content);
                        infoWindow.open(map, marker);

                        var url = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=jsonpcallback&tagmode=all&tags=' + markers[i].flickrImg;
                        console.log(markers[i].flickrImg);

                        

                        // assuming you also want to hide the infowindow when user mouses-out
                        marker.addListener('mouseout', function() {
                            infoWindow.close();
                        });

                        $.ajax({
                          url: url,
                          method: "GET",
                          dataType: 'jsonp'
                        })
                        .done(function(response) {
                            console.log("test");
                          })
                        .fail(function(error) {
                          console.log(error);
                        })
                      // console.log(locationName);
                        console.log(marker.content);
                    });
                })(marker, i);
        };//close For loop
}//close addMarker function

