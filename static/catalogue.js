//==================================================================================================================

// JS FOR CATALOGUE PAGE - contains Author & Book requests

//==================================================================================================================

//=============================================
// GENERAL SELECTION
//=============================================

//==================
// Imports
//==================

// Import from requests.js
import { url, getFromServer, addItemRequest, deleteItemRequest, updateItemRequest, getAllLoansReturnBookId } from "./utils/requests.js";

// Import from changedisplay.js
import { resultsField, resultsHeader, specificFormCreationArea, specificFormTitle, specificFormInput, navSection, responseMessageSection, searchArea, modifyArea, formModifyArea, clearContainer, showResultsHeader, createNewResultContainer, createNewResultItemContainer, hideElement, showFlexDisplay, showFlexColumnDisplay, showInlineBlockDisplay, createNewResultHeaderContainer, changeResultsHeader, createSeeMoreButton, displayMessage} from "./utils/changedisplay.js";

// Import from render.js
import { renderGetResponse, renderSearchResponse, renderAllEntitiesResponse } from "./utils/render.js";

// Import from form.js
import { createForm, createPrelimSelectForm, createSpecificItemPostRequestButton } from "./utils/form.js";

//==================
// Specific Selections From DOM catalogue.html
//==================

// Catalogue Control
const catalogueControlButton = document.querySelector('#catalogue-control-button');

// Control Bar
const authorButton = document.querySelector('#authors-button');
const booksButton = document.querySelector('#books-button');

// Search 
const searchContainer = document.querySelector('.search-container');
const searchAuthors = document.querySelector('#search-authors-button');
const searchBooks = document.querySelector('#search-books-button');
const searchBox = document.querySelector('#search-box');
const searchBooksTypeMenu = document.querySelector('#search-books-type-menu');
const searchAuthorsTypeMenu = document.querySelector('#search-authors-type-menu');

// Add, Update, Delete Button Panel 
const authorButtonPanel = document.querySelector('#author-request-button-selection');
const bookButtonPanel = document.querySelector('#book-request-button-selection');

// Add, Update, Delete Buttons
// - Authors - 
const addAuthorButton = document.querySelector('#add-author-button');
const deleteAuthorButton = document.querySelector("#delete-author-button");
const updateAuthorButton = document.querySelector("#update-author-button");
// - Books -
const addBookButton = document.querySelector("#add-book-button");
const deleteBookButton = document.querySelector("#delete-book-button");
const updateBookButton = document.querySelector("#update-book-button");

// Form Section Areas
// - Authors -
const addAuthorSection = document.querySelector('#add-author-section');
const deleteAuthorSection = document.querySelector('#delete-author-section');
const updateAuthorSection = document.querySelector('#update-author-section');
// - Books -
const addBookSection = document.querySelector('#add-book-section');
const deleteBookSection = document.querySelector('#delete-book-section');
const updateBookSection = document.querySelector('#update-book-section');


//=============================================
// AUTHORS CONROL BUTTON - EVENT LISTENERS
//=============================================

// (GET REQUEST) Display all Authors Only Names
authorButton.addEventListener('click', function() {
	// Declare URL
	var queryAuthorsUrl = url + "authors";
	// Make Request
	getFromServer(queryAuthorsUrl, renderGetResponse, "Author");
	// Change results header
	changeResultsHeader("Author");
	// See more button
	const seeMoreAuthorButton = document.querySelector('#author-see-more-button');
	seeMoreAuthorButton.addEventListener('click', function() {
		// Clear results field
		clearContainer(resultsField);
		// Make get request to recieve info from All entities = True 
		const allEntitiesQuery = queryAuthorsUrl + "?allEntities=true";
		getFromServer(allEntitiesQuery, renderAllEntitiesResponse, "Author");
		// Change results header
		changeResultsHeader("authorMore");
	})
});

// Display more author features (search, update, add, delete)
authorButton.addEventListener('click', function() {
	// Clear Results Field
	clearContainer(resultsField);
	// Save display arrays
	const displayFlexArray = [searchContainer, authorButtonPanel, modifyArea, searchArea, formModifyArea];
	const hideArray = [responseMessageSection, searchBooks, bookButtonPanel, specificFormCreationArea, deleteAuthorSection, updateAuthorSection, addAuthorSection, addBookSection, deleteBookSection, updateBookSection, searchBooksTypeMenu];
	const displayInlineBlockArray = [searchAuthors, formModifyArea, searchAuthorsTypeMenu];

	// Loop through arrays & change displays appropriately
	displayFlexArray.forEach(function(item) {
		showFlexDisplay(item);
	})
	hideArray.forEach(function(item) {
		hideElement(item);
	})
	displayInlineBlockArray.forEach(function(item) {
		showInlineBlockDisplay(item);
	})
	// Change results field display to column
	showFlexColumnDisplay(resultsField);
})


//=============================================
// BOOKS CONROL BUTTON - EVENT LISTENERS
//=============================================

// (GET REQUEST) Display all Books Only Titles
booksButton.addEventListener('click', function() {
	// Declare Books Url
	var queryBooksUrl = url + "books";
	// Make Request
	getFromServer(queryBooksUrl, renderGetResponse, "Book");
	// Change results header
	changeResultsHeader("Book");
	// See more button
	const seeMoreBookButton = document.querySelector('#book-see-more-button');
	seeMoreBookButton.addEventListener('click', function() {
		// Clear results field
		clearContainer(resultsField);
		// Make get request to recieve info from All entities = True 
		const allEntitiesQuery = queryBooksUrl + "?allEntities=true";
		getFromServer(allEntitiesQuery, renderAllEntitiesResponse, "Book");
		// Change results header
		changeResultsHeader("bookMore");

	})
});

booksButton.addEventListener('click', function() {
	// Clear Results Field
	clearContainer(resultsField);
	// Save display arrays
	const displayFlexArray = [searchContainer, bookButtonPanel, modifyArea, searchArea, formModifyArea];
	const hideArray = [searchAuthors, authorButtonPanel, specificFormCreationArea, deleteAuthorSection, updateAuthorSection, addAuthorSection, addBookSection, deleteBookSection, updateBookSection, searchAuthorsTypeMenu, responseMessageSection];
	const displayInlineBlockArray = [searchBooks, formModifyArea, searchBooksTypeMenu];

	// Loop through arrays & change displays appropriately
	displayFlexArray.forEach(function(item) {
		showFlexDisplay(item);
	})
	hideArray.forEach(function(item) {
		hideElement(item);
	})
	displayInlineBlockArray.forEach(function(item) {
		showInlineBlockDisplay(item);
	})
	// Change results field display to column
	showFlexColumnDisplay(resultsField)
})


//=============================================
// SEARCH AUTHORS AND BOOKS 
//=============================================

searchAuthors.addEventListener('click', function() {
	// Display Elements
	hideElement(searchArea);
	hideElement(modifyArea);
	clearContainer(resultsField);
	changeResultsHeader("Author");
	// Declare search URL
	const searchAuthorsUrl = url + 'authors/' + searchBox.value;
	// Change search type depending on value of dropdown menu selection
	if (searchAuthorsTypeMenu.value === "ID") {
		// Declare specific url
		const searchAuthorsIdUrl = url + 'authors/' + searchBox.value;
		// Make request
		getFromServer(searchAuthorsIdUrl, renderSearchResponse, "Author", 1);
	}
	else if (searchAuthorsTypeMenu.value === "Name") {
		// Declare specific url 
		const searchAuthorByNameUrl = encodeURI(url + "search?type=author&name=" + searchBox.value);
		// Make request
		getFromServer(searchAuthorByNameUrl, renderGetResponse, "Author");
	}
	// See more button
	const seeMoreAuthorButton = document.querySelector('#author-see-more-button');
	seeMoreAuthorButton.addEventListener('click', function() {
		// Clear container 
		clearContainer(resultsField);
		// If Search by ID use helper function renderAllEntitiesResponse
		if (searchAuthorsTypeMenu.value === "ID") {
			// Make get request to recieve info from All entities = True 
			const allEntitiesQuery = searchAuthorsUrl + "?allEntities=true";
			getFromServer(allEntitiesQuery, renderAllEntitiesResponse, "Author", 1);
			// Change results header
			changeResultsHeader("authorMore");
		}
		// If Search by Name - make get request locally
		else if (searchAuthorsTypeMenu.value === "Name") {
			// Declare URL 
			const searchAuthorByNameUrl = encodeURI(url + "search?type=author&name=" + searchBox.value);
			// Change results header 
			changeResultsHeader("authorMore");
			// Make get request
			axios.get(searchAuthorByNameUrl)
			.then(function(res) {
				// Loop through response object and extract id to make all Entities request for each response author 
				Object.keys(res.data).forEach(function(key) {
					// Save Author Id
					const authorId = res.data[key].id;
					// Declare specific Author Url
					const specificAuthorUrl = encodeURI(url + "authors/" + authorId.toString() + "?allEntities=true");
					// Make request & Render response in Results field
					getFromServer(specificAuthorUrl, renderAllEntitiesResponse, "Author", 1);
				})
			})
		}
	})
})

searchBooks.addEventListener('click', function() {
	// Display Elements
	clearContainer(resultsField);
	hideElement(searchArea);
	hideElement(modifyArea);
	// Change results header
	changeResultsHeader("Book");
	// Declare Search Books URL
	const searchBooksUrl = url + 'books/' + searchBox.value;
	// Save Books array for see more button 
	const booksArray = [];
	// If search is by ID
	if (searchBooksTypeMenu.value === "ID") {
		getFromServer(searchBooksUrl, renderSearchResponse, "Book", 1);
	}
	// If search is by Title
	else if (searchBooksTypeMenu.value === "Title") {
		const searchBookByTitleUrl = encodeURI(url + "search?type=book&title=" + searchBox.value);
		getFromServer(searchBookByTitleUrl, renderGetResponse, "Book");
	}
	// If search is by ISBN
	else if (searchBooksTypeMenu.value === "ISBN") {
		const searchBookByIsbnUrl = encodeURI(url + "search?type=book&isbn=" + searchBox.value);
		getFromServer(searchBookByIsbnUrl, renderGetResponse, "Book");
	}
	// If search is by Author - make get request locally
	else if (searchBooksTypeMenu.value === "Author") {
		// Declare URL for authors all entities
		const allEntitiesAuthorUrl = url + "authors?allEntities=true";
		// Get request for authors all entities
		axios.get(allEntitiesAuthorUrl)
		.then(function(res) {
			// Loop through result object and check for match against search box input
			Object.keys(res.data).forEach(function(key){
				if (res.data[key].name == searchBox.value) {
					// If match save books by this author and push result to books array
					const books = res.data[key].Books;
					booksArray.push(books);
					// Loop through books result object and render response 
					Object.keys(books).forEach(function(key) {
						renderSearchResponse(books[key], "Book");
					})
				} 
			}); 
			// If there are no matches display response message
			if (booksArray.length === 0) {
				hideElement(resultsHeader)
				showFlexDisplay(responseMessageSection)
				displayMessage("Your search returned no results")
			}
		})
	}
	// See more button - This will display more info by connecting to API endpoint allEntities=true
	const seeMoreBookButton = document.querySelector('#book-see-more-button');
	seeMoreBookButton.addEventListener('click', function() {
		// Clear container 
		clearContainer(resultsField);
		// If search is by ID - Use helpers
		if (searchBooksTypeMenu.value === "ID") {
			const allEntitiesQuery = searchBooksUrl + "?allEntities=true";
			getFromServer(allEntitiesQuery, renderAllEntitiesResponse, "Book", 1);
			changeResultsHeader("bookMore");
		}
		// If search is by Title - make request locally
		else if (searchBooksTypeMenu.value === "Title") {
			const searchBookByTitleUrl = encodeURI(url + "search?type=book&title=" + searchBox.value);
			// Make request
			axios.get(searchBookByTitleUrl)
			.then(function(res) {
				// Loop through response object 
				Object.keys(res.data).forEach(function(key) {
					// Save each books ID
					const bookId = res.data[key].id;
					// Make individual get request to allEntities using the specific book ID
					const bookAllEntitiesUrl = encodeURI(url + 'books/' + bookId + "?allEntities=true");
					getFromServer(bookAllEntitiesUrl, renderAllEntitiesResponse, "Book", 1);
					// Change results header
					changeResultsHeader("bookMore");
				})
			})
		}
		// If search is by ISBN - make request locally 
		else if (searchBooksTypeMenu.value === "ISBN") {
			const searchBookByIsbnUrl = encodeURI(url + "search?type=book&isbn=" + searchBox.value);
			// Make request
			axios.get(searchBookByIsbnUrl)
			.then(function(res) {
				// Loop through response 
				Object.keys(res.data).forEach(function(key) {
					// Save each books ID
					const bookId = res.data[key].id;
					// Make individual get request to allEntities using the specific book ID
					const bookAllEntitiesUrl = encodeURI(url + 'books/' + bookId + "?allEntities=true");
					getFromServer(bookAllEntitiesUrl, renderAllEntitiesResponse, "Book", 1);
					// Change results header
					changeResultsHeader("bookMore");

				})
			})
		}
		// If search is by Author - use books Array to access book ID
		else if (searchBooksTypeMenu.value === "Author") {
			clearContainer(resultsField);
			// Loop through books array
			booksArray.forEach(function(item) {
				Object.keys(item).forEach(function(key){
					// Save each books ID
					const bookId = item[key].id;
					// Make individual get request to allEntities using the specific book ID
					const bookAllEntitiesUrl = encodeURI(url + 'books/' + bookId + "?allEntities=true");
					getFromServer(bookAllEntitiesUrl, renderAllEntitiesResponse, "Book", 1);
					// Change results header
					changeResultsHeader("bookMore");
				})
			})
	}

	})
})


//====================================================================

// 							AUTHOR REQUESTS

//====================================================================


//=============================================
// ADD AUTHOR REQUEST
//=============================================

addAuthorButton.addEventListener('click', function() {
	// Clear the container
	clearContainer(addAuthorSection);
	// Display Elements
	showFlexDisplay(addAuthorSection);
	const hideElementArray = [responseMessageSection, searchContainer, deleteAuthorSection, updateAuthorSection, resultsHeader, resultsField];
	hideElementArray.forEach(function(item) {
		hideElement(item);
	})
	
	// Call Function to create form 
	createForm(addAuthorSection, ["Enter Author Name: "], "add-author-input", "sub-add-author-button", 1, "To add a new Author, enter the name of the Author in the box below and click submit.");

	// Save DOM Variables neccessary to make request 
	const submitAddAuthorButton = document.querySelector('#sub-add-author-button');
	const addAuthorInput = document.querySelector('#add-author-input');

	// Add Event Listener to make request 
	submitAddAuthorButton.addEventListener('click', function() {
		// Only send request if all input fields are complete 
		if (addAuthorInput.value) {
			const addAuthorUrl = url + "authors/";
			const newAuthor = {
				name: addAuthorInput.value
			}
			addItemRequest("Author", addAuthorUrl, addAuthorSection, newAuthor);
		} else {
			alert("Please Complete All Input Fields");
		}

	})

})


//=============================================
// DELETE AUTHOR REQUEST
//=============================================

deleteAuthorButton.addEventListener('click', function() {
	// Clear the container
	clearContainer(deleteAuthorSection);
	// Display Elements
	showFlexDisplay(deleteAuthorSection);
	const hideElementArray = [responseMessageSection, searchContainer, addAuthorSection, updateAuthorSection, resultsHeader, resultsField];
	hideElementArray.forEach(function(item) {
		hideElement(item);
	})
	// Create Form to ask user if they want to delete by Author ID or Author Name
	// - Create the Grid Container
	const gridContainer = createPrelimSelectForm(["Choose How to Delete an Author", "You can delete an Author by entering the Author's ID <br> OR <br> By entering the Author's Name"], ["BY ID", "BY NAME"]);
	deleteAuthorSection.appendChild(gridContainer);
	// Select elements from the DOM
	const startDeleteButton = document.querySelector('#prelim-form-submit-button');
	const chooseHowToDeleteAuthorMenu = document.querySelector('#prelim-select-option-menu');

	// Add Event Listener to Start Delete Button
	startDeleteButton.addEventListener('click', function() {
		// For Deleting by ID
		if (chooseHowToDeleteAuthorMenu.value === "BY ID") {
			// Hide & Clear Grid Container
			clearContainer(gridContainer);
			hideElement(gridContainer);
			// Call Function to create form 
			createForm(deleteAuthorSection, ["Enter Author's ID: "], "delete-author-input", "sub-delete-author-button", 1, "To Delete an Author, enter the ID of the Author in the box below and click submit.");
			// Save DOM Variables neccessary to make request
			const submitDeleteAuthorButton = document.querySelector('#sub-delete-author-button');
			const deleteAuthorInput = document.querySelector('#delete-author-input');

			// Add Event Listener to make request 
			submitDeleteAuthorButton.addEventListener('click', function() {
				// Only send request if all input fields are complete 
				if (deleteAuthorInput.value) {
					const deleteAuthorUrl = url + "authors/" + deleteAuthorInput.value;
					deleteItemRequest(deleteAuthorUrl, deleteAuthorSection);
				} else {
					alert("Please Complete All Input Fields");
				}
			})
		// For Deleting by Name
		} else if (chooseHowToDeleteAuthorMenu.value === "BY NAME") {
			// Hide & Clear Grid Container
			clearContainer(gridContainer);
			hideElement(gridContainer);
			// Call Function to create form 
			createForm(deleteAuthorSection, ["Enter Author's Name: "], "delete-author-input", "sub-delete-author-button", 1, "To Delete an Author, enter the Name of the Author in the box below and click submit.");
			// Save DOM Variables neccessary to make request
			const submitDeleteAuthorButton = document.querySelector('#sub-delete-author-button');
			const deleteAuthorInput = document.querySelector('#delete-author-input');
			// Add Event Listener to make request 
			submitDeleteAuthorButton.addEventListener('click', function() {
				// Only send request if all input fields are complete 
				if (deleteAuthorInput.value) {
					const deleteAuthorUrl = encodeURI(url + "authorname/" + deleteAuthorInput.value);
					deleteItemRequest(deleteAuthorUrl, deleteAuthorSection);
				} else {
					alert("Please Complete All Input Fields");
				}
			})
		}
	})
})


//=============================================
// UPDATE AUTHOR REQUEST
//=============================================

updateAuthorButton.addEventListener('click', function() {
	// Clear the container
	clearContainer(updateAuthorSection);
	// Display Elements
	showFlexDisplay(updateAuthorSection);
	const hideElementArray = [responseMessageSection, searchContainer, addAuthorSection, deleteAuthorSection, resultsHeader, resultsField];
	hideElementArray.forEach(function(item) {
		hideElement(item);
	})

	// Create Preliminary Form to ask user if they want to update by Author ID or Author Name
	// - Create the Grid Container
	const gridContainer = createPrelimSelectForm(["Choose How to Update an Author", "You can update an Author by entering the Author's ID <br> OR <br> By entering the Author's Name"], ["BY ID", "BY NAME"]);
	updateAuthorSection.appendChild(gridContainer);
	// Select elements from the DOM
	const startUpdateButton = document.querySelector('#prelim-form-submit-button');
	const chooseHowToUpdateAuthorMenu = document.querySelector('#prelim-select-option-menu');
	// Add an Event Listener to clear Prelim form and create a form to make the request
	startUpdateButton.addEventListener('click', function() {
		// Clear grid container
		clearContainer(gridContainer);
		hideElement(gridContainer);
		// To Update by ID
		if (chooseHowToUpdateAuthorMenu.value == "BY ID") {
			// Call Function to create form
			createForm(updateAuthorSection, ["Enter Author's ID: ", "Enter Author's New Name: "], "update-author-input", "sub-update-author-button", 2, "To update an Author, enter the ID of the Author AND a new name for the Author in the boxes below and click submit.");
			// Save DOM Variables neccessary to make request
			const submitUpdateAuthorButton = document.querySelector('#sub-update-author-button');
			const updateAuthorIdInput = document.querySelector('#update-author-input');
			const updateAuthorNameInput = document.querySelector('#update-author-input-two');

			// Add Event Listener to make request 
			submitUpdateAuthorButton.addEventListener('click', function() {
				// Only send request if all input fields are complete
				if ((updateAuthorNameInput.value) && (updateAuthorIdInput)) {
					// Declare URL
					const updateAuthorUrl = url + "authors/" + updateAuthorIdInput.value;
					// Save new Author object
					const newAuthorObject = {
						name: updateAuthorNameInput.value
					}
					// Make request
					updateItemRequest("Author", updateAuthorUrl, updateAuthorSection, newAuthorObject);
				} else {
					alert("Please Complete All Input Fields");
				}
			})
		}
		// To Update by Name
		else if (chooseHowToUpdateAuthorMenu.value == "BY NAME") {
			// Call Function to create form
			createForm(updateAuthorSection, ["Enter Author's Current Name: ", "Enter Author's New Name: "], "update-author-input", "sub-update-author-button", 2, "To update an Author, enter the current name of the Author AND a new name for the Author in the boxes below and click submit.");
			// Save DOM Variables neccessary to make request
			const submitUpdateAuthorByNameButton = document.querySelector('#sub-update-author-button');
			const updateAuthorCurrentNameInput = document.querySelector('#update-author-input');
			const updateAuthorNewNameInput = document.querySelector('#update-author-input-two');
			// Add Event Listener to make request 
			submitUpdateAuthorByNameButton.addEventListener('click', function() {
				// Only send request if all input fields are complete
				if ((updateAuthorCurrentNameInput.value) && (updateAuthorNewNameInput.value)) {
					// Save URL 
					const updateAuthorUrl = encodeURI(url + "authorname/" + updateAuthorCurrentNameInput.value);
					// Save new author object
					const newAuthorObject = {
						name: updateAuthorNewNameInput.value
					}
					// Make request
					updateItemRequest("Author", updateAuthorUrl, updateAuthorSection, newAuthorObject);
				} else {
					alert("Please Complete All Input Fields");
				}
			})
		}
	})
})


//====================================================================

// 							BOOK REQUESTS

//====================================================================

//=============================================
// ADD BOOK REQUEST
//=============================================

addBookButton.addEventListener('click', function() {
	// Clear the container
	clearContainer(addBookSection);
	// Display Elements
	showFlexDisplay(addBookSection);
	const hideElementArray = [responseMessageSection, searchContainer, deleteBookSection, updateBookSection, resultsHeader, resultsField];
	hideElementArray.forEach(function(item) {
		hideElement(item);
	})
	
	// Call Function to create form 
	createForm(addBookSection, ["Enter Book Title: ", "Enter Book isbn Number: "], "add-book-input", "sub-add-book-button", 2, "To add a new book, enter the book's title and ISBN number in the boxes below and click submit. You will then be asked if you want to add Authors to this book.");

	// Save DOM Variables neccessary to make request 
	const submitAddBookButton = document.querySelector('#sub-add-book-button');
	const addBookTitleInput = document.querySelector('#add-book-input');
	const addBookIsbnInput = document.querySelector('#add-book-input-two');

	// Add Event Listener to make request 
	submitAddBookButton.addEventListener('click', function() {
		// Only make request if input fields are complete
		if ((addBookTitleInput.value) && (addBookIsbnInput.value)) {
			// Check if NEW ISBN Input is a number (false if just a number)
			var isbnStringBool = isNaN(addBookIsbnInput.value);
			// Complete request only if ISBN is all numeric
			if (isbnStringBool === false) {
				const addBookUrl = url + "books";
				const newBook = {
					title: addBookTitleInput.value,
					isbn: addBookIsbnInput.value
				}
				const newBookParsed = JSON.parse(JSON.stringify(newBook));
				// Make request to add the Book - Need to keep id of book local to make second request to add author
				axios.post(addBookUrl, newBookParsed)
				.then(function(res) {
					// Save book id
					const newBookId = res.data.id;
					// Declare new book
					const newBookUrl = encodeURI(addBookUrl + '/' + newBookId);
					// Make get request to display new book
					getFromServer(newBookUrl, renderSearchResponse, "Book", 1);
					// Prepare DOM Area & Create new form for adding Author
					clearContainer(addBookSection);
					createForm(addBookSection, ["Enter the Authors Name: "], "add-author-to-book-input", "sub-add-author-to-book-button", 1, "To add an Author to this book, enter the Authors Name in the box below.");
					// Select elements from DOM 
					const submitAddAuthorToBookButton = document.querySelector('#sub-add-author-to-book-button');
					const addAuthorToBookInput = document.querySelector('#add-author-to-book-input');
					// Add Event Listener to make request
					submitAddAuthorToBookButton.addEventListener('click', function(){
						// Only complete request if Input fields are complete
						if (addAuthorToBookInput.value) {
							// Declare Author to Book Post url
							const authorToBookURL = newBookUrl + '/authors';
							// Declare new author object
							const authorToPost = {
								name: addAuthorToBookInput.value
							}
							// Make second request to add an author to this book
							addItemRequest('Relationship', authorToBookURL, addBookSection, authorToPost);
						} else {
							alert("Please Complete All Input Fields");
						}
					})
				})
			} else {
				alert("New ISBN input should be a number");
			}

		} else {
			alert("Please Complete All Input Fields");
		}
	})
})



//=============================================
// DELETE BOOK REQUEST
//=============================================

deleteBookButton.addEventListener('click', function() {
	// Clear the container
	clearContainer(deleteBookSection);
	// Display Elements
	showFlexDisplay(deleteBookSection);
	const hideElementArray = [responseMessageSection, searchContainer, addBookSection, updateBookSection, resultsHeader, resultsField];
	hideElementArray.forEach(function(item) {
		hideElement(item);
	})
	// Create Form to ask user if they want to delete by Book ID, ISBN or Title
	// - Create the Grid Container
	const gridContainer = createPrelimSelectForm(["Choose How to Delete a Book", "You can delete a Book by entering the Book's ID, ISBN or TITLE"], ["BY ID", "BY ISBN", "BY TITLE"]);
	deleteBookSection.appendChild(gridContainer);
	// Select elements from the DOM
	const startDeleteButton = document.querySelector('#prelim-form-submit-button');
	const chooseHowToDeleteBookMenu = document.querySelector('#prelim-select-option-menu');

	// Add Event Listener to Start Delete Button to hide prelim form and create new form to make request
	startDeleteButton.addEventListener('click', function() {
		// Clear prelim form
		clearContainer(gridContainer);
		hideElement(gridContainer);
		// Delete by ID
		if (chooseHowToDeleteBookMenu.value == "BY ID") {
			// Call Function to create form 
			createForm(deleteBookSection, ["Enter The Books ID: "], "delete-book-input", "sub-delete-book-button", 1, "To delete a book, enter the book's ID in the box below and click submit.");
			// Save DOM Variables neccessary to make request
			const submitDeleteBookButton = document.querySelector('#sub-delete-book-button');
			const deleteBookInput = document.querySelector('#delete-book-input');

			// Add Event Listener to make request 
			submitDeleteBookButton.addEventListener('click', function() {
				// Only send request if input field is complete
				if (deleteBookInput.value) {
					// Declare specific delete book URL
					const deleteBookUrl = url + "books/" + deleteBookInput.value;
					// Make request
					deleteItemRequest(deleteBookUrl, deleteBookSection);
				} else {
					alert("Please Complete All Input Fields");
				}
			})
		}
		// Delete by ISBN
		else if (chooseHowToDeleteBookMenu.value == "BY ISBN") {
			createForm(deleteBookSection, ["Enter The Books ISBN: "], "delete-book-input", "sub-delete-book-button", 1, "To delete a book, enter the book's ISBN in the box below and click submit.");
			// Save DOM Variables neccessary to make request
			const submitDeleteBookByISBNButton = document.querySelector('#sub-delete-book-button');
			const deleteBookByISBNInput = document.querySelector('#delete-book-input');
			// Add Event Listener to make request 
			submitDeleteBookByISBNButton.addEventListener('click', function() {
				// Only send request if input field is complete
				if (deleteBookByISBNInput.value) {
					// Declare specific delete book URL
					const deleteBookByISBNUrl = encodeURI(url + 'bookisbn/' + deleteBookByISBNInput.value);
					// Make request
					deleteItemRequest(deleteBookByISBNUrl, deleteBookSection);
				} else {
					alert("Please Complete All Input Fields");
				}
			})
		}
		// Delete by Title
		else if (chooseHowToDeleteBookMenu.value == "BY TITLE") {
			createForm(deleteBookSection, ["Enter The Books Title: "], "delete-book-input", "sub-delete-book-button", 1, "To delete a book, enter the book's TITLE in the box below and click submit.");
			// Save DOM Variables neccessary to make request
			const submitDeleteBookByTitleButton = document.querySelector('#sub-delete-book-button');
			const deleteBookByTitleInput = document.querySelector('#delete-book-input');
			// Add Event Listener to make request 
			submitDeleteBookByTitleButton.addEventListener('click', function() {
				// Only send request if input field is complete
				if (deleteBookByTitleInput.value) {
					// Declare specific delete book URL
					const deleteBookByTitleUrl = encodeURI(url + 'booktitle/' + deleteBookByTitleInput.value);
					// Make request
					deleteItemRequest(deleteBookByTitleUrl, deleteBookSection);
				} else {
					alert("Please Complete All Input Fields");
				}
			})
		}
	})

})



//=============================================
// UPDATE BOOK REQUEST
//=============================================

updateBookButton.addEventListener('click', function() {
	// Clear the container
	clearContainer(updateBookSection);
	// Display Elements
	showFlexDisplay(updateBookSection);
	const hideElementArray = [responseMessageSection, searchContainer, addBookSection, deleteBookSection, resultsHeader, resultsField];
	hideElementArray.forEach(function(item) {
		hideElement(item);
	})

	// Create Form to ask user if they want to update by Book ID, ISBN or Title
	// - Create the Grid Container
	const gridContainer = createPrelimSelectForm(["Choose How to Update a Book", "You can Update a Book by entering the Book's ID, ISBN or TITLE"], ["BY ID", "BY ISBN", "BY TITLE"]);
	updateBookSection.appendChild(gridContainer);
	// Select elements from the DOM
	const startUpdateButton = document.querySelector('#prelim-form-submit-button');
	const chooseHowToUpdateBookMenu = document.querySelector('#prelim-select-option-menu');

	// Add Event Listener to start update button to clear preliminary form and create new request form
	startUpdateButton.addEventListener('click', function() {
		// Clear grid container
		clearContainer(gridContainer);
		hideElement(gridContainer);
		// Update By ID 
		if (chooseHowToUpdateBookMenu.value == "BY ID") {
			// Call Function to create form
			createForm(updateBookSection, ["Enter The Book's ID: ", "Enter The Book's New Title: ", "Enter The Book's New ISBN Number: "], "update-book-input", "sub-update-book-button", 3, "To update a book, enter the ID of the book you want to update, enter a new title and a new ISBN for the book in the boxes below, then click submit.");

			// Save DOM Variables neccessary to make request
			const submitUpdateBookButton = document.querySelector('#sub-update-book-button');
			const updateBookIdInput = document.querySelector('#update-book-input');
			const updateBookTitleInput = document.querySelector('#update-book-input-two');
			const updateBookIsbnInput = document.querySelector('#update-book-input-three');

			// Add Event Listener to make request 
			submitUpdateBookButton.addEventListener('click', function() {
				// Complete Request only if all input fields are complete
				if ((updateBookIdInput.value) && (updateBookTitleInput.value) && (updateBookIsbnInput.value)) {
					// Check if NEW ISBN Input is a number (false if just a number)
					var isbnStringBool = isNaN(updateBookIsbnInput.value);
					// Complete request only if ISBN is all numeric
					if (isbnStringBool === false) {
						// Declare update book url
						const updateBookUrl = url + "books/" + updateBookIdInput.value;
						// Save new book object
						const newBookObject = {
							title: updateBookTitleInput.value,
							isbn: updateBookIsbnInput.value
						}
						// Make request
						updateItemRequest("Book", updateBookUrl, updateBookSection, newBookObject);
					} else {
						alert("New ISBN input should be a number");
					}

				} else {
					alert("Please Complete All Input Fields");
				}
			})
		}
		// Update By ISBN
		else if (chooseHowToUpdateBookMenu.value == "BY ISBN") {
			// Call Function to create form
			createForm(updateBookSection, ["Enter The Book's Current ISBN: ", "Enter The Book's New Title: ", "Enter The Book's New ISBN Number: "], "update-book-input", "sub-update-book-button", 3, "To update a book, enter the current ISBN of the book you want to update, enter a new title and a new ISBN for the book in the boxes below, then click submit.");

			// Save DOM Variables neccessary to make request
			const submitUpdateBookByIsbnButton = document.querySelector('#sub-update-book-button');
			const updateBookCurrentIsbnInput = document.querySelector('#update-book-input');
			const updateBookNewTitleInput = document.querySelector('#update-book-input-two');
			const updateBookIsbnInput = document.querySelector('#update-book-input-three');
			// Add Event Listener to make request 
			submitUpdateBookByIsbnButton.addEventListener('click', function() {
				// Complete Request only if all input fields are complete
				if ((updateBookCurrentIsbnInput.value) && (updateBookNewTitleInput.value) && (updateBookIsbnInput.value)) {
					// Check if NEW ISBN Input is a number (false if just a number)
					var isbnStringBool = isNaN(updateBookIsbnInput.value);
					// Complete request only if ISBN is all numeric
					if (isbnStringBool === false) {
						// Declare specific URL
						const updateBookByIsbnUrl = encodeURI(url + "bookisbn/" + updateBookCurrentIsbnInput.value);
						// Save new book object
						const newBookObject = {
							title: updateBookNewTitleInput.value,
							isbn: updateBookIsbnInput.value
						}
						// Make request
						updateItemRequest("Book", updateBookByIsbnUrl, updateBookSection, newBookObject);

					} else {
						alert("New ISBN input should be a number");
					}

				} else {
					alert("Please Complete All Input Fields");
				}
			})
		}
		// Update By Title
		else if (chooseHowToUpdateBookMenu.value == "BY TITLE") {
			// Call Function to create form
			createForm(updateBookSection, ["Enter The Book's Current Title: ", "Enter The Book's New Title: ", "Enter The Book's New ISBN Number: "], "update-book-input", "sub-update-book-button", 3, "To update a book, enter the current title of the book you want to update, enter a new title and a new ISBN for the book in the boxes below, then click submit.");

			// Save DOM Variables neccessary to make request
			const submitUpdateBookByTitleButton = document.querySelector('#sub-update-book-button');
			const updateBookCurrentTitleInput = document.querySelector('#update-book-input');
			const updateBookNewTitleInput = document.querySelector('#update-book-input-two');
			const updateBookIsbnInput = document.querySelector('#update-book-input-three');
			// Add Event Listener to make request 
			submitUpdateBookByTitleButton.addEventListener('click', function() {
				// Complete Request only if all input fields are complete
				if ((updateBookCurrentTitleInput.value) && (updateBookNewTitleInput.value) && (updateBookIsbnInput.value)) {
					// Check if ISBN Input is a number (false if just a number)
					var isbnStringBool = isNaN(updateBookIsbnInput.value);
					// Complete request only if ISBN is all numeric 
					if (isbnStringBool === false) {
						// Declare update book url
						const updateBookByTitleUrl = encodeURI(url + "booktitle/" + updateBookCurrentTitleInput.value);
						// Save new book
						const newBookObject = {
							title: updateBookNewTitleInput.value,
							isbn: updateBookIsbnInput.value
						}
						// Make request
						updateItemRequest("Book", updateBookByTitleUrl, updateBookSection, newBookObject);
					} else {
						alert("ISBN input should be a number");
					}
				} else {
					alert("Please Complete All Input Fields");
				}
			})
		}
 	})
})



