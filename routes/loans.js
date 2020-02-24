const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");

router.get("/", function(req, res) {
    db.Loan.findAll().then(function(loans) {
        ret.json(loans, res);
    });
});

router.get("/:loanID", function(req, res) {
    db.Loan.findByPk(req.params.loanID).then(function(loan) {
        if (loan) {
            ret.json(loan, res);
        } else {
            // Added Functionality to send 204 ("No Content")
            res.status(204);
            res.end();
        }
    });
});

router.put("/:loanID", function(req, res) {
    db.Loan.findByPk(req.params.loanID).then(function(loan) {
        if (loan) {
            // Added Functionality to check if input date is in the future
            // Initialise current date variable
            let dateNow = new Date();

            loan.dueDate = new Date(req.body.dueDate);
            // Check if date is in past or future
            if (loan.dueDate < dateNow) {
                // Date is in past and send status code 202 Accepted (But not processed) 
                res.status(202);
                res.end();
            } else {
                // Date is in the future and save loan
                console.log("Date is in the future");
                    loan.save().then(function(loan) {
                    ret.json(loan, res);
                });
            }
        } else {
            // Added Functionality to change status code to 204 ("No Content")
            res.status(204);
            res.end();
        }
    });
});

router.delete("/:loanID", function(req, res) {
    db.Loan.findByPk(req.params.loanID)
        .then(function(loan) {
            if (loan) {
                return loan.destroy();
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
