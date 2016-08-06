Categories = new Mongo.Collection("categories");

Products = new Mongo.Collection("products");

ProductsImages = new FS.Collection('ProductsImages', {
  stores: [new FS.Store.GridFS('ProductsImages')]
});

ProductsImages.allow({
  insert: function(fileId, document) {
    return true;
  },
  download: function(fileId, document) {
    return true;
  }
});
 