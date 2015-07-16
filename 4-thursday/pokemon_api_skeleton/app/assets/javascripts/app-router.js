var PokemonModel = require('./models/pokemon');
var PokedexModel = require('./models/pokedex');

var PokedexCache = require('./helpers/pokedex-cache');
var PokemonCache = require('./helpers/pokemon-cache');

var PokemonComponent = require('./components/pokemon');
var PokedexComponent = require('./components/pokedex');
var PokedexItemComponent = require('./components/pokedex-list-item');

var Router = function(routes, defaultRoute) {
  this.routes = routes;
  this.defaultRoute = defaultRoute;
  this.listenToBack();
};

Router.prototype.setUrl = function(route) {
  if (route !== this.currentPath()) {
    window.history.pushState({
      path: this.currentPath()
    }, 'Pokedex', 'http://' + window.location.host + '/' + route);
  }
};

Router.prototype.listenToBack = function() {
  window.onpopstate = function(event) {
    this.go(event.state.path);
  }.bind(this);
};

Router.prototype.currentPath = function() {
  return window.location.pathname.slice(1);
};

Router.prototype.go = function(route) {
  if (route) {
    this.setUrl(route);
  }
  route = this.currentPath();
  if (!route) {
    route = this.defaultRoute;
    this.setUrl(route);
  }
  var regexRoute = /[\w-]+\//;
  var routeName = route.match(regexRoute)[0];
  var regexId = /\/(\d+)/;
  var id = route.match(regexId) == null ? null : parseInt(route.match(regexId)[1]);
  routeName = id ? routeName + ":id" : routeName;
  var methodToCall = this.routes[routeName];

  this[methodToCall](id);
};

Router.prototype.renderPokemonComponent = function(id) {
  var pokemon = new PokemonModel(id, new PokemonCache());
  var pokemonComponent = new PokemonComponent($('.pokedex-container'), pokemon);

  pokemon.fetch(function() {
    pokemonComponent.render();
  });
};

Router.prototype.renderPokedexComponent = function() {
  var pokedex = new PokedexModel(new PokedexCache());
  pokedex.getAll(function(result) {
    pokedexComponent = new PokedexComponent(
      $('.pokedex-container'),
      result.pokemon,
      new PokedexItemComponent()
    );
    pokedexComponent.render(this);
  }.bind(this));
};

module.exports = new Router({
  'pokedex/': 'renderPokedexComponent',
  'pokedex/:id': 'renderPokemonComponent'
}, 'pokedex/');
