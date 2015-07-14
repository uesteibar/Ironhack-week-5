var Album = function(attributes) {
  this.title = attributes.title;
  this.id = attributes.id;
  this.url = attributes.url;
  if (attributes.image) {
    this.imageUrl = attributes.image.url;
  } else {
    this.imageUrl = null;
  }
};

module.exports = Album;
