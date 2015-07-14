var Album = require('./album');
var Song = require('./song');

var AlbumRetriever = function() {};

AlbumRetriever.prototype.getAlbums = function(artistID, callback) {
  var request = $.get('https://api.spotify.com/v1/artists/' + artistID + '/albums');

  request.done(function(albums) {
    res_albums = albums.items.map(function(album) {
      return new Album({
        title: album.name,
        image: album.images[0],
        url: album.href,
        id: album.id
      });
    });
    callback(res_albums);
  });
};

AlbumRetriever.prototype.get = function(id, callback) {
  var request = $.get('https://api.spotify.com/v1/albums/' + id);

  request.done(function(album) {
    var songs = album.tracks.items.map(function(song) {
      return new Song({
        title: song.name,
        previewUrl: song.preview_url
      });
    });

    console.log(album);
    callback(new Album({
      title: album.name,
      image: album.images[0],
      url: album.href,
      id: album.id
    }, songs));
  });
};

module.exports = AlbumRetriever;
