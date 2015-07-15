var LocationManager = require('./location/location-manager');
var LocalStorageManager = require('./storage/local-storage-manager');


$('button#savelocation').on('click', function(event) {
  event.preventDefault();
  locationManager = new LocationManager(new LocalStorageManager());
  locationManager.saveCurrentLocation(function(locations) {
    showLocations(locations);
    showLocationsMap(locations);
  });
});

$('button#clearlocations').on('click', function(event) {
  event.preventDefault();
  locationManager = new LocationManager(new LocalStorageManager());
  locationManager.clearLocations();
});

$('button#pastlocations').on('click', function(event) {
  event.preventDefault();
  locationManager = new LocationManager(new LocalStorageManager());
  locations = locationManager.getLocations();
  showLocations(locations);
  showLocationsMap(locations);
});

var showLocations = function(locations) {
  var html = '';
  if (locations) {
    locations.forEach(function(location) {
      html += '<li>latitude: ' + location.latitude + ', longitude: ' + location.longitude + '</li>'
    });
  }
  $('ul#locations').html(html);
}

var showLocationsMap = function(locations) {
  var url = '';
  if (locations) {
    var url = 'http://api.tiles.mapbox.com/v4/examples.map-zr0njcqy' +
      '/pin-l-scooter+970b18(' + locations[locations.length - 1].longitude + ',' + locations[locations.length - 1].latitude + ')' +
      '/' + locations[0].longitude + ',' + locations[0].latitude + ',' + 18 +
      '/' + 500 + 'x' + 500 + '.png' +
      '?access_token=pk.eyJ1IjoidWVzdGVpYmFyIiwiYSI6ImZjODAyZDIyNDE4N2I2NWNlY2MyNTg0YjMyZWM4NzFkIn0.-MvfAkHb0LtNy92Y1EDG3A';

  }
  $('img#map').attr('src', url);
}
