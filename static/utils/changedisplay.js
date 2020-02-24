//==================================================================================================================

// CHANGE DOM DISPLAY UTILITY FUNCTIONS - Used in all page specific JS files

//==================================================================================================================

//====================
// Imports
//====================

// Import from requests.js
import { url, getFromServer, addItemRequest, deleteItemRequest, updateItemRequest, getAllLoansReturnBookId } from "./requests.js";

// Import from render.js
import { renderGetResponse, renderSearchResponse, renderAllEntitiesResponse } from "./render.js";

// Import from form.js
import { createForm, createSpecificItemPostRequestButton } from "./form.js";



//====================
// General Useful Variables
//====================

// Results area
export const resultsField = document.querySelector('.results-field');
export const resultsHeader = document.querySelector('.results-header');

// Specific form area
export const specificFormCreationArea = document.querySelector(".specific-form-creation-area");
export const specificFormTitle = document.querySelector('.specific-form-title');
export const specificFormInput = document.querySelector('.specific-form-input');

// Response message Section
export const responseMessageSection = document.querySelector('.response-message-section');

// Navigation Area
export const navSection = document.querySelector('.navigation-area');
export const searchArea  = document.querySelector('.search-area');
export const modifyArea = document.querySelector('.modify-area');
export const formModifyArea = document.querySelector('.form-modify-area');


//====================
// Functions
//====================


// Clear a container of it's contents 
export const clearContainer = function(container) {
	container.innerHTML = "";
};

// "Turn On" Results Header Display
export const showResultsHeader = function() {
	resultsHeader.style.display = "flex";
};

// Create new Result container
export const createNewResultContainer = function() {
	const newContainer = document.createElement("div");
	newContainer.className = "result-container";
	return newContainer
}

// Vreate new result item container 
export const createNewResultItemContainer = function() {
	const newContainer = document.createElement("p");
	return newContainer
};

// "Turn Off" Display
export const hideElement = function(element) {
	element.style.display = 'none';
}

// "Turn On" Flex Display (Row)
export const showFlexDisplay = function(element) {
	element.style.display = 'flex';
}

// "Turn On" Flex Display (Column)
export const showFlexColumnDisplay = function(element) {
	element.style.display = 'flex';
	element.style.flexDirection = 'column';
}

// "Turn On" Inline Block Display
export const showInlineBlockDisplay = function(element) {
	element.style.display = 'inline-block';
}


//====================
// For Results Header
//====================


export const changeResultsHeader = function(type) {
	// Clear the container
	clearContainer(resultsHeader);
	// Create Containers for results header / id & main param
	const newHeaderContainer = createNewResultHeaderContainer();
	const idContainer = createNewResultItemContainer();
	const mainParamNameContainer = createNewResultItemContainer();
	// Function to fill in details for results header
	const fillHeaderContainer = function(mainParamName, seeMoreId) {
		idContainer.innerHTML = "ID";
		idContainer.className = "col-1";
		mainParamNameContainer.innerHTML = mainParamName;
		mainParamNameContainer.className = "row-2-col-2-4";
		// Create see more button if required
		if (seeMoreId) {
			const seeMoreButton = createSeeMoreButton(seeMoreId);
			newHeaderContainer.appendChild(seeMoreButton);
		}
		// Append to parent element
		newHeaderContainer.appendChild(mainParamNameContainer);
		newHeaderContainer.appendChild(idContainer);
	}
	// For Authors Basic
	if (type === "Author") {
		fillHeaderContainer("AUTHOR", "author-see-more-button");
	}
	// For Authors All Entities
	else if (type === "authorMore") {
		// Fill Header
		fillHeaderContainer("AUTHOR");
		// Create containers
		const bookIdContainer = createNewResultItemContainer();
		const bookIsbnTitleContainer = createNewResultItemContainer();
		const bookTitleContainer = createNewResultItemContainer();
		// Specify inner html & class names
		bookIdContainer.innerHTML = "BOOK ID";
		bookIdContainer.className = "col-4";
		bookIsbnTitleContainer.innerHTML = "BOOK ISBN";
		bookIsbnTitleContainer.className = "col-7";
		bookTitleContainer.innerHTML = "TITLE";
		bookTitleContainer.className = "col-5-7";
		// Append to parent sections
		newHeaderContainer.appendChild(bookIdContainer);
		newHeaderContainer.appendChild(bookIsbnTitleContainer);
		newHeaderContainer.appendChild(bookTitleContainer);
	}
	// For books basic
	else if (type === "Book") {
		// Fill Header
		fillHeaderContainer('TITLE', "book-see-more-button");
		// Create containers
		const bookIsbnTitleContainer = createNewResultItemContainer();
		// Specify inner html & class names
		bookIsbnTitleContainer.innerHTML = "ISBN";
		bookIsbnTitleContainer.className = "col-4";
		// Append to parent sections
		newHeaderContainer.appendChild(bookIsbnTitleContainer);

	}
	 // For Books All Entities
	else if (type === "bookMore") {
		// Fill Header
		fillHeaderContainer("BOOK");
		// Create containers
		const authorIdContainer = createNewResultItemContainer();
		const authorNameContainer = createNewResultItemContainer();
		const bookIsbnTitleContainer = createNewResultItemContainer();
		// Specify inner html & class names
		bookIsbnTitleContainer.innerHTML = "ISBN";
		bookIsbnTitleContainer.className = "col-4";
		// Append to parent sections
		newHeaderContainer.appendChild(bookIsbnTitleContainer);
		// Specify inner html & class names
		authorIdContainer.innerHTML = "AUTHOR ID";
		authorIdContainer.className = "col-5";
		authorNameContainer.innerHTML = "AUTHOR";
		authorNameContainer.className = "col-6-8";
		// Append to parent sections
		newHeaderContainer.appendChild(authorIdContainer);
		newHeaderContainer.appendChild(authorNameContainer);
	}
	// For Users
	else if (type === "User") {
		// Fill Header
		fillHeaderContainer("USER");
		// Create containers
		const barcodeContainer = createNewResultItemContainer();
		const memberTypeContainer = createNewResultItemContainer();
		// Specify inner html & class names
		barcodeContainer.innerHTML = "BARCODE";
		barcodeContainer.className = "col-4";
		memberTypeContainer.innerHTML = "USER TYPE";
		memberTypeContainer.className = "col-5-7";
		// Append to parent sections
		newHeaderContainer.appendChild(barcodeContainer);
		newHeaderContainer.appendChild(memberTypeContainer);


	}
	else if (type === "Loan") {
		// Fill Header
		fillHeaderContainer("DUE DATE");
		// Create containers
		const userIdContainer = createNewResultItemContainer();
		const bookIdContainer = createNewResultItemContainer();
		// Specify inner html & class names
		userIdContainer.innerHTML = "USER ID";
		userIdContainer.className = "col-5-7";
		bookIdContainer.innerHTML = "BOOK ID";
		bookIdContainer.className = "col-4";
		// Append to parent sections
		newHeaderContainer.appendChild(userIdContainer);
		newHeaderContainer.appendChild(bookIdContainer);
	}
	// Append the new Header Container to the page
	resultsHeader.appendChild(newHeaderContainer);
}



// Helper Function to create new results-header-container 
export const createNewResultHeaderContainer = function() {
	const container = document.createElement('div');
	container.className = "result-header-container";
	return container 
}


// Helper function to create see more button 
export const createSeeMoreButton = function(buttonId) {
	const button = document.createElement("button");
	button.innerHTML = "See More";
	button.className = "button col-7";
	button.id = buttonId;
	return button
} 

// Helper function to display response message
export	const displayMessage = function(messageText) {
		clearContainer(responseMessageSection);
		const message = createNewResultItemContainer();
		message.innerHTML = messageText;
		message.className = "instruction-text";
		responseMessageSection.appendChild(message);
}

