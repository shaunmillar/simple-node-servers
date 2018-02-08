var appRouter = function(app) {

   app.get("/", function(req, res) {
    res.send("Hello World");
   });
   app.get("/books", function(req, res) {
    var books = [
   		{ name: 'Da vinci', author: { 'first_name': 'Bob', last_name: "White" }}, 
   		{ name: '50 shades of blue', author: { 'first_name': 'Bob', last_name: "Heinzeberg" }}
	]; 
    res.send(books);
   });

}

module.exports = appRouter;
