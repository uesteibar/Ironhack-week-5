var PokemonRetriever = function() {};

PokemonRetriever.prototype.makeRequest = function(id) {

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function(response) {
    if (xhr.readyState === 4) {
        $('body').prepend(xhr.responseText);
    }
  };

  xhr.open('GET', 'http://pokeapi.co/api/v1/pokemon/' + id + '/');
  xhr.send();
};

module.exports = PokemonRetriever;
