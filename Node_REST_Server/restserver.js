/**
 * 
 * restserver.js 
 * 
 * This example adds a body parser so that we may read the body from a POST request.
 * We also add a new route which allows for adding and deleting quotes from the existing
 * list.  
 * 
 */
var express = require('express');
var app = express();

// SIMPLE web server for single page. Creates the virtual context 'books'  
app.use('/books', express.static('public'));
app.use(express.bodyParser());

var titles = [
  { author : 'Salman Rushdie', book : "Two Years Eight Months and Twenty-Eight Nights"},
  { author : 'Khurshid Mahmud Kasuri', book : "Neither a Hawk Nor a Dove"},
  { author : 'PR Mohana Rao', book : "Flora of Guntur City Andhra Pradesh"},
  { author : 'Vinod Mehta', book : "Editor Unplugged: Media, Magnates, Netas and Me"}
];

//RESTful API functions.

//GET return all titles
app.get('/books/api', function(req, res) {
	  res.json(titles);
});

// GET random title
app.get('/books/api/random', function(req, res) {
	  var id = Math.floor(Math.random() * titles.length);
	  var q = titles[id];
	  res.json(q);
});

// GET specific title identified by id (e.x. /books/api/2)
app.get('/books/api/:id', function(req, res) {
	if(titles.length <= req.params.id || req.params.id < 0) {
		res.statusCode = 404;
		return res.send('Error 404: No title found');
	}  
	var q = titles[req.params.id];
	  res.json(q);
});

//POST method route to add a new book title to the list
app.post('/books/api', function(req, res) {
  console.log('author :' + req.body.author);
  console.log('book   :' + req.body.book);
  if(!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('book')) {
	    res.statusCode = 400;
	    return res.send('Error 400: Post syntax incorrect.');
  } 
  var newTitle = {
		  author : req.body.author,
		  book : req.body.book
  };  
  titles.push(newTitle);
  console.log('added to collection'); 
  res.json(true);
  
});

app.listen( process.env.PORT || 4730, function() {
	console.log('RESTful server listening on port 4730')
});