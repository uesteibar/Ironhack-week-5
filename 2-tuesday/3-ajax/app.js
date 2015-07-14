
var PokemonRetriever = require('./pokemon-retriever');

var pokemonRetriever = new PokemonRetriever();

console.log('requesting...');
pokemonRetriever.makeRequest(1);
