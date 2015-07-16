var PokedexListItemComponent = function() {};

PokedexListItemComponent.prototype.template = function(pokemon) {
  var uri_split = pokemon.resource_uri.split('/');
  var id = uri_split[uri_split.length - 2];
  return '<li class="pokedex-list-item"><a href="" data-action="pokemon-details" data-id="' + id + '">' + pokemon.name + '</a></li>';
};

PokedexListItemComponent.prototype.render = function(pokemon) {
  return this.template(pokemon);
};

module.exports = PokedexListItemComponent;
