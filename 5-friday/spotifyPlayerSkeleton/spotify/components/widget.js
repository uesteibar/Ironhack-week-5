
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
