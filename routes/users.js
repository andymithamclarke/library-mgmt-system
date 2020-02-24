const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");

router.get("/", function(req, res) {
    db.User.findAll().then(function(users) {
        ret.json(users, res);
    });
});

router.get("/:userID", function(req, res) {
    db.User.findByPk(req.params.userID).then(function(user) {
        if (user) {
            // Added Functionality
            // Check if results are empty
            // Create Boolean Variable to assess if response object is empty
            // Code to check if object is empty
            // Modified from Stack Overflow post by Christoph on Mar 25 '09
            // accessed 7-01-2020
            // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
            var isEmpty = (Object.keys(user).length === 0);
            // end of referenced code
            // If is Empty is false proceed
            if (isEmpty === false) {
                ret.json(user, res);
            } else {
                // Added Functionality to send 204 ("No Content")
                res.status(204);
                res.end();
            }

        } else {
            // Added Functionality to send 204 ("No Content")
            res.status(204);
            res.end();
        }
    });
});

router.get("/:userID/loans", function(req, res) {
    db.Loan.findAll({ where: { userId: req.params.userID } }).then(function(loans) {
        // Added Functionality to check if loans object is returned
        if (loans) {
            // Added Functionality
            // Check if results are empty
            // Create Boolean Variable to assess if response object is empty
            var isEmpty = (Object.keys(user).length === 0);
            // If is Empty is false proceed
            if (isEmpty === false) {
                ret.json(loans, res);  
            } else {
                // Send 204 ("No Content")
                res.status(204);
                res.end();
            }
            
        } else {
            // Send 204 ("No Content")
            res.status(204);
            res.end();
        };
    });
});

router.post("/:userID/loans/:bookID", function(req, res) {
    db.User.findOne({where: {id: req.params.userID}}).then(function(user) {
        if (user) {
            // Added Functionality
            // Check if results are empty 
            // Create Boolean Variable to assess if response object is empty
            var isEmpty = (Object.keys(user).length === 0);
            // If is Empty is false proceed 
            if (isEmpty === false) {
                db.Book.findByPk(req.params.bookID).then(function(book) {
                    if (book) { 
                        // Added Functionality to check if input date is in the future
                        // Initialise current date variable
                        let dateNow = new Date();
                        let requestedDueDate = new Date(req.body.dueDate);
                        // Check if date is in past or future
                        if (requestedDueDate < dateNow) {
                            // Date is in past and send status code 202 Accepted (But not processed) 
                            res.status(202);
                            res.end();
                        } else {
                            // Date is in the future and save loan
                            db.Loan.findOrCreate({
                                where: { UserId: req.params.userID, BookId: req.params.bookID }
                            }).spread(function(loan, created) {
                                    loan.dueDate = new Date(req.body.dueDate);
                                    loan.save().then(function(loan) {
                                    ret.json(loan, res);
                                });
                            });

                        }
                    }
                    else {
                        // Send 204 ("No Content")
                        res.status(204);
                        res.end();
                    }
                });
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




router.post("/", function(req, res) {
    db.User.create({
        name: req.body.name,
        barcode: req.body.barcode,
        memberType: req.body.memberType
    }).then(function(user) {
        ret.json(user, res);
    });
});

router.put("/:userID", function(req, res) {
    db.User.findByPk(req.params.userID).then(function(user) {
        if (user) {
            (user.name = req.body.name),
                (user.barcode = req.body.barcode),
                (user.memberType = req.body.memberType),
                user.save().then(function(user) {
                    ret.json(user, res);
                });
        } else {
            // Added Functionality to change status code to 204 ("No Content")
            res.status(204);
            res.end();
        }
    });
});

router.delete("/:userID", function(req, res) {
    db.User.findByPk(req.params.userID)
        .then(function(user) {
            if (user) {
                return user.destroy();
            } else {
                // Added Functionality to send 204 ("No Content") if not found
                res.status(204);
                res.send();
            }
        })
        .then(function() {
            res.end();
        });
});

module.exports = router;
