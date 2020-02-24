const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");




// ADDED FUNCTIONALITY TO GET BOOK BY ISBN

router.get("/:bookIsbn", function(req, res) {
	if (req.query.allEntities == "true") {
		db.Book.findAll( { include: [db.Author], where: {isbn: req.params.bookIsbn}})
		.then(function(book) {
			if (book) {
				ret.json(book, res);
			} else {
                // Send 204 ("No Content")
                res.status(204);
				res.end();
			}
		})
	} else {
		db.Book.findAll({where: {isbn: req.params.bookIsbn}})
		.then(function(book) {
			if (book) {
				ret.json(book, res);
			} else {
				res.end();
			}
		})
	}
}) 

// ADDED FUNCTIONALITY TO UPDATE BOOK BY ISBN
router.put("/:bookIsbn", function(req, res) {
    db.Book.findOne({where: {isbn: req.params.bookIsbn}})
    .then(function(book) {
        if (book) {
            book.title = req.body.title;
            book.isbn = req.body.isbn;
            book.save().then(function(book) {
                ret.json(book, res);
            });
        } else {
            // Change status code to 204 ("No Content")
            res.status(204);
            res.end();
        }
    });
});


// ADDED FUNCTIONALITY TO DELETE BOOK BY ISBN 
router.delete("/:bookIsbn", function(req, res) {
    db.Book.findOne({where: {isbn: req.params.bookIsbn}})
        .then(function(book) {
            if (book) {
                return book.destroy();
            } else {
                // Send 204 request ("No Content")
                res.status(204);
                res.send();
            }
        })
        .then(function() {
            res.end();
        });
});


module.exports = router;