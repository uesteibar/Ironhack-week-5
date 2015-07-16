var PokedexModel = function(cacheManager) {
  this.cacheManager = cacheManager;
  this.url = '/api/pokedex/1';
};

PokedexModel.prototype.getAll = function(callback) {
  var pokemons = this.cacheManager.getAll();
  if (pokemons) {
    callback(pokemons);
  } else {
    var request = $.get(this.url);
    request.done(function(pokemons) {
      this.cacheManager.save(pokemons);
      callback(pokemons);
    }.bind(this));
  }
};

module.exports = PokedexModel;
