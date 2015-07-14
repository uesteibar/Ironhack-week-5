
var ArtistSearchController = function() {};

ArtistSearchController.prototype.init = function () {
  var ArtistSearcher = require('../model/artist-searcher');

  $(document).ready(function() {
    $('form#search').on('submit', function(event) {
      event.preventDefault();
      var term = $('form').serializeArray()[0].value;
      var searcher = new ArtistSearcher();

      searcher.search(term, function(artists) {
        var cardList = '';
        artists.forEach(function(artist) {
          cardList += artistCard(artist);
        });
        $('div#results').html(cardList);
      });
    });
  });
};

var artistCard = function (artist) {
  var card = '<div class="jumbotron col-md-6 col-md-offset-3">' +
    '<div class="container">' +
      '<h2 class="text-center">' + artist.name + '</h2>' +
      '<p class="text-center">' + artist.followersCount + ' followers</p>' +
      '<p class="text-center">' + artist.popularity + ' popularity points</p>';
  if (artist.imageUrl) {
    card += '<img src="' + artist.imageUrl + '" class="img-responsive" />';
  }
  card += '<button type="button" class="center-block btn btn-primary btn-lg">See more</button>' +
  '</div>' +
  '</div>';
  return card;
};

module.exports = ArtistSearchController;
