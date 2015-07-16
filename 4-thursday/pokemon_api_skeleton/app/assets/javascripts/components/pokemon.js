var PokemonComponent = function(container, pokemon) {
  this.container = container;
  this.pokemon = pokemon;
};

PokemonComponent.prototype.template = function(pokemon) {
  return '<h1>' + pokemon.name + '</h1>';
};

PokemonComponent.prototype.render = function() {
  this.container.html(this.template(this.pokemon));
};

module.exports = PokemonComponent;
