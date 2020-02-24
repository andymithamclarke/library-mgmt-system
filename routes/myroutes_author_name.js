const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");




// Added Functionality to get Author By Name 
router.get("/:authorName", function(req, res) {
	if (req.query.allEntities == "true") {
		db.Author.findAll({ include: [db.Book], where: { name: req.params.authorName }}).then(function(author) {
	        if (author) {
	            ret.json(author, res);
	        } else {
                // Send 204 ("No Content")
                res.status(204);
	            res.end();
	        }
	    });
	} else {
		db.Author.findAll({where: {name: req.params.authorName}}).then(function(author) {
			if (author) {
				ret.json(author, res);
			} else {
				res.end();
			}
		})
	}
});

// Added Functionality to update Author By Name

router.put("/:authorName", function(req, res) {
    db.Author.findOne({where: {name: req.params.authorName}})
    	.then(function(author) {
        if (author) {
            author.name = req.body.name;
            author.save().then(function(author) {
                ret.json(author, res);
            });
        } else {
            // Change status code to 204 ("No Content")
            res.status(204);
            res.end();
        }
    });
});

// Added Functionality to delete Author By Name
router.delete("/:authorName", function(req, res) {
    db.Author.findOne({where: {name: req.params.authorName}})
        .then(function(author) {
            if (author) {
                return author.destroy();
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
// End of Added Functionality 

module.exports = router;
