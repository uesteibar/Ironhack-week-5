var PokemonModel = require('./models/pokemon');
var PokedexModel = require('./models/pokedex');

var PokemonComponent = require('./components/pokemon');
var PokedexComponent = require('./components/pokedex');
var PokedexItemComponent = require('./components/pokedex-list-item');

var Router = function(routes) {
  this.routes = routes;
};

Router.prototype.go = function(route) {
  var regexRoute = /[\w-]+\//;
  var routeName = route.match(regexRoute)[0];
  var regexId = /\/(\d+)/;
  var id = route.match(regexId) == null ? null : parseInt(route.match(regexId)[1]);
  routeName = id ? routeName + ":id" : routeName;
  var methodToCall = this.routes[routeName];
  this[methodToCall](id);
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
    pokedexComponent.render(this);
  }.bind(this));
};

module.exports = new Router({
  'pokedex/': 'renderPokedexComponent',
  'pokedex/:id': 'renderPokemonComponent'
});
