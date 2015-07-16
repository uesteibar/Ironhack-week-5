
var PokemonModel = function(id) {
  this.id = id;
  this.url = '/api/pokemon/';
};

PokemonModel.prototype.fetch = function (callback) {
  var request = $.get(this.url + this.id);

  request.done(function(result) {
    callback(result);
  });
};

module.exports = PokemonModel;
