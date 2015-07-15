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
