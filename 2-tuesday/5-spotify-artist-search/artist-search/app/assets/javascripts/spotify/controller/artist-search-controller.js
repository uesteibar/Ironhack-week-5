var ArtistSearchController = function() {};

ArtistSearchController.prototype.init = function() {
  var ArtistRetriever = require('../model/artist-retriever');
  var AlbumRetriever = require('../model/album-retriever');

  $(document).ready(function() {
    $('form#search').on('submit', function(event) {
      event.preventDefault();
      var term = $('form').serializeArray()[0].value;

      var retriever = new ArtistRetriever();
      retriever.search(term, function(artists) {
        var cardList = '';
        artists.forEach(function(artist) {
          cardList += artistCard(artist);
        });
        $('div#results').html(cardList);
      });
    });

    $('div#results').on('click', 'button[data-action="albums"]', function(event) {
      event.preventDefault();
      var container = $(event.target.parentElement);
      var albumsContainer = $(container.find('#albumscontainer')[0]);

      var albumRetriever = new AlbumRetriever();
      albumRetriever.getAlbums(container[0].dataset.artistid, function(albums) {
        albumsContainer.html(albumList(albums));
        albumsContainer.fadeToggle(true);
      });
    });


    $('div#results').on('click', 'button[data-action="listen"]', function(event) {
      event.preventDefault();

      console.log(event.currentTarget.dataset.albumid);

    });
  });
};

var artistCard = function(artist) {
  var card = '<div class="jumbotron col-md-6 col-md-offset-3">' +
    '<div class="container" data-artistid="' + artist.id + '">' +
    '<h2 class="text-center">' + artist.name + '</h2>' +
    '<p class="text-center">' + artist.followersCount + ' followers</p>' +
    '<p class="text-center">' + artist.popularity + ' popularity points</p>';
  if (artist.imageUrl) {
    card += '<img src="' + artist.imageUrl + '" class="img-responsive" />';
  }
  card += '<button type="button" data-action="albums" class="center-block btn btn-primary">See Albums</button>' +
    '<div id="albumscontainer" style="display: none;"></div>' +
    '</div>' +
    '</div>';
  return card;
};

var albumList = function(albums) {
  var html = '';
  albums.forEach(function(album) {
    html += albumCard(album);
  });
  return html;
}

var albumCard = function(album) {
  return '<div class="media">' +
    '<div class="media-left">' +
      '<a href="#">' +
        '<img class="media-object" height="50" width="50" src="' + album.imageUrl + '">' +
      '</a>' +
    '</div>' +
    '<div class="media-body">' +
      '<h4 class="media-heading">' + album.title + '</h4>' +
      '<button class="btn btn-primary btn-xs" data-albumid="' + album.id + '" data-action="listen">Listen</button>' +
    '</div>' +
  '</div>'
};

module.exports = ArtistSearchController;
