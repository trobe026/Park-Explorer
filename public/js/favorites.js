$(window).on('load', function() {
    
    $.get("/api/favorites", function(data) {
        console.log(JSON.parse(data));

//     for (var i = 0; i < resultLen; i++) {
//     if (i === 0) {
//       var $topRow = $(`<tr id='top'><th>Beer Name</th><th>Description</th><th>ABV</th><th>Label</th><th>Brewery Name</th><th>Save</th>`);
//       $('#searchResults').append($topRow);
//     }

//     var $newRow = $(`<tr><th>${results[i].beer.beer_name}</th><th>${results[i].beer.beer_description}</th><th>${results[i].beer.beer_abv}%</th><th><img src='${results[i].beer.beer_label}'></th><th>${results[i].brewery.brewery_name}</th><<th><button class="btn btn-default"><span class="glyphicon glyphicon-heart"></span></button></th></tr>`);
//   $('#searchResults').append($newRow);
//   }
});
  });

  