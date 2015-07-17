
var WidgetComponent = function(selector) {
  this.selector = selector;
};

WidgetComponent.prototype.update = function (song) {
  $('#widget #title').text(song.title);
  $('#widget #author').text(song.authors.join(' & '));
  $('#widget audio').attr('src', song.previewUrl);
  $('#widget .cover img').attr('src', song.imageUrl);
};

module.exports = WidgetComponent;
