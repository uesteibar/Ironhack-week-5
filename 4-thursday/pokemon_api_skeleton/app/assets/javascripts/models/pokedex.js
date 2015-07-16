var PokedexModel = function() {
  this.url = '/api/pokedex/1';
};

PokedexModel.prototype.getAll = function(callback) {
  var request = $.get(this.url);
  request.done(function(pokemons) {
    callback(pokemons);
  });
};

module.exports = PokedexModel;
