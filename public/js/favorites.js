$(window).on('load', function() {
    var currentUser = sessionStorage.getItem('fb_id')
    console.log(currentUser);
    $.get("/api/favorites", function(data) {
      console.log(data);
      var userData = [];
      console.log(data[0].fb_id);
      for (var i = 0; i < data.length; i++) {
        if (data[i].fb_id == currentUser) {
          userData.push(data[i]);
        }
      }
      console.log(userData)
      console.log(userData[0].Beers[0].beer_name)
      // console.log(JSON.parse(data));
      var resultLen = userData[0].Beers.length;
      var results = userData[0].Beers;
      for (var i = 0; i < resultLen; i++) {
        if (i === 0) {
          var $topRow = $(`<tr id='top'><th>Beer Name</th><th>Description</th><th>ABV</th><th>Label</th><th>Brewery Name</th>`);
          $('#searchResults').append($topRow);
        }
        var $newRow = $(`<tr><th>${results[i].beer_name}</th><th>${results[i].beer_desc}</th><th>${results[i].beer_abv}%</th><th><img src='${results[i].beer_labelUrl}'></th><th>${results[i].brewery_name}</th></tr>`);
        $('#searchResults').append($newRow);
      }
    });
  });
