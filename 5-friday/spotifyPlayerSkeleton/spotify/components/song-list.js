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
