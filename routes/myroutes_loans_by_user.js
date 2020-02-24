const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");



// ADDED FUNCTIONALITY TO GET LOAN BY USER NAME
router.get("/:userName", function(req, res) {
	db.User.findAll({where: { name: req.params.userName}})
	.then(function(user) {
		if (user) {
			// Check if results are empty
			// Create Boolean Variable to assess if response object is empty
            // Code to check if object is empty
            // Modified from Stack Overflow post by Christoph on Mar 25 '09
            // accessed 7-01-2020
            // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
            var isEmpty = (Object.keys(user).length === 0)
            // end of referenced code
            // If is Empty is false proceed
            if (isEmpty === false) {
        		user.forEach(function(key) {
					db.Loan.findAll({where: {UserId: key.id}}).then(function(loan) {
						if (loan) {
							// Check if results are empty
							var isEmptyLoan = (Object.keys(loan).length === 0)
							// If is Empty is false proceed
							if (isEmptyLoan === false) {
								ret.json(loan, res);
							} else {
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
            } else {
            	// Send 204 ("No Content")
            	res.status(204);
				res.end();
            }
		} else {
			// Send 204 ("No Content")
            res.status(204);
			res.end();
		}
	});
});


// ADDED FUNCTIONALITY TO POST LOAN TO USER NAME WITH BOOK TITLE 
router.post("/:userName/:bookTitle", function(req, res) {
	db.User.findAll({where: {name: req.params.userName}})
	.then(function(user) {
		if (user) {
			// Check if results are empty
			// Create Boolean Variable to assess if response object is empty
            // Code to check if object is empty
            // Modified from Stack Overflow post by Christoph on Mar 25 '09
            // accessed 7-01-2020
            // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
            var isEmpty = (Object.keys(user).length === 0)
            // end of referenced code
            // If is Empty is false proceed
            if (isEmpty === false) {
            	user.forEach(function(key) {
					db.Book.findAll({where: {title: req.params.bookTitle}})
					.then(function(book) {
						if (book) {
							// Check if results are empty
							var isEmptyBook = (Object.keys(book).length === 0)
							// If is Empty Book is false proceed
							if (isEmptyBook === false) {
								book.forEach(function(bookKey) {
									// Check if date is in past or future
									// Initialise current date variable
			                        let dateNow = new Date();
			                        // Initialise requested date variable
			                        let requestedDueDate = new Date(req.body.dueDate);
			                        if (requestedDueDate < dateNow) {
			                        	// Date is in past and send status code 202 Accepted (But not processed)
			                        	res.status(202);
			                        	res.end();
			                        } else {
			                        	// Date is in the future and save loan
										db.Loan.findOrCreate({where: { UserId: key.id, BookId: bookKey.id}})
										.spread(function(loan, created) {
											loan.dueDate = new Date(req.body.dueDate);
											loan.save().then(function(loan) {
												ret.json(loan, res)
											})
										})
			                        }
								})
							} else {
								// Send 204 status ("No Content")
								res.status(204);
								res.end();
							}

						} else {
							// Send 204 status ("No Content")
							res.status(204);
							res.end();
						} 
					})
				})
            } else {
            	// Send 204 status ("No Content")
				res.status(204);
				res.end();
            }
		} else {
			// Send 204 status ("No Content")
			res.status(204);
			res.end();
		}
	})
})

module.exports = router;