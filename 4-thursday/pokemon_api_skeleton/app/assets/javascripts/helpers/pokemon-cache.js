var PokemonCache = function() {};

PokemonCache.prototype.fetch = function(id) {
  var pokemons = JSON.parse(sessionStorage.getItem('pokemons'));
  if (pokemons === null) {
    return null;
  } else {
    var pokemon = pokemons.filter(function(pokemon) {
      return pokemon.national_id === id;
    })[0];
    return pokemon;
  }
};

PokemonCache.prototype.save = function(pokemon) {
  var pokemons = JSON.parse(sessionStorage.getItem('pokemons'));
  if (pokemons === null) {
    pokemons = [];
  }
  if (!this.fetch(pokemon.national_id)) {
    console.log('saving new pokemon', pokemon);
    pokemons.push(pokemon);
    sessionStorage.setItem('pokemons', JSON.stringify(pokemons));
  }
};

module.exports = PokemonCache;
