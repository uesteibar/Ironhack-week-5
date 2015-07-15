(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
if ('geolocation' in navigator) {
  console.log('We have geolocation!');

  var onWatch = function(position) {
    console.log(position);
    console.log('looping...');

    var locationString = position.coords.latitude + ',' + position.coords.longitude;
    var target = {
      latitude: 41.39167,
      longitude: 2.17750
    }
    var targetString = target.latitude + ',' + target.longitude;

    $('p#currentlocation').text('current location => ' + locationString);
    $('p#targetlocation').text('target location => ' + targetString);

    // var target = {
    //   latitude: position.coords.latitude,
    //   longitude: position.coords.longitude
    // };

    $('div#map').html(
      '<img src="http://maps.googleapis.com/maps/api/staticmap?center=' +
      locationString +
      '&size=600x300&maptype=roadmap&zoom=20' +
      '&markers=color:red%7Clabel:Y%7C' + locationString +
      '&markers=color:blue%7Clabel:T%7C' + targetString +
      '" alt="">'
    );

    if ((Math.abs(position.coords.latitude - target.latitude) < 0.0001) && (Math.abs(position.coords.longitude - target.longitude) < 0.0001)) {
      window.alert("YOU ARRIVED!");
    }

  };

  var onError = function(err) {
    console.error(err);
  };

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  var watchId = navigator.geolocation.watchPosition(onWatch, onError, options);

}

},{}]},{},[1]);
