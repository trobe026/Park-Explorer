var initMap = function() {
    var options = {
        center: markers[0].coords,
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
          


           (function(marker, i) {
                    // add click event
                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow = new google.maps.InfoWindow({
                            content: marker.content
                        });
                        infowindow.open(map, marker);

                        var url = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=jsonpcallback&tagmode=all&tags=' + markers[i].flickrImg;
                        console.log(markers[i].flickrImg);

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
