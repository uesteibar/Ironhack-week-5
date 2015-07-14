var Album = function(attributes, songs) {
  this.title = attributes.title;
  this.id = attributes.id;
  this.url = attributes.url;
  if (attributes.image) {
    this.imageUrl = attributes.image.url;
  } else {
    this.imageUrl = null;
  }

  this.songs = songs || [];
};

module.exports = Album;
