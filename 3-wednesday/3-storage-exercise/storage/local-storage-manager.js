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
