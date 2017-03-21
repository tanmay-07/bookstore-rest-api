const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title:{
      type:String,
      required:true
    },
    author:{
      type: String,
      required: true
    },
    genre:{
      type: String,
      required: true
    },
    imageurl:{
      type: String
    },
    createdData:{
      type: Date,
      default: Date.now
    },
    price:{
      type: Number,
      required: true
    }
});

var Books = module.exports = mongoose.model("Book", schema);

// Get books
module.exports.getBooks = function (callback, limit) {
  Books.find(callback).limit(limit);
}

//Get book by ID
module.exports.getBookById = function (id, callback) {
    Books.findById(id,callback);
};
//Get books by Genre
module.exports.getBooksByGenre = function (genre, callback) {
    Books.find({genre:genre},callback);
}

// Get all genres
module.exports.getAllGenres =function (callback) {
  Books.find().distinct('genre', callback);
}
//Add book

module.exports.addBook = function (book, callback) {
    Books.create(book, callback);
};

//Update book

module.exports.updateBook = function (id,book, callback) {
  // body...
  var query={_id:id};
  Books.findOneAndUpdate(query, book,{},callback);
};
//Remove  book
module.exports.removeBook = function (id, callback) {
  // body...
  Books.remove({_id:id}, callback);
};
