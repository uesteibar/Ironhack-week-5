var PokemonModel = require('./models/pokemon');
var PokedexModel = require('./models/pokedex');

var PokemonComponent = require('./components/pokemon');
var PokedexComponent = require('./components/pokedex');
var PokedexItemComponent = require('./components/pokedex-list-item');

var Router = function(container) {
  this.container = container;
};

Router.prototype.renderPokemonComponent = function(id) {
  var pokemon = new PokemonModel(id);
  var pokemonComponent = new PokemonComponent($('.pokedex-container'), pokemon);

  pokemon.fetch(function() {
    pokemonComponent.render();
  });
};

Router.prototype.renderPokedexComponent = function() {
  var pokedex = new PokedexModel();
  pokedex.getAll(function(result) {
    pokedexComponent = new PokedexComponent(
      $('.pokedex-list'),
      result.pokemon,
      new PokedexItemComponent()
    );
    pokedexComponent.render();
  });
};

module.exports = Router;
