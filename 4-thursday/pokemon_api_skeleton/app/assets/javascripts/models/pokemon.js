
var PokemonModel = function(id) {
  this.id = id;
  this.url = '/api/pokemon/';
};

PokemonModel.prototype.fetch = function (callback) {
  var request = $.get(this.url + this.id);

  request.done(function(result) {
    $.extend(this, result);
    callback();
  }.bind(this));
};

module.exports = PokemonModel;
