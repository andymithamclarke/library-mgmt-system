//==================================================================================================================

// UTILITY FUNCTIONS TO RENDER RESPONSE - Used in all page specific JS files

//==================================================================================================================

//====================
// Imports
//====================

// Import from requests.js
import { url, getFromServer, addItemRequest, deleteItemRequest, updateItemRequest, getAllLoansReturnBookId } from "./requests.js";

// Import from changedisplay.js
import { resultsField, resultsHeader, specificFormCreationArea, specificFormTitle, specificFormInput, navSection, responseMessageSection, searchArea, modifyArea, formModifyArea, clearContainer, showResultsHeader, createNewResultContainer, createNewResultItemContainer, hideElement, showFlexDisplay, showFlexColumnDisplay, showInlineBlockDisplay, createNewResultHeaderContainer, changeResultsHeader, createSeeMoreButton, displayMessage} from "./changedisplay.js";

// Import from form.js
import { createForm, createSpecificItemPostRequestButton } from "./form.js";


//====================
// General Useful Variables
//====================

// Helper Function to extract object from array
const extract = function(array) {
	array.forEach(function(item) {
		object = {item};
	})
	return object.item
}

//====================
// Render Get Response 

// Function will take HTTP response object and render on HTML page
//====================

export const renderGetResponse = function(object, type, elementType) {
	if (elementType === "Array") {
		object = extract(object);
	}
	// Only Render the response if there is a response object passed to the function parameters
	if (object) {
	// Clear specific form containers 
	clearContainer(specificFormTitle);
	clearContainer(specificFormInput);
	// Call function to reveal results header
	showResultsHeader();
	// Create item indexer object
	let index = -1;
	Object.keys(object).forEach(function(key){
		// Increment Indexer by 1
		index = index + 1;
		//Create new containers to host response parameters
		const resultsContainer = createNewResultContainer();
		// Give result container a unique id
		resultsContainer.id = "response-item-" + index.toString();
		const idContainer = createNewResultItemContainer();
		const mainParamNameContainer = createNewResultItemContainer();
		// Create inner HTML from object keys (ID & Author Name)
		idContainer.innerHTML = object[key].id;

		// Check type of query and change inner HTML accordingly
		// For Authors
		if (type === "Author") {
			// Set mainParamNameContainer inner HTML to Author's name
			mainParamNameContainer.innerHTML = object[key].name;
			// Create post to this item button 
			const postToThisItemButton = createSpecificItemPostRequestButton("Author", "Add a Book", object[key]);
			// Append new button to results container
			resultsContainer.appendChild(postToThisItemButton);
		}

		// For Users
		else if (type === "Users") {
			mainParamNameContainer.innerHTML = object[key].name;
			// Create post to this item button
			const postToThisItemButton = createSpecificItemPostRequestButton("Users", "Add a Loan", object[key]);
			// Append new button to results container
			resultsContainer.appendChild(postToThisItemButton);
			// Create containers for Barcode & Member Type
			const barcodeContainer = createNewResultItemContainer();
			barcodeContainer.innerHTML = object[key].barcode;
			barcodeContainer.className = "col-4";
			const memberTypeContainer = createNewResultItemContainer();
			memberTypeContainer.innerHTML = object[key].memberType;
			memberTypeContainer.className = "col-5-7";
			// Append to results container
			resultsContainer.appendChild(memberTypeContainer);
			resultsContainer.appendChild(barcodeContainer);
		}
		// For Books
		else if (type === "Book") {
			// Set mainParamNameContainer inner HTML to Book Title
			mainParamNameContainer.innerHTML = object[key].title;
			// Create post to this item button 
			const postToThisItemButton = createSpecificItemPostRequestButton("Book", "Add an Author", object[key]);
			// Append new button to results container
			resultsContainer.appendChild(postToThisItemButton);
			// Create container for ISBN
			const isbnContainer = createNewResultItemContainer();
			isbnContainer.innerHTML = object[key].isbn;
			isbnContainer.className = "col-4";
			// Append to results container
			resultsContainer.appendChild(isbnContainer);

		}
		// For Loans 
		else if (type == "Loans") {
			// Set main param container to sliced version of due date - will provide date not time
			mainParamNameContainer.innerHTML = object[key].dueDate.slice(0,10);
			// Create containers & set class names for book id & user id
			const loanedBookIdContainer = createNewResultItemContainer();
			loanedBookIdContainer.innerHTML = object[key].BookId;
			loanedBookIdContainer.className = "col-4";
			const loanedUserIdContainer = createNewResultItemContainer();
			loanedUserIdContainer.innerHTML = object[key].UserId;
			loanedUserIdContainer.className = "col-5-7";
			// Append to results container
			resultsContainer.appendChild(loanedBookIdContainer);
			resultsContainer.appendChild(loanedUserIdContainer);
		}

		//Specify CSS class names for ID & Name Containers 
		idContainer.className = "col-1";
		mainParamNameContainer.className = "row-2-col-2-4";
		//append new items to results container
		resultsContainer.appendChild(idContainer);
		resultsContainer.appendChild(mainParamNameContainer);
		// append results container to results field
		resultsField.appendChild(resultsContainer);
	})

	// If no response object found > Display Message to inform User of this 
	} else {
		displayMessage("Your request returned no results.");
	}	
} 


//====================
// Render Search Response 

// Function will take HTTP response object from a search query and render on HTML page
//====================


export const renderSearchResponse = function(object, type, elementType) {
	if (elementType === "Array") {
		object = extract(object);
	}
	// Check is res object is empty
	if (object.id) {
	// Display results header
	showResultsHeader();
	//Create new containers to host response parameters
	const resultsContainer = createNewResultContainer();
	const idContainer = createNewResultItemContainer();
	const mainParamNameContainer = createNewResultItemContainer();
	// Create inner HTML from object keys (ID & Author Name)
	idContainer.innerHTML = object.id;
	// Check type of object
	// For Authors
	if (type === "Author") {
		mainParamNameContainer.innerHTML = object.name;
	}
	// For Books
	else if (type === "Book") {
		mainParamNameContainer.innerHTML = object.title;
		// Create post to this item button 
		const postToThisItemButton = createSpecificItemPostRequestButton("Book", "Add an Author", object);
		// Append new button to results container
		resultsContainer.appendChild(postToThisItemButton);
		// Create container for ISBN
		const isbnContainer = createNewResultItemContainer();
		isbnContainer.innerHTML = object.isbn;
		isbnContainer.className = "col-4";
		// Append to results container
		resultsContainer.appendChild(isbnContainer);
	}
	// For users
	else if (type === "Users") {
		mainParamNameContainer.innerHTML = object.name;
		// Create Post to this item button
		const postToThisItemButton = createSpecificItemPostRequestButton("Users", "Add a Loan", object);
		// Append new button to results container
		resultsContainer.appendChild(postToThisItemButton);
		// Create containers for Barcode & User Type
		const barcodeContainer = createNewResultItemContainer();
		barcodeContainer.innerHTML = object.barcode;
		barcodeContainer.className = "col-4";
		const memberTypeContainer = createNewResultItemContainer();
		memberTypeContainer.innerHTML = object.memberType;
		memberTypeContainer.className = "col-5-7";
		// Append to results container
		resultsContainer.appendChild(memberTypeContainer);
		resultsContainer.appendChild(barcodeContainer);

	}
	// For Loans
	else if (type === "Loans") {
		// Set main param container to sliced version of due date - will provide date not time
		mainParamNameContainer.innerHTML = object.dueDate.slice(0,10);
		// Create containers & set class names for book id & user id
		const loanedBookIdContainer = createNewResultItemContainer();
		loanedBookIdContainer.innerHTML = object.BookId;
		loanedBookIdContainer.className = "col-4";
		const loanedUserIdContainer = createNewResultItemContainer();
		loanedUserIdContainer.innerHTML = object.UserId;
		loanedUserIdContainer.className = "col-5-7";
		// Append to results container
		resultsContainer.appendChild(loanedBookIdContainer);
		resultsContainer.appendChild(loanedUserIdContainer);

	}
	//Specify CSS class names for ID & Name Containers 
	idContainer.className = "col-1";
	mainParamNameContainer.className = "row-2-col-2-4";
	//append new items to results container
	resultsContainer.appendChild(idContainer);
	resultsContainer.appendChild(mainParamNameContainer);
	// append results container to results field
	resultsField.appendChild(resultsContainer);

	}
	// If there is no object display message "No results"
	else {
		hideElement(resultsHeader);
		showFlexDisplay(responseMessageSection);
		displayMessage("Your search returned no results");
	}
}



//====================
// Render All Entities Response 

// Function will take HTTP response object (with relationships to other objects) from a search query and render on HTML page
//====================

export const renderAllEntitiesResponse = function(object, type, length) {
	// Check length of object and extract if required 
	if (length === 1) {
		object = {object};
	}
	// Loop through response object
	Object.keys(object).forEach(function(key){
		// Create essential containers for Results Field 
		const resultsContainer = createNewResultContainer();
		const idContainer = createNewResultItemContainer();
		const mainInfoContainer = createNewResultItemContainer();

		// If Author
		if (type === "Author") {
		// Create post to this item button 
		const postToThisItemButton = createSpecificItemPostRequestButton("Author", "Add a Book", object[key]);
		// Append new button to results container
		resultsContainer.appendChild(postToThisItemButton);	

		// Create inner HTML from object keys (ID & Author Name)
		idContainer.innerHTML = object[key].id;
		mainInfoContainer.innerHTML = object[key].name;
		//Specify CSS class names for ID & Name Containers 
		idContainer.className = "col-1";
		mainInfoContainer.className = "row-2-col-2-4";
		//append new items to results container
		resultsContainer.appendChild(idContainer);
		resultsContainer.appendChild(mainInfoContainer);
		//Iterate through Books of each Author and extract details
		const books = object[key].Books;
		Object.keys(books).forEach(function(item){
			//Create containers for each book id, book title & isbn numbers
			const newBookId = createNewResultItemContainer();
			const newBookTitle = createNewResultItemContainer();
			const newBookIsbn = createNewResultItemContainer();
			// Create inner HTML for book info
			newBookId.innerHTML = books[item].id;
			newBookTitle.innerHTML = books[item].title;
			newBookIsbn.innerHTML = books[item].isbn;
			// Specify CSS classes for new book containers 
			newBookId.className = "no-row-col-4";
			newBookTitle.className = "no-row-col-5-7";
			newBookIsbn.className = "no-row-col-7";
			// Append new book info to results container
			resultsContainer.appendChild(newBookId);
			resultsContainer.appendChild(newBookTitle);
			resultsContainer.appendChild(newBookIsbn);
		})
		// For Books
		} else if (type === "Book") {
			// Create post to this item button 
			const postToThisItemButton = createSpecificItemPostRequestButton("Book", "Add an Author", object[key]);
			// Append new button to results container
			resultsContainer.appendChild(postToThisItemButton);
			// Create inner HTML from outer object keys (ID & Book Title)
			idContainer.innerHTML = object[key].id;
			mainInfoContainer.innerHTML = object[key].title;
			//Specify CSS class names for ID & Name Containers 
			idContainer.className = "col-1";
			mainInfoContainer.className = "row-2-col-2-4";
			// Create new container for ISBN
			const bookIsbnContainer = createNewResultItemContainer();
			bookIsbnContainer.innerHTML = object[key].isbn;
			bookIsbnContainer.className = 'col-4';
			//append new items to results container
			resultsContainer.appendChild(bookIsbnContainer);
			resultsContainer.appendChild(idContainer);
			resultsContainer.appendChild(mainInfoContainer);
			//Iterate through Books of each Author and extract details
			const authors = object[key].Authors;
			Object.keys(authors).forEach(function(item) {
				//Create containers for each author id & author name
				const newAuthorID = createNewResultItemContainer();
				const newAuthorName = createNewResultItemContainer();
				// Create Inner Html for Author info 
				newAuthorID.innerHTML = authors[item].id;
				newAuthorName.innerHTML = authors[item].name;
				// Specify CSS classes for new author containers
				newAuthorID.className = "no-row-col-5";
				newAuthorName.className = "no-row-col-6-8";
				// Append new author to results container
				resultsContainer.appendChild(newAuthorID);
				resultsContainer.appendChild(newAuthorName);
			})	
		}		
		// Append each results container to the results field
		resultsField.appendChild(resultsContainer);
	})
}