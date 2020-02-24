const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");


// ADDED FUNCTIONALITY TO GET BOOK BY TITLE 
router.get("/:bookTitle", function(req, res) {
	if (req.query.allEntities == "true") {
		console.log("allEntities")
		db.Book.findAll( { include: [db.Author], where: {title: req.params.bookTitle}})
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
		db.Book.findAll({where: {title: req.params.bookTitle}})
		.then(function(book) {
			if (book) {
				ret.json(book, res);
			} else {
				res.end();
			}
		})
	}
})


// ADDED FUNCTIONALITY TO UPDATE BOOK BY TITLE 
router.put("/:bookTitle", function(req, res) {
    db.Book.findOne({where: {title: req.params.bookTitle}})
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


// ADDED FUNCTIONALITY TO DELETE BOOK BY TITLE 
router.delete("/:bookTitle", function(req, res) {
    db.Book.findOne({where: {title: req.params.bookTitle}})
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