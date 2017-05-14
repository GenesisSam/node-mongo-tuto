var express  = require('express');
var router   = express.Router();

// import book model
var Book = require("../models/book");

router.get("/api/books", (req, res) => {
  Book.find((err, books) => {
    if (err) return res.status(500).send({ error: "database failure" });
    res.json(books);
  })
});
router.get("/api/books/:book_id", (req, res) => {
  Book.findOne({_id: req.params.book_id}, (err, book) => {
    if (err) return res.status(500).json({ error: err });
    if (!book) return res.status(404).json({ error: "book not found" });

    res.json(book);
  });
});

router.get("/api/books/author/:author", (req, res) => {
  Book.find({author: req.params.author}, {_id: false, title: true, published_date: true}, (err, books) => {
    if (err) return res.status(500).json({ error: err });
    if (books.length === 0) return res.status(404).json({ error: "books not found" });

    res.json(books);
  });
});

router.post("/api/books", (req, res) => {
  var book = new Book();
  book.title = req.body.title;
  book.author = req.body.author;
  book.published_date = new Date(req.body.published_date);

  book.save((err) => {
    if (err) {
      console.error(err);
      res.json({ result: 0 });
      return;
    }

    res.json({ result: 1 });
  });
});


/**
 * this output looks like this
  {
    ok: 1,
    nModified: 0,
    n: 1
  }
  */
router.put("/api/books/:book_id", (req, res) => {
  Book.update({_id: req.params.book_id}, {$set: req.body}, (err, output) => {
    if(err) res.status(500).json({ error: 'database failure' });
    console.log(output);
    if(!output.n) return res.status(404).json({ error: 'book not found' });
    res.json( { message: 'book updated' } );
  });
});

router.delete("/api/books/:book_id", (req, res) => {
  Book.remove({_id: req.params.book_id}, (err, output) => {
    if(err) res.status(500).json({ error: 'database failure' });

    res.status(204).end();
  })
});


module.exports = router;
