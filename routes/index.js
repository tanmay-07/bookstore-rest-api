const express = require('express');
var router = express();
var Books = require('../models/books');


router.get("/",function (req, res) {
  res.redirect("/books");
});

router.get("/books", function (req, res) {
  Books.getBooks(function(err,books){
    if(err){
      console.log(err);
    }

  res.render("home",{books:books});
  });
});

router.get("/books/new", function (req, res) {
  res.render("new");
});
router.post("/books", function (req, res) {
  //console.log(req.body.book);

  Books.addBook(req.body.book, function (err, book) {
    if(err){
      console.log(err);
    }else {
      console.log(book);
      res.redirect("/books");
    }
  });
});

router.get("/books/:id", function (req, res) {
    Books.getBookById(req.params.id, function (err, book) {
        if(err){
          console.log(err);
        }
        else {
          res.render("book.ejs", {book:book});
        }
    });

});

module.exports = router;
