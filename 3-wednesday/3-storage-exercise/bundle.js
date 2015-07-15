(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./location/location-manager":2,"./storage/local-storage-manager":3}],2:[function(require,module,exports){
var LocationManager = function(storageManager) {
  this.storageManager = storageManager;
  this.options = {
    enableHighAccuracy: true
  };
};

LocationManager.prototype.saveCurrentLocation = function(callback) {
  if ('geolocation' in navigator) {
    var onError = function(error) {
      console.error(error);
    };

    var onSuccess = function(position) {
      console.log('saving location...');
      console.log(position);
      this.storageManager.addLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      callback(this.getLocations());
    }.bind(this);

    navigator.geolocation.getCurrentPosition(onSuccess, onError, this.options);
  } else {
    console.error('No geolocation!')
  }
};

LocationManager.prototype.getLocations = function () {
  return this.storageManager.getLocations();
};

LocationManager.prototype.clearLocations = function () {
  this.storageManager.clearLocations();
  console.log('deleted');
};

module.exports = LocationManager;

},{}],3:[function(require,module,exports){
var LocalStorageManager = function() {};

LocalStorageManager.prototype.addLocation = function(location) {
  var locations = this.getLocations();

  if (locations === null) {
    locations = [];
    console.log('first track!');
  }

  console.log(locations);
  console.log(location);
  locations.push(location);
  console.log(locations);
  localStorage.setItem('tracks', JSON.stringify(locations));
};

LocalStorageManager.prototype.getLocations = function () {
  return JSON.parse(localStorage.getItem('tracks'));
};

LocalStorageManager.prototype.clearLocations = function () {
  localStorage.removeItem('tracks');
};

module.exports = LocalStorageManager;

},{}]},{},[1]);
