// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs

(function() {
  // var PokemonModel = require('./models/pokemon');
  // var PokemonComponent = require('./components/pokemon');

  // var pokemonModel = new PokemonModel(1);
  // pokemonModel.fetch(function(pokemon) {
  //   var pokemonComponent = new PokemonComponent($('.pokedex-container'), pokemon);
  //   pokemonComponent.render();
  // });

  var PokedexModel = require('./models/pokedex');
  var PokedexComponent = require('./components/pokedex');
  var PokedexItemComponent = require('./components/pokedex-list-item');

  var pokedex = new PokedexModel();
  pokedex.getAll(function(result) {
    pokedexComponent = new PokedexComponent(
      $('.pokedex-list'),
      result.pokemon,
      new PokedexItemComponent()
    );
    pokedexComponent.render();
  });

})();
