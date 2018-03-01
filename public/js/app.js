var brewerySearch;
var radius;
var options;
var map;
var markers = [];
var mapCenter;

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
$('#submitButton').on('click', function(){
    event.preventDefault();
    $.post("/api/brewery-search", $('#brewery-search').text, function(){
        markers = [];
        var infoWindow = new google.maps.InfoWindow();
        //Display Map

        $('#map').css({
            'display': 'inline-block',
            'width': '100%',
            'height': '400px',
            'border': 'solid',
            // 'border-left': 'none',
            'margin-top': '20px'
        });

        $('#images').css({
            'display': 'inline-block',
            'width': '100%',
            'height': '347px',
            'margin-top': '20px',
            'overflow': 'scroll'
        })
        $('html, body').animate({
            scrollTop: $('#searchForm').offset().top
        }, 1000);
        $('#frontPage').css({
            'height': '100%'
        });
        $('#infoWindowHeader').css({
            'color': '#fcbd20;'
        });
    });
});
