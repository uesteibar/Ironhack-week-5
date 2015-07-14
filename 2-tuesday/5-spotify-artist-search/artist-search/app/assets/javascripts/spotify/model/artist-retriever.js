var Artist = require('./artist');

var ArtistRetriever = function() {};

ArtistRetriever.prototype.search = function(term, callback) {
  var request = $.get('https://api.spotify.com/v1/search?type=artist&query=' + term);

  request.done(function(artists) {
    var res_artists = artists.artists.items.map(function(artist) {
      return new Artist({
        name: artist.name,
        popularity: artist.popularity,
        followersCount: artist.followers.total,
        image: artist.images[0],
        url: artist.href,
        id: artist.id
      });
    });
    callback(res_artists);
  });
};

module.exports = ArtistRetriever;
