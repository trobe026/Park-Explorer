$('#search-btn').on('click', function() {
  $('#searchResults').empty();


  var choice = {
    beer: $('#beer').val().trim(),
    brewery: $('#brewery').val().trim()
  };

    $.get("/api/", choice, function(data) {

      var beerData = JSON.parse(data);

      var resultLen = beerData.response.beers.items.length;
      var results = beerData.response.beers.items;
      for (var i = 0; i < resultLen; i++) {
        if (i === 0) {
          var $topRow = $(`<tr id='top'><th>Beer Name</th><th>Description</th><th>ABV</th><th>Label</th><th>Brewery Name</th><th>Save</th>`);
          $('#searchResults').append($topRow);
        }

        var $newRow = $(`<tr><th>${results[i].beer.beer_name}</th><th>${results[i].beer.beer_description}</th><th>${results[i].beer.beer_abv}%</th><th><img src='${results[i].beer.beer_label}'></th><th>${results[i].brewery.brewery_name}</th><<th><button class="btn btn-default"><span class="glyphicon glyphicon-heart"></span></button></th></tr>`);
      $('#searchResults').append($newRow);
      }
      $('.glyphicon').on('click', function() {
        if ($(this).attr('class') === 'glyphicon glyphicon-ok') {
          console.log('test1');
          $(this).attr('class','glyphicon glyphicon-heart');
          var delBeer = {
            beer_labelUrl: $(this).parent().parent().siblings(':nth-child(4)').find('img').attr('src')
          };
          $.post("/api/deleteBeer", delBeer)
          .then(function(data) {
            console.log(data);
          });
        } else {
          console.log('test2');
          $(this).attr('class','glyphicon glyphicon-ok');

          var newBeer = {
            beer_name: $(this).parent().parent().siblings(":first").text(),
            beer_desc: $(this).parent().parent().siblings(':nth-child(2)').text(),
            beer_abv: $(this).parent().parent().siblings(':nth-child(3)').text(),
            beer_labelUrl: $(this).parent().parent().siblings(':nth-child(4)').find('img').attr('src'),
            brewery_name: $(this).parent().parent().siblings(':nth-child(5)').text(),
            UserFbId: 2070550389628558
          };

          $.post("/api/newBeer", newBeer)
          .then(function(data) {
            console.log(data);
          });
        };
      });
    })
  });
