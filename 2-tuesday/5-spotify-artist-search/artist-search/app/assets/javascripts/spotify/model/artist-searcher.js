var Artist = require('./artist');

var ArtistSearcher = function() {};

ArtistSearcher.prototype.search = function(term, callback) {
  var request = $.get('https://api.spotify.com/v1/search?type=artist&query=' + term);

  request.done(function(artists) {
    var res_artists = artists.artists.items.map(function(artist) {
      return new Artist(artist.name);
    });
    callback(res_artists);
  });
};

module.exports = ArtistSearcher;
