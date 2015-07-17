var Song = function(attributes) {
  this.title = attributes.title;
  this.authors = attributes.authors.map(function(author) {
    return author.name;
  });
  this.album = attributes.album;
  if (attributes.image) {
    this.imageUrl = attributes.image.url;
  }
  this.previewUrl = attributes.previewUrl;
};

module.exports = Song;
