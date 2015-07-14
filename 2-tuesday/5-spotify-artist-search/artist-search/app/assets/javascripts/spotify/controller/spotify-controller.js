
var ArtistSearchController = require('./artist-search-controller');

var SpotifyController = function() {
  this.searchController = new ArtistSearchController()
};

module.exports = SpotifyController;
