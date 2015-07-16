var PokedexCircleItemComponent = function() {};

PokedexCircleItemComponent.prototype.template = function(pokemon) {
  return '<li class="pokedex-circle-item">' +
          '<div>' + pokemon.name + '</div>' +
        '</li>';
};

PokedexCircleItemComponent.prototype.render = function(pokemon) {
  return this.template(pokemon);
};

module.exports = PokedexCircleItemComponent;
