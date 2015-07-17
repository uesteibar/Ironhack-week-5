(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var retriever = require('./spotify/spotify-retriever');
  var SongListComponent = require('./spotify/components/song-list');
  var SongListItemComponent = require('./spotify/components/song-list-item');
  var WidgetComponent = require('./spotify/components/widget');

  $(document).ready(function() {
    var resultsContainer = $('div#search-results');
    var searchForm = $('form#search');
    var widgetElement = $('div#widget');
    var widget = new WidgetComponent('div#widget');
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
      widget.play();
    });

    widgetElement.on('click', '.btn-play', function(event) {
      event.preventDefault();
      if (widget.playing) {
        widget.pause();
      } else {
        widget.play();
      }
    });
  });
})();

},{"./spotify/components/song-list":3,"./spotify/components/song-list-item":2,"./spotify/components/widget":4,"./spotify/spotify-retriever":6}],2:[function(require,module,exports){
var SongListItemComponent = function() {};

SongListItemComponent.prototype.template = function(song, index) {
  var html = '<li><a href="" data-index="' + index + '">' + song.title + '</a></li>';
  return html;
};

module.exports = SongListItemComponent;

},{}],3:[function(require,module,exports){
var SongListComponent = function(container, songs, itemComponent) {
  this.container = container;
  this.songs = songs;
  this.itemComponent = itemComponent;
};

SongListComponent.prototype.template = function(songs) {
  var html = '';
  songs.forEach(function(song, index) {
    html += this.itemComponent.template(song, index);
  }.bind(this));
  return '<ul>' + html +'</ul>';
};

SongListComponent.prototype.render = function () {
  this.container.html(this.template(this.songs));
};

module.exports = SongListComponent;

},{}],4:[function(require,module,exports){

var WidgetComponent = function(selector) {
  this.selector = selector;
  this.playing = false;
};

WidgetComponent.prototype.update = function (song) {
  this.pause();
  $(this.selector + ' #title').text(song.title);
  $(this.selector + ' #author').text(song.authors.join(' & '));
  $(this.selector + ' audio').attr('src', song.previewUrl);
  $(this.selector + ' .cover img').attr('src', song.imageUrl);
  $(this.selector + ' .seekbar progress').attr('value', 0);

  $(this.selector + ' .btn-play').toggleClass('disabled', false);
};

WidgetComponent.prototype.play = function () {
  $(this.selector + ' audio').trigger('play');
  $(this.selector + ' .btn-play').toggleClass('playing', true);

  this.playing = true;
};

WidgetComponent.prototype.pause = function () {
  $(this.selector + ' audio').trigger('pause');
  $(this.selector + ' .btn-play').toggleClass('playing', false);

  this.playing = false;
};

module.exports = WidgetComponent;

},{}],5:[function(require,module,exports){
var Song = function(attributes) {
  this.title = attributes.title;
  this.authors = attributes.authors.map(function(author) {
    return author.name;
  });
  this.album = attributes.album;
  if (attributes.image) {
    this.imageUrl = attributes.image.url;
  }
  this.previewUrl = attributes.previewUrl;
};

module.exports = Song;

},{}],6:[function(require,module,exports){
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

},{"./models/song":5}]},{},[1]);
