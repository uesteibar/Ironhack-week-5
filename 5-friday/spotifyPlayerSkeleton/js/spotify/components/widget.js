var WidgetComponent = function(selector, options) {
  this.selector = selector;
  this.playing = false;
  this.options = options;
};

WidgetComponent.prototype.update = function(song) {
  this.pause();
  $(this.selector + ' #title').text(song.title);
  $(this.selector + ' #author').text(song.authors.join(' & '));
  $(this.selector + ' audio').attr('src', song.previewUrl);
  $(this.selector + ' .cover img').attr('src', song.imageUrl);
  $(this.selector + ' .seekbar progress').attr('value', 0);
  $(this.selector + ' .btn-play').toggleClass('disabled', false);

  $(this.selector + ' audio').attr('src', song.previewUrl);

  this.declareEvents();

  if (this.options.autoplay) {
    this.play();
  }
};

WidgetComponent.prototype.declareEvents = function() {
  audioPlayer = $(this.selector + ' audio');

  audioPlayer.on('timeupdate', function(event) {
    event.preventDefault();
    this.updateProgressBar();
  }.bind(this));

  audioPlayer.bind('ended', function(event) {
    if (this.options.loop) {
      this.play();
    } else {
      this.stop();
    }
  }.bind(this));
};

WidgetComponent.prototype.setLoop = function (loop) {
  this.loop = loop;
};

WidgetComponent.prototype.updateProgressBar = function() {
  var currentTime = $(this.selector + ' audio').prop('currentTime');
  $(this.selector + ' .seekbar progress').attr('value', currentTime);
};

WidgetComponent.prototype.play = function() {
  $(this.selector + ' audio').trigger('play');
  $(this.selector + ' .btn-play').toggleClass('playing', true);

  this.playing = true;
};

WidgetComponent.prototype.pause = function() {
  $(this.selector + ' audio').trigger('pause');
  $(this.selector + ' .btn-play').toggleClass('playing', false);

  this.playing = false;
};

WidgetComponent.prototype.stop = function() {
  this.pause();
  $(this.selector + ' .seekbar progress').attr('value', 0);
};

module.exports = WidgetComponent;
