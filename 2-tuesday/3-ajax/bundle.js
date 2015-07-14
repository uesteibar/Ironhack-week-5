(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var PokemonRetriever = require('./pokemon-retriever');

var pokemonRetriever = new PokemonRetriever();

console.log('requesting...');
pokemonRetriever.makeRequest(1);

},{"./pokemon-retriever":2}],2:[function(require,module,exports){
var PokemonRetriever = function() {};

PokemonRetriever.prototype.makeRequest = function(id) {

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function(response) {
    if (xhr.readyState === 4) {
        $('body').prepend(xhr.responseText);
        console.log(xhr.responseText);
    }
  };

  xhr.open('GET', 'http://pokeapi.co/api/v1/pokemon/' + id + '/');
  xhr.send();
};

module.exports = PokemonRetriever;

},{}]},{},[1]);
