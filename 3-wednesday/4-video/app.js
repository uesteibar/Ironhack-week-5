(function() {
  var video = document.querySelector('video');
  var goToFavourite = document.querySelector('button#gotofavourite');
  var restart = document.querySelector('button#restart');
  var loop = document.querySelector('button#loop');
  video.play();

  goToFavourite.onclick = function(event) {
    video.currentTime = 10;
  };

  restart.onclick = function(event) {
    video.currentTime = 0;
  };

  loop.onclick = function(event) {
    video.loop = true;
  };


})();
