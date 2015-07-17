var Song = require('./models/song');

var SpotifyRetriever = function() {
  this.baseUrl = 'https://api.spotify.com/v1';
};

SpotifyRetriever.prototype.search = function(term, callback) {
  var request = $.get(this.baseUrl + '/search?type=track&q=' + term);

  request.done(function(result) {
    console.log(result);
    var songs = result.tracks.items.map(function(track) {
      return new Song({
        title: track.name,
        authors: track.artists,
        album: track.album.name,
        image: track.album.images[0],
        previewUrl: track.preview_url
      });
    });

    callback(songs);
  });
};

module.exports = new SpotifyRetriever();
