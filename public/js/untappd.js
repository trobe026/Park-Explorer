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
            UserFbId: sessionStorage.getItem("fb_id")
          };

          $.post("/api/newBeer", newBeer)
          .then(function(data) {
            console.log(data);
          });
        };
      });
    })
  });









  // var beer = $('#beer').val().trim();
  // var brewery = $('#beer').val().trim();
  // if (beer === null) {
  //   var queryURL = "https://api.untappd.com/v4/method_name?q=" + brewery;
  // } else {
  //   var queryURL = "https://api.untappd.com/v4/search/beer?q=" + beer;
  //   $.ajax({
  //     url: queryURL,
  //     method: "GET",
  //     data: {
  //       client_id: 'F6CEADEC4156A0C41AB03AA0DF49D327D016CE0E',
  //       client_secret: '34EFC492CF1AD7E4F6B4C84209E57AD0417CF947'
  //     }
  //   })
  //   .done(function(response) {
  //     console.log(response)
  //
  //     var resultLen = response.response.beers.items.length;
  //     var results = response.response.beers.items;
  //     console.log(response.response.beers.items[0].beer.beer_name);
  //     for (var i = 0; i < resultLen; i++) {
  //       if (i === 0) {
  //         var $topRow = $(`<tr id='top'><th>Beer Name</th><th>Description</th><th>ABV</th><th>Label</th><th>Brewery Name</th><th>Save</th>`);
  //         $('#searchResults').append($topRow);
  //       }
  //
  //       var $newRow = $(`<tr><th>${results[i].beer.beer_name}</th><th>${results[i].beer.beer_description}</th><th>${results[i].beer.beer_abv}%</th><th><img src='${results[i].beer.beer_label}'></th><th>${results[i].brewery.brewery_name}</th><<th><button class="btn btn-default"><span class="glyphicon glyphicon-heart"></span></button></th></tr>`);
  //     $('#searchResults').append($newRow);
  //     }
  //     $('.glyphicon').on('click', function() {
  //       if ($(this).attr('class') === 'glyphicon glyphicon-ok') {
  //         console.log('test1');
  //         $(this).attr('class','glyphicon glyphicon-heart');
  //         var delBeer = {
  //           beer_desc: $(this).parent().parent().siblings(':nth-child(2)').text()
  //         };
  //         $.post("/api/deleteBeer", delBeer)
  //         .then(function(data) {
  //           console.log(data);
  //         });
  //       } else {
  //         $(this).attr('class','glyphicon glyphicon-ok');
  //
  //         var newBeer = {
  //           beer_name: $(this).parent().parent().siblings(":first").text(),
  //           beer_desc: $(this).parent().parent().siblings(':nth-child(2)').text(),
  //           beer_abv: $(this).parent().parent().siblings(':nth-child(3)').text(),
  //           beer_labelUrl: $(this).parent().parent().siblings(':nth-child(4)').find('img').attr('src'),
  //           brewery_name: $(this).parent().parent().siblings(':nth-child(5)').text(),
  //           UserFbId: 2070550389628558
  //         };
  //
  //         $.post("/api/newBeer", newBeer)
  //         .then(function(data) {
  //           console.log(data);
  //         });
  //       };
  //     });
  //
  //   })
  // }
  // });
