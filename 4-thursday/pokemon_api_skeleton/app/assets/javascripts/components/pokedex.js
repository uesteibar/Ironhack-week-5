var PokemonModel = require('../models/pokemon');
var PokemonComponent = require('./pokemon');

var PokedexComponent = function(container, pokemons, itemComponent) {
  this.container = container;
  this.pokemons = pokemons;
  console.log(itemComponent);
  this.itemComponent = itemComponent;
};

PokedexComponent.prototype.template = function(pokemons) {
  var html = '';
  console.log(pokemons);
  pokemons.forEach(function(pokemon) {
    html += '<ul>' +
      this.itemComponent.render(pokemon) +
      '</ul>';
  }.bind(this));
  return html;
};

PokedexComponent.prototype.render = function() {
  this.container.html(this.template(this.pokemons));

  $(this.container).on('click', '[data-action="pokemon-details"]', function(event) {
    event.preventDefault();
    var pokemon = new PokemonModel(event.currentTarget.dataset.id);
    console.log(pokemon);
    var pokemonComponent = new PokemonComponent($('.pokedex-container'), pokemon);
    pokemon.fetch(function() {
      pokemonComponent.render();
    });
  });
};

module.exports = PokedexComponent;
