var PokedexCache = function() {};

PokedexCache.prototype.getAll = function () {
  console.log(sessionStorage.getItem('pokemons'));
  return JSON.parse(sessionStorage.getItem('pokemons'));
};

PokedexCache.prototype.save = function (pokemons) {
  sessionStorage.setItem('pokemons', JSON.stringify(pokemons))
};

module.exports = PokedexCache;
