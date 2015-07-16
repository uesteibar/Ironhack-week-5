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
};

module.exports = PokedexComponent;
