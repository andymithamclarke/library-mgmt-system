const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");







// ADDED FUNCTIONALITY TO GET LOAN BY BOOK TITLE
router.get("/:bookTitle", function(req, res) {
	db.Book.findAll({where: {title: req.params.bookTitle}})
	.then(function(book) {
		if (book) {
			// Check if results are empty
			// Create Boolean Variable to assess if response object is empty
            // Code to check if object is empty
            // Modified from Stack Overflow post by Christoph on Mar 25 '09
            // accessed 7-01-2020
            // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
            var isEmpty = (Object.keys(book).length === 0)
            // end of referenced code
            // If is Empty is false proceed
            if (isEmpty === false) {
               	book.forEach(function(key) {
				db.Loan.findAll({where: {BookId: key.id}})
				.then(function(loan) {
					if (loan) {
						// Check if results are empty
						var isEmptyLoan = (Object.keys(loan).length === 0)
						// If is Empty Loan is false proceed
						if (isEmptyLoan === false) {
							ret.json(loan, res)
						}
						else {
							// Send 204 ("No Content")
	                		res.status(204);
							res.end();
						}
					} else {
						// Send 204 ("No Content")
                		res.status(204);
						res.end();
					}
				})
			})
            // Otherwise return status code 204 ("No Content")
            } else {
                res.status(204);
                res.end();
            }
		} else {
			// Send 204 ("No Content")
            res.status(204);
			res.end();
		}
	})
})



module.exports = router;