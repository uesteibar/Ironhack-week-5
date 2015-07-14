var Artist = function(attributes) {
  this.name = attributes.name;
  this.popularity = attributes.popularity;
  this.followersCount = attributes.followersCount;
  if (attributes.image) {
    this.imageUrl = attributes.image.url;
  } else {
    this.imageUrl = null;
  }
  this.url = attributes.url;
  this.id = attributes.id;
};

module.exports = Artist;
