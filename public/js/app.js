var brewerySearch;
var radius;
var options;
var map;
var markers = [];
var mapCenter;
var travelModeSelection = "BICYCLING";

$('#map').css({
    'display': 'inline-block',
    'width': '100%',
    'height': '100vh',
    'border': 'solid',
    // 'border-left': 'none',
    'margin-top': '20px'
});
        var infoWindow = new google.maps.InfoWindow();
//Search on-click reveals the map and column with information.
// $('#submitButton').on('click', function(){
//     event.preventDefault();
//     $.post("/api/brewery-search", $('#brewery-search').text, function(req, res){
//         console.log("this is where the response goes");
//         console.log(res)
//     });
// });
