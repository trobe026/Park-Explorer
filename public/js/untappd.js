$('#search-btn').on('click', function() {
  $('#searchResults').empty();
  var beer = $('#beer').val().trim();
  var brewery = $('#beer').val().trim();
  if (beer === null) {
    var queryURL = "https://api.untappd.com/v4/method_name?client_id=F6CEADEC4156A0C41AB03AA0DF49D327D016CE0E&client_secret=34EFC492CF1AD7E4F6B4C84209E57AD0417CF947/search/brewery?q=" + brewery;
  } else {
    var queryURL = "https://api.untappd.com/v4/search/beer?q=" + beer; "?GET?client_id=F6CEADEC4156A0C41AB03AA0DF49D327D016CE0E&client_secret=34EFC492CF1AD7E4F6B4C84209E57AD0417CF947";
    $.ajax({
      url: queryURL,
      method: "GET",
      data: {
        client_id: 'F6CEADEC4156A0C41AB03AA0DF49D327D016CE0E',
        client_secret: '34EFC492CF1AD7E4F6B4C84209E57AD0417CF947'
      }
    })
    .done(function(response) {
      console.log(response)

      var resultLen = response.response.beers.items.length;
      var results = response.response.beers.items;
      console.log(response.response.beers.items[0].beer.beer_name);
      for (var i = 0; i < resultLen; i++) {
        var $newRow = $(`<tr><th>${results[i].beer.beer_name}</th><th>${results[i].beer.beer_description}</th><th>${results[i].beer.beer_abv}</th><th><img src='${results[i].beer.beer_label}'></th><th>${results[i].brewery.brewery_name}</th></tr>`
      );
      $('#searchResults').append($newRow);
      }

    })
  }
});
