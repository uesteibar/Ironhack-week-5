var SongListItemComponent = function() {};

SongListItemComponent.prototype.template = function(song, index) {
  var html = '<div class="song-list-item" data-index="' + index + '">' +
  '<p>' + song.authors.join(' & ') + '</p>' +
  '<p>' + song.title + '</p>' +
  '</div>';
  return html;
};

module.exports = SongListItemComponent;
