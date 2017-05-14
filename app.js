var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

// import model
var Book = require("./models/book");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.port || 8080;

// SET UP MONGOOSE
var db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
  console.log("MongoDB connected!");
})

mongoose.connect("mongodb://localhost/mongodb_tutorial");

var router = require("./routes")(app, Book);

var server = app.listen(port, () => {
  console.log("Server instance running on " + port + " port");
});
