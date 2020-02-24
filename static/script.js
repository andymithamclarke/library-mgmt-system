//==================================================================================================================

// JS FOR INDEX PAGE

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
// Specific Selections From DOM index.html
//==================


// Declare Search URL
const searchUrl = url + "search?type=";

// Search
const centralSearchSection = document.querySelector('#central-search-section');
const searchBar = document.querySelector("#search-box-input");
const searchTypeMenu = document.querySelector('#menu-type-selection');
const searchSubmitButton = document.querySelector('#submit-search-button');
const specificSearchTypeMenu = document.querySelector('#type-of-search-selection');

// Search Specific Option Boxes
const searchSpecificOptionOne = document.querySelector('#search-option-one');
const searchSpecificOptionTwo = document.querySelector('#search-option-two');
const searchSpecificOptionThree = document.querySelector('#search-option-three');



//=============================================
// SEARCH BUTTON EVENT LISTENERS 
//=============================================


// Event Listener for Choice of What to Search For ... Dropdown
// This will change the inner HTML of 2nd more specific Dropdown
searchTypeMenu.addEventListener('change', function() {
	if (searchTypeMenu.value === "Authors") {
		searchSpecificOptionOne.innerHTML = "Name";
		hideElement(searchSpecificOptionTwo);
		hideElement(searchSpecificOptionThree);
	} else if (searchTypeMenu.value === "Books") {
		showInlineBlockDisplay(searchSpecificOptionTwo);
		hideElement(searchSpecificOptionThree);
		searchSpecificOptionOne.innerHTML = "Title";
		searchSpecificOptionTwo.innerHTML = "ISBN";
	} else if (searchTypeMenu.value === "Users") {
		showInlineBlockDisplay(searchSpecificOptionTwo);
		showInlineBlockDisplay(searchSpecificOptionThree);
		searchSpecificOptionOne.innerHTML = "Name";
		searchSpecificOptionTwo.innerHTML = "Barcode";
		searchSpecificOptionThree.innerHTML = "Member Type";
	} else if (searchTypeMenu.value === "Loans") {
		hideElement(searchSpecificOptionTwo);
		hideElement(searchSpecificOptionThree);
		searchSpecificOptionOne.innerHTML = "Loan ID";
	}
})


// Event Listener to begin search and carry out request
searchSubmitButton.addEventListener('click', function() {

	// Prepare results container 
	clearContainer(resultsField);
	showFlexDisplay(resultsField);

	// Proceed if Both Search Querys have been entered
	if (searchTypeMenu.value && searchBar.value) {
		// Hide central search section
		hideElement(centralSearchSection);
		// Declare search variables
		const searchTerm = searchBar.value;
		const searchTypeChoice = searchTypeMenu.value.toLowerCase();
		// For Authors Search
		if (searchTypeMenu.value === "Authors") {
			const queryUrl = encodeURI(searchUrl + "author" + "&name=" + searchTerm);
			axios.get(queryUrl)
			.then(function(res) {
				// Check Status code
				// If status code === 200 show response 
				if (res.status === 200) {
					// Render Response
					renderGetResponse(res.data, "Author");
					// Change results header
					changeResultsHeader("Author");
					// See more button - Event Listener will make a further request to API endpoint with allEntities=true
					const seeMoreAuthorButton = document.querySelector('#author-see-more-button');
					seeMoreAuthorButton.addEventListener('click', function() {
						// Clear container 
						clearContainer(resultsField);
						// Define Search Authors URL 
						const searchAuthorsUrl = url + 'authors/' + res.data[0].id;
						// Make get request to recieve info from All entities = True 
						const allEntitiesQuery = searchAuthorsUrl + "?allEntities=true";
						getFromServer(allEntitiesQuery, renderAllEntitiesResponse, "Author", 1);
						// Ch
						changeResultsHeader("authorMore");

					})
				} else if (res.status === 204) {
					// If object is empty show message stating that no results were found
					hideElement(resultsHeader);
					showFlexDisplay(responseMessageSection);
					displayMessage("Your request returned no results");
				} else {
					// Log the full request if unknown status code
					console.log(res);
				}
			})
		// For Books Search
		} else if (searchTypeMenu.value === "Books") {
			// Specify query Url
			const queryUrl = encodeURI(searchUrl + "book&" + specificSearchTypeMenu.value.toLowerCase() + "=" + searchTerm);
			// Make Get Request
			axios.get(queryUrl)
			.then(function(res) {
				// Check Status code 
				if (res.status === 200) {
					// Render response
					renderGetResponse(res.data, "Book");
					// Change results header 
					changeResultsHeader("Book");
					// See more button
					const seeMoreBookButton = document.querySelector('#book-see-more-button');
					seeMoreBookButton.addEventListener('click', function() {
						// Clear container 
						clearContainer(resultsField);
						// Define each book All Entities URL by looping through result object
						Object.keys(res.data).forEach(function(key) {
							// Define URL
							const bookId = res.data[key].id;
							const bookAllEntitiesUrl = encodeURI(url + 'books/' + bookId + "?allEntities=true");
							// Make request
							getFromServer(bookAllEntitiesUrl, renderAllEntitiesResponse, "Book", 1);
							// Change results header
							changeResultsHeader("bookMore");
						})

					})
				} else if (res.status === 204) {
					// If object is empty show message stating that no results were found
					hideElement(resultsHeader);
					showFlexDisplay(responseMessageSection);
					displayMessage("Your request returned no results");
				} else {
					// Log the full request if unknown status code
					console.log(res);
				}
			})
		// For Users Search
		} else if (searchTypeMenu.value === "Users") {
			// Prepare Search Type String
			const specificSearchTypeMenuReady = specificSearchTypeMenu.value.toLowerCase().replace(" ", "");
			// Declare URL
			const searchUserUrl = encodeURI(url + 'search?type=user&' + specificSearchTypeMenuReady + "=" + searchTerm);
			// Make request
			getFromServer(searchUserUrl, renderGetResponse, "Users");
			// Change Results Header accordingly 
			changeResultsHeader("User");
		} else if (searchTypeMenu.value === "Loans") {
			// Declare URL
			const loanSearchUrl = encodeURI(url + "loans/" + searchTerm);
			// Make request and render response
			getFromServer(loanSearchUrl, renderSearchResponse, "Loans", 1);
			// Change results Header
			changeResultsHeader("Loan");
		}
	} else alert("Please enter a search!");


})




