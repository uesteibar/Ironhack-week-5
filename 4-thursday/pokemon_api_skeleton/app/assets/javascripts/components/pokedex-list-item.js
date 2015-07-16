var PokedexListItemComponent = function() {};

PokedexListItemComponent.prototype.template = function(pokemon) {
  return '<li class="pokedex-list-item"><a href="">' + pokemon.name + '</a></li>';
};

PokedexListItemComponent.prototype.render = function(pokemon) {
  return this.template(pokemon);
};

module.exports = PokedexListItemComponent;
