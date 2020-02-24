const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");

router.get("/", function(req, res) {
    if (req.query.allEntities == "true") {
        db.Author.findAll({ include: [db.Book] }).then(function(authors) {
            ret.json(authors, res);
        });
    } else {
        db.Author.findAll().then(function(authors) {
            ret.json(authors, res);
        });
    }
});


router.get("/:authorID", function(req, res) {
    if (req.query.allEntities == "true") {
        db.Author.findByPk(req.params.authorID, { include: [db.Book] }).then(function(author) {
            if (author) {
                ret.json(author, res);
            } else {
                // Added Functionality to send 204 ("No Content")
                res.status(204);
                res.end();
            }
        });
    } else {
        db.Author.findByPk(req.params.authorID).then(function(author) {
            if (author) {
                ret.json(author, res);
            } else {
                // Added Functionality to send 204 ("No Content")
                res.status(204);
                res.end();
            }
        });
    }
});

router.post("/", function(req, res) {
    db.Author.create({ name: req.body.name }).then(function(author) {
        ret.json(author, res);
    });
});


router.post("/:authorID/books", function(req, res) {
    db.Author.findByPk(req.params.authorID, { include: [db.Book] }).then(function(author) {
        if (author) {
            db.Book.findOrCreate({
                where: { title: req.body.bookTitle, isbn: req.body.bookISBN }
            }).spread(function(book, created) {
                author.addBook(book);
                author.reload().then(function(author) {
                    ret.json(author, res);
                });
            });
        } else {
            // Added Functionality
            // Send 204 ("No Content") if no author
            res.status(204);
            res.end();
        }
    });
});

router.post("/:authorID/books/:bookID", function(req, res) {
    db.Author.findByPk(req.params.authorID, { include: [db.Book] }).then(function(author) {
        if (author) {
            db.Book.findByPk(req.params.bookID).then(function(book) {
                if (book) {
                    author.addBook(book);
                    author.reload().then(function(author) {
                        ret.json(author, res);
                    });
                    // Added Functionality
                    // Send 204 ("No Content") if no book found 
                } else {
                    res.status(204);
                    res.end();
                }
            });
        } else {
            // Added functionality
            // Send 204 ("No Content")
            res.status(204);
            res.end();
        }
    });
});

router.put("/:authorID", function(req, res) {
    db.Author.findByPk(req.params.authorID).then(function(author) {
        if (author) {
            author.name = req.body.name;
            author.save().then(function(author) {
                ret.json(author, res);
            });
        } else {
            // Added Functionality to change status code to 204 ("No Content")
            res.status(204);
            res.end();
        }
    });
});

router.delete("/:authorID", function(req, res) {
    db.Author.findByPk(req.params.authorID)
        .then(function(author) {
            if (author) {
                return author.destroy();
            } else {
                // Added Functionality to send 204 ("No Content") if not found
                res.status(204);
                res.send();
                // End of Added Functionality
            }
        })
        .then(function() {
            res.end();
        });
});
module.exports = router;
