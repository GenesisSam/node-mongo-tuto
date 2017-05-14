var mongoose = require("mongoose");

var BookScheme = new mongoose.Schema({
  title: String,
  author: String,
  published_date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model("book", BookScheme);
