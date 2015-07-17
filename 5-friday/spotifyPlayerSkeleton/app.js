
(function() {
  var retriever = require('./spotify/spotify-retriever');
  var SongListComponent = require('./spotify/components/song-list');
  var SongListItemComponent = require('./spotify/components/song-list-item');
  var WidgetComponent = require('./spotify/components/widget');

  $(document).ready(function() {
    var resultsContainer = $('div#search-results');
    var searchForm = $('form#search');
    var widget = new WidgetComponent($('div#widget'));
    var currentSongs = [];

    searchForm.on('submit', function(event) {
      event.preventDefault();
      var term = $('input[name="term"]')[0].value;
      retriever.search(term, function(songs) {
        currentSongs = songs;
        component = new SongListComponent(resultsContainer, songs, new SongListItemComponent());
        component.render();
      });
    });

    resultsContainer.on('click', 'a[data-index]', function(event) {
      event.preventDefault();
      var index = event.currentTarget.dataset.index;
      widget.update(currentSongs[index]);
    });
  });
})();
