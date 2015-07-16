var PokemonModel = function(id, cacheManager) {
  this.id = id;
  this.cacheManager = cacheManager;
  this.url = '/api/pokemon/';
};

PokemonModel.prototype.fetch = function(callback) {
  var pokemon = this.cacheManager.fetch(this.id);
  if (pokemon) {
    $.extend(this, pokemon);
    callback();
  } else {
    var request = $.get(this.url + this.id);

    request.done(function(result) {
      this.cacheManager.save(result);
      $.extend(this, result);
      callback();
    }.bind(this));
  }
};

module.exports = PokemonModel;
