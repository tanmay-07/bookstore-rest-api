var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Books = require('./models/books');
var indexRoutes = require("./routes/index");
//connet to mongoose
mongoose.connect('mongodb://localhost/books');
var db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.use(indexRoutes);

app.get("/api/books", function (req, res) {
		Books.getBooks(function(err,books){
			if(err){
				console.log(err);
			}

			res.json(books);
		});

});

app.get("/api/books/:id", function(req, res){
		Books.getBookById(req.params.id, function (err,book) {
				if(err){
					console.log(err);
				}
				res.json(book);
		})
});

app.get("/api/books/genre/:genre", function (req, res) {
		Books.getBooksByGenre(req.params.genre, function (err, books) {
			if(err){
				console.log(err);
			}else {
				res.json(books);
			}
		});
});

app.get("/api/genres", function (req, res) {
		Books.getAllGenres(function (err, genres) {
			if(err){
				console.log(err);
			}else {
				res.json(genres);
			}
		});
})

app.post("/api/books", function (req, res) {
		var book = req.body;
		console.log(book);
		Books.addBook(book, function (err, book) {
				if(err){
					console.log(err);
				}
						res.json(book);

		});
});

app.put("/api/books/:id", function (req, res) {
	Books.updateBook(req.params.id,req.body,function (err, book) {
		if(err){
			console.log(err);
		}
		res.json(book);
	});

});

app.delete("/api/books/:id", function(req, res){
		Books.removeBook(req.params.id, function (err,book) {
				if(err){
					console.log(err);
				}
				res.json(book);
		})
});


app.listen(3000, function (argument) {
	// body...
	console.log("Server running");
})
