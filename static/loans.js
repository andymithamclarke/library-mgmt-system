//==================================================================================================================

// JS FOR LOANS PAGE 

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
import { resultsField, resultsHeader, specificFormCreationArea, specificFormTitle, specificFormInput, navSection, responseMessageSection, searchArea, modifyArea, formModifyArea, clearContainer, showResultsHeader, createNewResultContainer, createNewResultItemContainer, hideElement, showFlexDisplay, showFlexColumnDisplay, showInlineBlockDisplay, createNewResultHeaderContainer, changeResultsHeader, createSeeMoreButton, displayMessage } from "./utils/changedisplay.js";

// Import from render.js
import { renderGetResponse, renderSearchResponse, renderAllEntitiesResponse } from "./utils/render.js";

// Import from form.js
import { createForm, createPrelimSelectForm, createSpecificItemPostRequestButton } from "./utils/form.js";


//==================
// Specific Selections From DOM loans.html
//==================

// Main Nav Panel
const loansControlButton = document.querySelector('#loans-control-button');

// Loans Navigation Area
const addLoanSection = document.querySelector('#add-loan-section');
const deleteLoanSection = document.querySelector('#delete-loan-section');
const updateLoanSection = document.querySelector('#update-loan-section');
const searchLoanSection = document.querySelector('#search-loan-section');

// Control Bar 
const addLoanButton = document.querySelector('#add-loan-button');
const deleteLoanButton = document.querySelector('#delete-loan-button');
const updateLoanButton = document.querySelector('#update-loan-button');
const searchLoanButton = document.querySelector('#search-loan-button');

// Results Field
const resultsArea = document.querySelector('.results-background-area');


const summonAllLoans = function() {
	// Make get request for all loans
	const getLoansUrl = url + 'loans/';
	getFromServer(getLoansUrl, renderGetResponse, "Loans");
	// Display Header
	changeResultsHeader("Loan");
}

summonAllLoans();

//=============================================
// GET REQUEST TO DISPLAY ALL LOANS 
//=============================================

loansControlButton.addEventListener('click', function() {
	// Display current loans in results field area
	summonAllLoans();
	// Loop through DOM sections to hide
	const hideArray = [deleteLoanSection, addLoanSection, searchLoanSection, updateLoanSection, responseMessageSection, specificFormCreationArea];
	hideArray.forEach(function(item) {
		hideElement(item);
	});
	// "Turn on " display of results field & Nav Section
	showFlexDisplay(navSection);
	showFlexDisplay(resultsArea);
	showFlexDisplay(resultsField);
	// Clear response message section
	clearContainer(responseMessageSection);
	// Clear results field
	clearContainer(resultsField);

})

//=============================================
// ADD LOAN
//=============================================

addLoanButton.addEventListener('click', function() {
	// Display Elements 
	const hideArray = [updateLoanSection, deleteLoanSection, searchLoanSection, resultsField, resultsHeader, responseMessageSection, specificFormCreationArea];
	hideArray.forEach(function(item) {
		hideElement(item);
	})
	//Prepare addLoanSection for Display
	clearContainer(searchLoanSection);
	clearContainer(addLoanSection);
	showFlexDisplay(addLoanSection);
	showFlexDisplay(formModifyArea);
	// Store Books already on Loan
	const loanedBooksArray = getAllLoansReturnBookId();
	// Create Form to Give User the choice of adding Loan by User Id & Book Id // User Name & Book Title 
	// - Create the Grid Container
	const gridContainer = createPrelimSelectForm(["Choose How to Add a Loan", "You can add a new Loan either by entering the User ID & the Book ID <br> OR <br> By entering the User's Name & the Book's Title."], ["BY ID", "BY NAME & TITLE"]);
	addLoanSection.appendChild(gridContainer);
	// Select elements from the DOM
	const startAddButton = document.querySelector('#prelim-form-submit-button');
	const chooseHowToAddLoanMenu = document.querySelector('#prelim-select-option-menu');
	//Add Event Listener to start delete button to clear prelim form and create 
	addLoanSection.appendChild(gridContainer);
	// Add Event Listener to Start Adding Loan
	startAddButton.addEventListener('click', function() {
		// Add Loan using user id & book id
		if (chooseHowToAddLoanMenu.value === "BY ID") {
			// Clear grid container & hide
			clearContainer(gridContainer);
			hideElement(gridContainer);
			// Create a Form to add a Loan By ID
			createForm(addLoanSection, ["Enter the User's ID: ", "Enter the Book's ID: ", "Enter a Due Date: "], "add-loan-input", "sub-add-loan-button", 3, "To add a loan, enter the ID of both the Book and the User, then enter a due date for the book to be returned (YYYY-MM-DD).");
			//Select from the DOM
			const submitNewLoanButton = document.querySelector('#sub-add-loan-button');
			const userIdInput = document.querySelector('#add-loan-input');
			const bookIdInput = document.querySelector('#add-loan-input-two');
			const dueDateInput = document.querySelector('#add-loan-input-three');
			// Add Event Listener to make request 
			submitNewLoanButton.addEventListener('click', function() {
				// Check if inputs have been specified
				if ((userIdInput.value) && (bookIdInput.value) && (dueDateInput.value)) {
					// Create a counter to increment if bookIDinput is equal to any item in loaned books array
					let counter = 0;
					// Loop through loaned books array
					loanedBooksArray.forEach(function(item) {
						if (item == bookIdInput.value) {
							// If match - increment counter
							counter = counter + 1;
						} else {counter}
					})
					// Only make request if counter = 0
					if (counter === 0) {
						const postNewLoanUrl = encodeURI(url + 'users/' + userIdInput.value + '/loans/' + bookIdInput.value);
						const newDueDateObject = {
							dueDate: dueDateInput.value
						}
						addItemRequest("Loan", postNewLoanUrl, addLoanSection, newDueDateObject);
					}
					// Display response message that the book is already on loan
					else {
						showInlineBlockDisplay(responseMessageSection);
						hideElement(addLoanSection);
						displayMessage('This Book is already on Loan');
					}
				} else {
					alert("Please complete all input fields")
				}
			})
			// Add Loan by user name and book title
		} else if (chooseHowToAddLoanMenu.value === "BY NAME & TITLE") {
			// Clear grid container & hide
			clearContainer(gridContainer);
			hideElement(gridContainer);
			// Create Form to add Loan by User Name & Book Title 
			createForm(addLoanSection, ["Enter the User's Name: ", "Enter the Book's Title: ", "Enter a Due Date: "], "add-loan-input", "sub-add-loan-button", 3, "To add a loan, enter the User's Name and the Book's Title, then enter a due date for the book to be returned (YYYY-MM-DD).");
			//Select from the DOM
			const submitNewLoanButton = document.querySelector('#sub-add-loan-button');
			const userNameInput = document.querySelector('#add-loan-input');
			const bookTitleInput = document.querySelector('#add-loan-input-two');
			const dueDateInput = document.querySelector('#add-loan-input-three');
			// Add Event Listener to make request 
			submitNewLoanButton.addEventListener('click', function() {
				// Check if inputs have been specified
				if ((userNameInput.value) && (bookTitleInput.value) && (dueDateInput.value)) {
					// Create a counter to increment if book id is equal to any item in loaned books array
					let counter = 0;
					// Make request to get Book details by title input
					const bookUrl = encodeURI(url + "booktitle/" + bookTitleInput.value);
					// Make get request 
					axios.get(bookUrl)
					.then(function(res) {
						// Only make request if array is more than 0 in length 
						if (res.data.length > 0) {
							// Loop through Books and check against ID's from Loaned Books Array
							Object.keys(res.data).forEach(function(key) {
								loanedBooksArray.forEach(function(item) {
									if (item == res.data[key].id) {
										// Increment counter by 1 if there is a match
										counter = counter + 1;
									} else {counter}
								})
								// Only make request if counter = 0
								if (counter === 0) {
									// If no matches declare Url & due date object
									const postNewLoanUrl = encodeURI(url + 'loansbyuser/' + userNameInput.value.toString() + '/' + bookTitleInput.value.toString());
									const newDueDateObject = {
											dueDate: dueDateInput.value
										}
									// Send Request & Display Result
									addItemRequest("Loan", postNewLoanUrl, addLoanSection, newDueDateObject);
									// If counter is not 0 - refuse request
								} else {
									// Display Message "Book already on Loan"
									showInlineBlockDisplay(responseMessageSection);
									hideElement(addLoanSection);
									displayMessage('This Book is already on Loan');
								}
							})

						} else {
							// Display Message "Your request returned no results"
							showInlineBlockDisplay(responseMessageSection);
							hideElement(addLoanSection);
							displayMessage("Your request returned no results");
						}
					})
				} else {
					alert("Please complete all input fields");
				}
			})
		}
	})
})

//=============================================
// DELETE LOAN
//=============================================

deleteLoanButton.addEventListener('click', function() {
	//Display Elements 
	const hideArray = [updateLoanSection, addLoanSection, searchLoanSection, resultsField, resultsHeader, responseMessageSection, specificFormCreationArea];
	hideArray.forEach(function(item) {
		hideElement(item);
	})
	clearContainer(deleteLoanSection);
	showFlexDisplay(deleteLoanSection);
	showFlexDisplay(formModifyArea);
	// Call function to create Form
	createForm(deleteLoanSection, ["Enter the ID of the Loan you want to Delete: "], "delete-loan-input", "sub-delete-loan-button", 1, "To delete a loan, enter the ID of the loan in the box below.");
	// Save DOM variables neccessary to make request
	const submitDeleteLoanButton = document.querySelector('#sub-delete-loan-button');
	const deleteLoanIdInput = document.querySelector('#delete-loan-input');
	// Add event listener to make request
	submitDeleteLoanButton.addEventListener('click', function() {
		// Check if input field is complete 
		if (deleteLoanIdInput.value) {
			// Declare URL
			const deleteLoanUrl = url + 'loans/' + deleteLoanIdInput.value;
			// Make request
			deleteItemRequest(deleteLoanUrl, deleteLoanSection);
		} else {
			alert("Please complete the input field");
		}
	})
})



//=============================================
// UPDATE LOAN
//=============================================

updateLoanButton.addEventListener('click', function() {
	//Display Elements 
	const hideArray = [deleteLoanSection, addLoanSection, searchLoanSection, resultsField, resultsHeader, responseMessageSection, specificFormCreationArea];
	hideArray.forEach(function(item) {
		hideElement(item);
	})

	clearContainer(updateLoanSection);
	hideElement(resultsArea);
	showFlexDisplay(updateLoanSection);
	showFlexDisplay(formModifyArea);
	// Call Function to create Form
	createForm(updateLoanSection, ["Enter the Loan ID: ", "Enter a new due-date: "], "update-loan-input", "sub-update-loan-button", 2, "To update a Loan, enter the ID of the loan and a new Due Date into the boxes below.");
	// Save DOM variables neccessary to make request 
	const submitUpdateLoanButton = document.querySelector('#sub-update-loan-button');
	const updateLoanIdInput = document.querySelector('#update-loan-input');
	const updateDueDateInput = document.querySelector('#update-loan-input-two');
	// Add Event Listener to make request
	submitUpdateLoanButton.addEventListener('click', function(){
		// Check if both input fields are complete
		if ((updateLoanIdInput.value) && (updateDueDateInput.value)) {
			// Declare URL
			const updateLoanUrl = url + 'loans/' + updateLoanIdInput.value;
			// Save updated loan object
			const updatedLoan = {
				dueDate: updateDueDateInput.value
			}
			// Make request
			updateItemRequest("Loans", updateLoanUrl, updateLoanSection, updatedLoan);
		} else {
			alert("Please complete all input fields");
		}
	})
})



//=============================================
// SEARCH LOANS
//=============================================


searchLoanButton.addEventListener('click', function() {
	// Display Elements
	const hideArray = [deleteLoanSection, updateLoanSection, addLoanSection, resultsField, resultsHeader, responseMessageSection, specificFormCreationArea];
	hideArray.forEach(function(item) {
		hideElement(item);
	})

	clearContainer(searchLoanSection);
	clearContainer(resultsHeader);
	clearContainer(resultsField);
	clearContainer(responseMessageSection);
	clearContainer(addLoanSection);
	showFlexDisplay(searchLoanSection);
	showFlexDisplay(formModifyArea);

	// Create Form to Give User the choice of adding Loan by User Id & Book Id // User Name & Book Title 
	// - Create the Grid Container
	const gridContainer = createPrelimSelectForm(["Choose How to Search for a Loan", "You can search Loans by Id to return a particular loan <br> OR <br> Search by User to return all that User's Loans <br> OR <br> Search by Book to return the User currently borrowing that book."], ["LOAN ID", "USER ID", "USER NAME", "BOOK ID", "BOOK TITLE"]);
	searchLoanSection.appendChild(gridContainer);
	// Select elements from the DOM
	const startSearchButton = document.querySelector('#prelim-form-submit-button');
	const chooseHowToSearchMenu = document.querySelector('#prelim-select-option-menu');
	// Append prelim form to parent section
	searchLoanSection.appendChild(gridContainer);
	//Add Event Listener to start delete button to clear prelim form and make request
	startSearchButton.addEventListener('click', function() {
		// Display results field & hide grid container
		hideElement(gridContainer);
		showFlexDisplay(resultsArea);
		// Declare General Loan Url
		const loanUrl = url + 'loans/';
		// Search Loans By Loan ID
		if (chooseHowToSearchMenu.value === "LOAN ID") {
			// Create Form to search by Loan ID
			createForm(searchLoanSection, ["Enter the Loan ID"], "search-loan-input", "sub-search-loan-button", 1, "To search for a loan, enter the ID of the Loan in the box below");
			// Save DOM variables neccessary to make request
			const submitSearchLoanButton = document.querySelector('#sub-search-loan-button');
			const searchLoanInput = document.querySelector('#search-loan-input');
			// Add Event Listener to make request 
			submitSearchLoanButton.addEventListener('click', function() {
				// Check if input field is complete
				if (searchLoanInput.value) {
					// Hide Parent Section
	 				hideElement(searchLoanSection);
					// Display Results Field
					clearContainer(resultsField);
					showFlexDisplay(resultsField);
					// Display Results Header
					changeResultsHeader("Loan");
					// Declare URL
					const searchLoanUrl = url + 'loans/' + searchLoanInput.value;
					// Make request
					getFromServer(searchLoanUrl, renderSearchResponse, "Loans", 1);
				} else {
					alert("Please enter a search query");
				}
			})

		} 
		// Search Loans By User ID
		else if (chooseHowToSearchMenu.value === "USER ID") {
			// Create Form to search by User
			createForm(searchLoanSection, ["Enter the Users ID: "], "search-loan-by-user-input", "sub-search-loan-by-user-button", 1, "To search for all a User's Loans, enter the ID of the User in the box below");
			// Save DOM variables to make request
			const submitSearchUserLoans = document.querySelector('#sub-search-loan-by-user-button');
			const searchUserLoanInput = document.querySelector('#search-loan-by-user-input');
			// Add Event Listener to submit search by User button 
			submitSearchUserLoans.addEventListener('click', function() {
				// Check if input field is complete 
				if (searchUserLoanInput.value) {
					// Hide Parent Section
	 				hideElement(searchLoanSection);
					// Display Results Field
					clearContainer(resultsField);
					showFlexDisplay(resultsField);
					// Change Results Header
					changeResultsHeader("Loan");
					// Make Request to get all Loans - locally 
					axios.get(loanUrl)
					.then(function(res) {
						// Declare Counter Object to count number of results
						let counter = 0;
						// Loop through loans and render response if user id matches input box
						Object.keys(res.data).forEach(function(key) {
							if (res.data[key].UserId == searchUserLoanInput.value) {
								renderSearchResponse(res.data[key], "Loans");
								counter = counter + 1;
							}
						})
						// If counter = 0 - display response message "No results"
						if (counter == 0) {
							showFlexDisplay(responseMessageSection);
							displayMessage("Your search returned no results");
							hideElement(searchLoanSection);
						}
					})
				} else {
					alert("Please enter a search query");
				}
			})
		}
		// Search Loans by User Name
		else if (chooseHowToSearchMenu.value === "USER NAME") {
			// Create Form to search Loans by User Name
			createForm(searchLoanSection, ["Enter the User's Name: "], "search-loan-by-user-name-input", "sub-search-loan-by-user-name-button", 1, "To search for all a User's Loans, enter the Name of the User in the box below");
			// Save DOM variables to make request
			const submitSearchUserLoansByNameButton = document.querySelector('#sub-search-loan-by-user-name-button');
			const searchUserLoansByNameInput = document.querySelector('#search-loan-by-user-name-input');
			// Add Event Listener to submit search by User Name button 
			submitSearchUserLoansByNameButton.addEventListener('click', function(){
				// Check input field is complete 
				if (searchUserLoansByNameInput.value) {
					// Hide Parent Section
	 				hideElement(searchLoanSection);
					// Display Results Field
					clearContainer(resultsField);
					showFlexDisplay(resultsField);
					// Change Results Header
					changeResultsHeader("Loan");
					// Declare search URL
					const searchLoansByUserNameUrl = encodeURI(url + 'loansbyuser/' + searchUserLoansByNameInput.value);
					// Make request
					getFromServer(searchLoansByUserNameUrl, renderGetResponse, "Loans");
					showFlexDisplay(responseMessageSection);
				} else {
					alert("Please enter a search query");
				}
			})
		}
		// Search Loans by Book ID
		else if (chooseHowToSearchMenu.value === "BOOK ID") {
			// Create Form to search by Book ID
			createForm(searchLoanSection, ["Enter the Book's ID: "], "search-loan-by-book-input", "sub-search-loan-by-book-button", 1, "To find the User loaning a Book, enter the ID of the Book in the box below");
 			// Save DOM variables to make request
 			const submitSearchLoanByBookButton = document.querySelector('#sub-search-loan-by-book-button');
 			const searchLoanByBookInput = document.querySelector('#search-loan-by-book-input');
 			// Add Event Listener to submit search by Book button 
 			submitSearchLoanByBookButton.addEventListener('click', function() {
 				// Check input field is complete
 				if (searchLoanByBookInput.value) {
 					 // Display Results Field
	 				showFlexDisplay(resultsField);
	 				// Change results header
	 				changeResultsHeader("User");
	 				// Make request to get all Loans
	 				axios.get(loanUrl)
	 				.then(function(res) {
	 					// Hide Parent Section
	 					hideElement(searchLoanSection);
						// Declare Counter Object to count number of results
						let counter = 0;
	 					// Loop through loans and render reponse if book id matches input box
	 					Object.keys(res.data).forEach(function(key) {
	 						if (res.data[key].BookId == searchLoanByBookInput.value) {
	 							// Declare URL
	 							const userLoaningBookUrl = encodeURI(url + 'users/' +  res.data[key].UserId);
	 							// Make request
	 							getFromServer(userLoaningBookUrl, renderSearchResponse, "Users");
	 							// increment counter 
	 							counter = counter + 1;
	 						}
	 					})
	 					// If counter = 0 - display response message "No results"
	 					if (counter === 0) {
	 						showFlexDisplay(responseMessageSection);
							displayMessage("Your search returned no results");
							hideElement(searchLoanSection);
	 					}
	 				})
 				} else {
 					alert("Please enter a search query");
 				}
 			})
 			// Search Loan By Book Title
		} else if (chooseHowToSearchMenu.value === "BOOK TITLE") {
			// Create Form to search by Book Title
			createForm(searchLoanSection, ["Enter the Book's Title: "], "search-loan-by-book-title-input", "sub-search-loan-by-book-title-button", 1, "To get the User loaning a Book, enter the Title of the Book in the box below");
			// Save DOM variables to make request
			const submitSearchLoanByBookTitleButton = document.querySelector("#sub-search-loan-by-book-title-button");
			const searchLoanByBookTitleInput = document.querySelector("#search-loan-by-book-title-input");
			// Add Event Listener to submit search by book title button
			submitSearchLoanByBookTitleButton.addEventListener('click', function() {
				// Check input field is complete 
				if (searchLoanByBookTitleInput.value) {
					// Display Results Field
	 				showFlexDisplay(resultsField);
	 				// Change results header
	 				changeResultsHeader("User");
	 				// Make request to get Loans by Book Title 
	 				const loanBookTitleUrl = encodeURI(url + "loansbybooktitle/" + searchLoanByBookTitleInput.value);
	 				axios.get(loanBookTitleUrl)
	 				.then(function(res) {
	 					// Hide Parent Section
	 					hideElement(searchLoanSection);
	 					// Only complete second request if status code is 200
	 					if (res.status === 200) {
		 					// Declare Counter Object to count number of results
							let counter = 0;
							Object.keys(res.data).forEach(function(key) {
								// Declare URL
								const userLoaningBookUrl = encodeURI(url + 'users/' + res.data[key].UserId);
								// Make requst
								getFromServer(userLoaningBookUrl, renderSearchResponse, "Users");
								counter = counter + 1;
							})
							// If counter = 0 - display response message "No results"
							if (counter === 0) {
								showFlexDisplay(responseMessageSection);
								displayMessage("Your search returned no results");
								hideElement(searchLoanSection);
							}
							// If res.status is 204 ("No Content") display response message "No results"
	 					} else if (res.status === 204) {
							showFlexDisplay(responseMessageSection);
							displayMessage("Your request returned no results");
	 					} else {
	 						console.log(res);
	 					}
					})
				} else {
					alert("Please enter a search query");
				}

			})
		}
	})

})









