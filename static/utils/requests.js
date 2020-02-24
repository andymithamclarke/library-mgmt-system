//==================================================================================================================

// REQUEST UTILITY FUNCTIONS - Used in all page specific JS files

//==================================================================================================================

//================
// Imports
//================


// Import from changedisplay.js
import { resultsField, resultsHeader, specificFormCreationArea, specificFormTitle, specificFormInput, navSection, responseMessageSection, searchArea, modifyArea, formModifyArea, clearContainer, showResultsHeader, createNewResultContainer, createNewResultItemContainer, hideElement, showFlexDisplay, showFlexColumnDisplay, showInlineBlockDisplay, createNewResultHeaderContainer, changeResultsHeader, createSeeMoreButton, displayMessage} from "./changedisplay.js";

// Import from render.js
import { renderGetResponse, renderSearchResponse, renderAllEntitiesResponse } from "./render.js";

// Import from form.js
import { createForm, createSpecificItemPostRequestButton } from "./form.js";


//================
// General Useful Variables
//================

export var url = 'http://127.0.0.1:3000/';


//================
// GET
//================

export const getFromServer = function(queryUrl, functionToCall, type, length) {
	axios.get(queryUrl)
	.then(function(res) {
		// Check Status code to see if object was found
		if (res.status === 200) {
			// Declare Data Variable 
			var data = res.data;
			// Create Boolean Variable to assess if response object is empty
			// Code to check if object is empty
			// Modified from Stack Overflow post by Christoph on Mar 25 '09
			// accessed 7-01-2020
			// https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
			var isEmpty = (Object.keys(data).length === 0);
			// end of referenced code
			// If Object is not empty ... continue
			if (isEmpty === false) {
				// Hide Response Message Section 
				hideElement(responseMessageSection);
				// Call the function specified in function call params
				functionToCall(data, type, length);
				// "Turn on" Results Field Display
				showFlexColumnDisplay(resultsField);
			}
			// If object is empty show message stating that no results were found
			else {
				hideElement(resultsHeader);
				showFlexDisplay(responseMessageSection);
				displayMessage("Your request returned no results");
			}

		} else if (res.status === 204) {
			// If object is empty show message stating that no results were found
			hideElement(resultsHeader);
			showFlexDisplay(responseMessageSection);
			displayMessage("Your request returned no results");
			// If unknown status code - log response object
		} else {
			console.log(res);
		}
	})
} 

//================
// POST
//================


export const addItemRequest = function(type, specificUrl, parentSectionToHide, newObjectToBeUpdated) {
	// Change message display to show
	showFlexDisplay(responseMessageSection)
	//Check type of new object 
	// If adding book or user
	if ((type === "Book") || (type === "Users")) {
		// Make request
		axios.post(specificUrl, JSON.parse(JSON.stringify(newObjectToBeUpdated)))
		.then(function(res) {
			// Hide parent section
			hideElement(parentSectionToHide);
			// For Books
			if (type === "Book") {
				// Display message
				displayMessage(res.data.title + " was added to the Library Catalogue");
			}
			// For Users
			else if (type === "Users") {
				// Display Message
				displayMessage(res.data.name + " was added to the Library Catalogue");
			}

	})
		// If adding Author
	} else if (type === "Author") {
		// Make request
		axios.post(specificUrl, JSON.parse(JSON.stringify(newObjectToBeUpdated)))
		.then(function(res) {
			// Hide parent section
			hideElement(parentSectionToHide);
			// Display message
			displayMessage(res.data.name + " was added to the Library Catalogue");
	})
		// If adding Loan
	} else if (type === "Loan") {
		// Make request
		axios.post(specificUrl, JSON.parse(JSON.stringify(newObjectToBeUpdated)))
		.then(function(res) {
			// Display message depending on success of request
			if (res.status === 200) {
				// Hide Parent section and display message
				hideElement(parentSectionToHide);
				const message = ("Book number " + res.data.BookId + " has been checked out by " + "User " + res.data.UserId);
				displayMessage(message.toString());
			} else if (res.status === 204) {
				// Hide Parent section and display message
				hideElement(parentSectionToHide);
				displayMessage("Your request returned no results");
			} else if (res.status === 202) {
				console.log(res.status)
				// Hide Parent section and display message
				hideElement(parentSectionToHide);
				displayMessage("A Loan's due date must be in the future");
			} else {
				// If unknown status code - log response object
				console.log(res);
			}
		})
	}
	else if (type === "Relationship") {
		axios.post(specificUrl, JSON.parse(JSON.stringify(newObjectToBeUpdated)))
		.then(function(res) {
			// Display message depending on success of request
			if (res.status === 200) {
				// Hide Parent section and display message
				hideElement(parentSectionToHide);
				displayMessage("Your request was successful");
			} else if (res.status === 204) {
				// Hide Parent section and display message
				hideElement(parentSectionToHide);
				displayMessage("Your request returned no results");
			} else if (res.status === 202) {
				// Hide Parent section and display message
				hideElement(parentSectionToHide);
				displayMessage("A Loan's due date must be in the future");
			} else {
				// If unknown status code - log response object
				console.log(res);
			}
		})
	} else if (type === "newRelationship") {
		axios.post(specificUrl)
		.then(function(res) {
			// Display message depending on success of request
			if (res.status === 200) {
				// Hide Parent section and display message
				hideElement(parentSectionToHide);
				displayMessage("Your request was successful");
			} else if (res.status === 204) {
				// Hide Parent section and display message
				hideElement(parentSectionToHide);
				displayMessage("Your request returned no results");
			} else if (res.status === 202) {
				// Hide Parent section and display message
				hideElement(parentSectionToHide);
				displayMessage("A Loan's due date must be in the future");
			} else {
				// If unknown status code - log response object
				console.log(res);
			}
		})
	} else {
		// Hide Parent section and display message
		hideElement(parentSectionToHide);
		displayMessage("Your request returned no results");
	}
}


//================
// DELETE
//================

export const deleteItemRequest = function(specificItemUrl, parentSectionToHide) {
	// Change message display to show
	showFlexDisplay(responseMessageSection);
	// Make request
	axios.delete(specificItemUrl)
	.then(function(res) {
		//Hide "Parent" Section
		hideElement(parentSectionToHide);
		// Check status of request and display appropriate message
		if (res.status === 200) {
			displayMessage("Your request was successful");
		} else if (res.status === 204) {
			displayMessage("There is no entry matching your request");
		} else {
			// If unknown status code - log response object
			console.log(res);
		}
	})
}


//================
// PUT
//================


export const updateItemRequest = function(type, specificUrl, parentSectionToHide, newObjectToBeUpdated) {
	// Change message display to show
	showFlexDisplay(responseMessageSection);
	// if both name & id are entered send the request else show error
	axios.put(specificUrl, JSON.parse(JSON.stringify(newObjectToBeUpdated)))
	.then(function(res) {
		// Hide Parent Section
		hideElement(parentSectionToHide);
		// Check status code and display appropriate response message
		if (res.status === 200) {
			displayMessage("Your request was successful");
		} else if (res.status === 204) {
			displayMessage("There is no entry matching your request");
		} else if (res.status === 202) {
			displayMessage("A Loan's due date must be in the future");
		} else {
			// If unknown status code - log response object
			console.log(res);
		}
	})
}


//================
// * GET BOOK ID'S FROM LOANED BOOKS
//================

export const getAllLoansReturnBookId = function() {
	// Store Books Already on Loan
	const loanedBooksArray = [];
	// Make get request to retrieve loaned books
	const getLoansUrl = url + 'loans/';
	axios.get(getLoansUrl)
	.then(function(res) {
		// Loop through response object and push item to array
		Object.keys(res.data).forEach(function(key) {
			loanedBooksArray.push(res.data[key].BookId);
		})
	})
	// return array
	return loanedBooksArray
}








