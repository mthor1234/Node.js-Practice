// Saying you require a module. "./movies" is saying to look in the directory for a file called Movies. 
// Do not include .js extension
// Modules & exporting is pretty much how you do private and public methods

var movies = require('./movies');
movies.avatar(); // Can call the avatar() function because movies.js exports this module 
console.log(movies.favMovie)