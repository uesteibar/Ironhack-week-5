
var Monkey = function(name) {
  this.name = name;
};

Monkey.prototype.sayHello = function () {
  console.log("Hello! I'm " + this.name);
};

module.exports = Monkey;
