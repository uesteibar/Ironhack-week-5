var SongListItemComponent = function() {};

SongListItemComponent.prototype.template = function(song, index) {
  var html = '<li><a href="" data-index="' + index + '">' + song.title + '</a></li>';
  return html;
};

module.exports = SongListItemComponent;
