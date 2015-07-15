var Handlebars = require('handlebars');

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

      var albumRetriever = new AlbumRetriever();
      albumRetriever.get(event.currentTarget.dataset.albumid, function(album) {
        var source = $("#album-modal-template").html();
        var template = Handlebars.compile(source);
        console.log(album);
        html = template(album);
        $(html).modal();
      });
    });
  });
};

var artistCard = function(artist) {
  var source = $("#artist-card").html();
  var template = Handlebars.compile(source);
  return template(artist);
};

var albumList = function(albums) {
  var html = '';
  albums.forEach(function(album) {
    html += albumCard(album);
  });
  return html;
}

var albumCard = function(album) {
  var source = $("#album-media").html();
  var template = Handlebars.compile(source);
  return template(album);
};



module.exports = ArtistSearchController;
