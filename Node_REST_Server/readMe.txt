The content in this project was create by me. It served to demonstrate how to create a simple 
AngularJS application which connected with a RESTful service created using nodeJS and express.

The AngularJS bit calls a RESTful service on the same server to populate the books object (see main.js).
The data from the RESTful call populates the $scope.books variable which is available to the 
ng-controller="bookListController. This then iterates through the 'books' using the ng-repeat directive
printing out each book and it's author. 

entry points (launch restserver.js first!)

http://localhost:4730/books/index.html or http://localhost:4730/books/

to add a new book to the list, open http://localhost:4730/books/addBook.html

================= side note: 
To test the post(add) or delete functions

Set up wFetch using Advance Request, Add Headers&Body, then add
POST: 
Content-Type: application/x-www-form-urlencoded\r\n
\r\n
author=value&book=value2

in the open text area. 