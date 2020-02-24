const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");


// ADDED FUNCTIONALITY TO GET USER BY BARCODE 
router.get("/:userBarcode", function(req, res) {
	db.User.findAll({where: {barcode: req.params.userBarcode}})
	.then(function(user) {
		if (user) {
			ret.json(user, res);
		} else {
            // Send 204 ("No Content")
            res.status(204);
			res.end();
		}
	})
})

// Added Functionality to update User by Barcode
router.put("/:userBarcode", function(req, res) {
    db.User.findOne({where: {barcode: req.params.userBarcode}})
    .then(function(user) {
        if (user) {
            (user.name = req.body.name),
                (user.barcode = req.body.barcode),
                (user.memberType = req.body.memberType),
                user.save().then(function(user) {
                    ret.json(user, res);
                });
        } else {
            // Change status code to 204 ("No Content")
            res.status(204);
            res.end();
        }
    });
});



// Added Functionality to delete User By Barcode
router.delete("/:userBarcode", function(req, res) {
    db.User.findOne({where: {barcode: req.params.userBarcode}})
        .then(function(user) {
            if (user) {
                return user.destroy();
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