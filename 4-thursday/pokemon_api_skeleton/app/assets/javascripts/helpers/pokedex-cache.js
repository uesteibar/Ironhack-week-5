var PokedexCache = function() {};

PokedexCache.prototype.getAll = function () {
  return JSON.parse(sessionStorage.getItem('pokedex'));
};

PokedexCache.prototype.save = function (pokemons) {
  sessionStorage.setItem('pokedex', JSON.stringify(pokemons))
};

module.exports = PokedexCache;
