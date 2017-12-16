$( window ).on('load', function() {

  $('#api').on("click", function() {
    $('#infoColumn').html('');
    console.log("test");
    // var url = "http://api.brewerydb.com/v2/beers?key=6ace3c1403b84fb6ad1b906d575b5fa9&origin=&name=oberon&callback=JSON_CALLBACK";
    // var url2 = "http://api.amp.active.com/v2/search?query=walking&start_date=2017-12-01..&near=Austin,TX,US&radius=50&api_key=6ntx3a2jszpwjvqnnb278jnh";
    // var url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyA_jSC4gq080qjSP7akFLd5iELPh0IESfE";
    // var queryURL = "http://api.brewerydb.com/v2/?origin=*&key=6ace3c1403b84fb6ad1b906d575b5fa9";
    var input = $('#userInput').val();
    var url = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=jsonpcallback&tagmode=all&tags=' + input;

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
  });

});

function jsonpcallback(response) {
  for (var i = 0; i < 6; i++) {
    $('#infoColumn').append("<img src=" + response.items[i].media.m + ">");
  }
}
