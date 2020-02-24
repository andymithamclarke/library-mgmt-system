const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const db = require("../data");
const ret = require("../lib/return");

function getSearchParams(queryParams, modelFields) {
    let searchParams = {};
    modelFields.forEach(function(p) {
        p = p.toLowerCase();
        if (queryParams[p]) {
            searchParams[p] = {
                [Op.like]: "%" + queryParams[p] + "%"
            };
        }
    });
    console.log(searchParams);
    return searchParams;
}

function findAll(model, params, res) {
    model.findAll({ where: params }).then(function(results) {
        if (results) {
            
            // Added Functionality to check if results are empty

            // Create Boolean Variable to assess if response object is empty
            // Code to check if object is empty
            // Modified from Stack Overflow post by Christoph on Mar 25 '09
            // accessed 7-01-2020
            // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
            var isEmpty = (Object.keys(results).length === 0)
            // end of referenced code

            // If is Empty is false return the object 
            if (isEmpty === false) {
                ret.json(results, res);
            // Otherwise return status code 204 ("No Content")
            } else {
                res.status(204);
                res.end();
            }

        } else {
            // Added Functionality to send 204 ("No Content")
            res.status(204);
            res.end();
        }
    });
}

router.get("/", function(req, res) {
    if (req.query.type.toLowerCase() === "book") {
        findAll(db.Book, getSearchParams(req.query, ["title", "isbn"]), res);
    } else if (req.query.type.toLowerCase() === "author") {
        findAll(db.Author, getSearchParams(req.query, ["name"]), res);
    } else if (req.query.type.toLowerCase() === "user") {
        findAll(db.User, getSearchParams(req.query, ["name", "barcode", "memberType"]), res);
    } else {
        res.end();
    }
});

module.exports = router;
