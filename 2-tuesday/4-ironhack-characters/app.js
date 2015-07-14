$('button#retriever').on('click', function(event) {
  event.preventDefault();
  getCharacters(refreshList);
});

$('form').on('submit', function(event) {
  event.preventDefault();
  // console.log($('form').serializeArray());
  saveCharacter(normalizeCharacter($('form').serializeArray()), getCharacters(refreshList));
  $('form').trigger('reset');
});

var normalizeCharacter = function(serializedCharacter) {
  var character = {};
  serializedCharacter.forEach(function(attribute) {
    character[attribute.name] = attribute.value;
  });
  return character;
};

var saveCharacter = function(character, callback) {
  var characters = new CharacterApi();
  characters.save(character, function(data, err) {
    if (err) {
      console.log("ERROR!!!!");
    } else {
      callback(data);
    }
  });
};

var getCharacters = function(callback) {
  var characters = new CharacterApi();
  characters.getAll(function(data, err) {
    if (err) {
      console.log("ERROR!!!!");
    } else {
      callback(data);
    }
  });
};

var refreshList = function(characters) {
  var list = '';
  characters.forEach(function(character) {
    list += '<li><div class="card">' +
      '<p>Name: ' + character.name + '<p>' +
      '<p>Occupation: ' + character.occupation + '<p>' +
      '<p>Weapon: ' + character.weapon + '<p>' +
      '</div></li>'
  });
  $('ul#characters').html(list);
};


// RETRIEVER
var CharacterApi = function(url) {
  this.baseUrl = url || 'https://ironhack-characters.herokuapp.com/characters';
};
CharacterApi.prototype.getAll = function(callback) {

  var request = $.get(this.baseUrl);

  request.done(function(data) {
    callback(data);
  });

  request.fail(function(err) {
    callback(null, err)
  });
};
CharacterApi.prototype.save = function(character, callback) {

  var request = $.post(this.baseUrl, character);

  request.done(function() {
    callback();
  });
};
