const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const db = require("./data");

let authorsRouter = require("./routes/authors");
let booksRouter = require("./routes/books");
let usersRouter = require("./routes/users");
let loansRouter = require("./routes/loans");
let searchRouter = require("./routes/search");

// ** Added Functionality ** 
// For Authors
let authorNameRouter = require("./routes/myroutes_author_name")
// For Users 
// - name
let userNameRouter = require("./routes/myroutes_user_name")
// - barcode 
let userBarcodeRouter = require("./routes/myroutes_user_barcode")
// For Books
// - title
let bookTitleRouter = require("./routes/myroutes_book_title")
// - isbn
let bookIsbnRouter = require("./routes/myroutes_book_isbn")
// For Loans 
// - loans-by-user
let loansByUserRouter = require("./routes/myroutes_loans_by_user")
// - loans-by-book-title
let loansByBookTitleRouter = require("./routes/myroutes_loans_by_booktitle")

let server = express();

// interpret JSON body of requests
server.use(express.json());

// interpret url-encoded queries
server.use(express.urlencoded({ extended: false }));

// allow CORS
server.use(cors());

// allow CORS preflight for all routes
server.options("*", cors());

server.use("/authors", authorsRouter);
server.use("/books", booksRouter);
server.use("/users", usersRouter);
server.use("/loans", loansRouter);
server.use("/search", searchRouter);

// ** Added Functionality ** 
// For Authors
server.use("/authorname", authorNameRouter);
// For Users
// - name
server.use("/username", userNameRouter);
// - barcode
server.use('/userbarcode', userBarcodeRouter);
// For Books
// - title
server.use("/booktitle", bookTitleRouter);
// - isbn
server.use("/bookisbn", bookIsbnRouter);
// For Loans 
// - loans-by-user
server.use("/loansbyuser", loansByUserRouter);
// - loans-by-book-title
server.use("/loansbybooktitle", loansByBookTitleRouter)


// handle errors last
server.use(function(err, req, res, next) {
    res.status = err.status || 500;
    res.send(err);
});

// ** Added Functionality ** 
// Enable Server to host static files
server.use(express.static('static'))
// ** End of Added Functionality ** 

// connect to the database and start the server running
db.initialiseDatabase(false, null);
server.listen(3000, function() {
    console.log("server listening");
});
