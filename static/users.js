//==================================================================================================================

// JS FOR USERS PAGE 

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
// Specific Selections From DOM users.html
//==================

// Main Nav Panel
const usersControlButton = document.querySelector('#users-control-button');

// Users Navigation area
const addUserSection = document.querySelector('#add-user-section');
const deleteUserSection = document.querySelector('#delete-user-section');
const updateUserSection = document.querySelector('#update-user-section');
const searchUserSection = document.querySelector('#search-user-section');

// Control Bar
const addUserButton = document.querySelector('#add-user-button');
const deleteUserButton = document.querySelector('#delete-user-button');
const updateUserButton = document.querySelector('#update-user-button');
const searchUserButton = document.querySelector('#search-user-button');


//=============================================
// SUMMON USERS ON PAGE ARRIVAL  (GET REQUEST & DISPLAY)
//=============================================
const summonAllUsersDisplay = function() {
	// Make get request to display Users 
	const getUsersUrl = url + 'users/';
	getFromServer(getUsersUrl, renderGetResponse, "Users");
	// Change results header
	changeResultsHeader("User");
};


summonAllUsersDisplay();

//=============================================
// EVENT LISTENERS FOR USERS BUTTON  (GET REQUEST & DISPLAY)
//=============================================

// To make get request
usersControlButton.addEventListener('click', function() {
	// Clear results container first
	clearContainer(resultsField);
	// Get All Users
	summonAllUsersDisplay();
})

// To change display
usersControlButton.addEventListener('click', function() {
	// Declare arrays to loop through containing DOM elements
	const flexArray = [searchArea, modifyArea, formModifyArea];
	const hideArray = [responseMessageSection, addUserSection, deleteUserSection, updateUserSection, searchUserSection, responseMessageSection, specificFormCreationArea];
	// Loop through and display elements correctly
	hideArray.forEach(function(item) {
		hideElement(item);
	})
	flexArray.forEach(function(item) {
		showFlexDisplay(item);
	})
	showFlexColumnDisplay(resultsField);
}) 


//=============================================
// ADD USER 
//=============================================

addUserButton.addEventListener('click', function() {
	// Display Elements
	const hideArray = [deleteUserSection, updateUserSection, searchUserSection, resultsField, resultsHeader, responseMessageSection];
	hideArray.forEach(function(item) {
		hideElement(item);
	})
	clearContainer(addUserSection);
	showFlexDisplay(addUserSection);
	// Call function to create the form
	createForm(addUserSection, ["Enter New User Name: ", "Enter User Barcode: ", "Enter User Member Type: "], "new-user-input", "sub-add-user-button", 3, "To add a User, enter a Name, Barcode and Member Type into the boxes below and click submit. <br> Please note that Member Type should be either 'Student' or 'Staff'.");
	// Save DOM variables neccessary to make request
	const submitNewUserButton = document.querySelector('#sub-add-user-button');
	const usernameInput = document.querySelector('#new-user-input');
	const barcodeInput = document.querySelector('#new-user-input-two');
	const membershipInput = document.querySelector('#new-user-input-three');
	// Declare users url
	const usersUrl = url + 'users/';
	// Make the request
	submitNewUserButton.addEventListener('click', function() {
		// Complete request only if all input boxes are complete
		if ((usernameInput.value) && (barcodeInput.value) && (membershipInput.value)) {
			// Check if Barcode Input is a number (false if just a number)
			var barcodeStringBool = isNaN(barcodeInput.value);
			// Complete request only if barcode is all numeric and 6 digits long and if member type is staff or student
			if ((barcodeStringBool === false) && (barcodeInput.value.length === 6) && (membershipInput.value === "Staff" || membershipInput.value === "Student")) {
				// Hide addUserSection 
				hideElement(addUserSection);
				// New User Object
				const newUser = {
					name: usernameInput.value,
					barcode: barcodeInput.value,
					memberType: membershipInput.value
				}
				// Call function to make the request
				addItemRequest("Users", usersUrl, addUserSection, newUser);
			} else {
				alert("A user's barcode should be 6 digits long and consist of only numbers. Member Type should be either 'Staff' or 'Student'");
			}

		} else {
			alert("Please Complete All Input Fields");
		}
	})
})



//=============================================
// DELETE USER 
//=============================================



deleteUserButton.addEventListener('click', function() {

	// Display Elements
	const hideArray = [addUserSection, updateUserSection, searchUserSection, resultsHeader, resultsField, responseMessageSection];
	hideArray.forEach(function(item) {
		hideElement(item);
	})
	clearContainer(deleteUserSection);
	showFlexDisplay(deleteUserSection);
	// Create Form to ask user if they want to delete by User ID, Name or Barcode
	// - Create the Grid Container
	const gridContainer = createPrelimSelectForm(["Choose How to Delete a User", "You can delete a User by entering the User's ID, NAME or BARCODE"], ["BY ID", "BY NAME", "BY BARCODE"]);
	deleteUserSection.appendChild(gridContainer);
	// Select elements from the DOM
	const startDeleteButton = document.querySelector('#prelim-form-submit-button');
	const chooseHowToDeleteUserMenu = document.querySelector('#prelim-select-option-menu');
	//Add Event Listener to start delete button to clear prelim form and create 
	startDeleteButton.addEventListener('click', function() {
		// Clear prelim form
		clearContainer(gridContainer);
		hideElement(gridContainer);
		// For deleting by ID
		if (chooseHowToDeleteUserMenu.value == "BY ID") {
			// Call Function to create the Form
			createForm(deleteUserSection, ["Enter the ID of the User you want to delete: "], "delete-user-input", "sub-delete-user-button", 1, "To delete a User, enter the User's ID into the box below and click submit. ");
			// Save DOM variables neccessary to make the request
			const submitDeleteUserByIdButton = document.querySelector('#sub-delete-user-button');
			const deleteUserIdInput = document.querySelector('#delete-user-input');
			// Make the request 
			submitDeleteUserByIdButton.addEventListener('click', function() {
				// Complete request only if all input boxes are complete 
				if (deleteUserIdInput.value) {
					// Hide deleteUserSection 
					hideElement(deleteUserSection);
					// Make Request
					const deleteUserByIdUrl = url + 'users/' + deleteUserIdInput.value;
					deleteItemRequest(deleteUserByIdUrl, deleteUserSection);
				} else {
					alert("Please Complete the Input Field");
				}
			})

		}
		// For deleting by Name
		else if (chooseHowToDeleteUserMenu.value == "BY NAME") {
			// Call Function to create the Form 
			createForm(deleteUserSection, ["Enter the Name of the User you want to delete: "], "delete-user-input", "sub-delete-user-button", 1, "To delete a User, enter the User's NAME into the box below and click submit. ");
			// Save DOM variables to make request
			const submitDeleteUserByNameButton = document.querySelector('#sub-delete-user-button');
			const deleteUserNameInput = document.querySelector('#delete-user-input');
			// Make the request 
			submitDeleteUserByNameButton.addEventListener('click', function() {
				// Complete request only if all input boxes are complete 
				if (deleteUserNameInput.value) {
					// Hide deleteUserSection 
					hideElement(deleteUserSection);
					// Make request
					const deleteUserByNameUrl = encodeURI(url + "username/" + deleteUserNameInput.value);
					deleteItemRequest(deleteUserByNameUrl, deleteUserSection);
				} else {
					alert("Please Complete the Input Field");
				}
			})
		}
		// For deleting by Barcode
		else if (chooseHowToDeleteUserMenu.value == "BY BARCODE") {
			// Call Function to create the Form 
			createForm(deleteUserSection, ["Enter the Barcode of the User you want to delete: "], "delete-user-input", "sub-delete-user-button", 1, "To delete a User, enter the User's BARCODE into the box below and click submit. ");
			// Save DOM variables to make request
			const submitDeleteUserByBarcodeButton = document.querySelector('#sub-delete-user-button');
			const deleteUserBarcodeInput = document.querySelector('#delete-user-input');
			// Make the request 
			submitDeleteUserByBarcodeButton.addEventListener('click', function() {
				// Complete request only if all input boxes are complete 
				if (deleteUserBarcodeInput.value) {
					// Hide deleteUserSection 
					hideElement(deleteUserSection);
					// Make request
					const deleteUserByBarcodeUrl = encodeURI(url + "userbarcode/" + deleteUserBarcodeInput.value);
					deleteItemRequest(deleteUserByBarcodeUrl, deleteUserSection);
				} else {
					alert("Please Complete the Input Field");
				}
			})
		}
	})

})



//=============================================
// UPDATE USER 
//=============================================


updateUserButton.addEventListener('click', function() {
	//Display Elements 
	const hideArray = [deleteUserSection, addUserSection, searchUserSection, resultsHeader, resultsField, responseMessageSection];
	hideArray.forEach(function(item) {
		hideElement(item);
	})
	// Reset and show update User Section
	clearContainer(updateUserSection);
	showFlexDisplay(updateUserSection);

	// Create Form to ask user if they want to update by User ID, Name or Barcode
	// - Create the Grid Container
	const gridContainer = createPrelimSelectForm(["Choose How to Update a User", "You can Update a User by entering the User's ID, NAME or BARCODE"], ["BY ID", "BY NAME", "BY BARCODE"]);
	updateUserSection.appendChild(gridContainer);
	// Select elements from the DOM
	const startUpdateButton = document.querySelector('#prelim-form-submit-button');
	const chooseHowToUpdateUserMenu = document.querySelector('#prelim-select-option-menu');

	// Add Event Listener to clear preliminary form and create form to make request
	startUpdateButton.addEventListener('click', function() {
		// Clear prelim form 
		clearContainer(gridContainer);
		hideElement(gridContainer);
		// Update by ID
		if (chooseHowToUpdateUserMenu.value == "BY ID") {
			// Call Function to create the form 
			createForm(updateUserSection, ['Enter the ID of the User: ', "Enter User Name: ", "Enter User Barcode: ", "Enter User Member Type: "], 'update-user-input', 'sub-update-user-button', 4, "To update a User, enter the User's ID followed by the new Name, Barcode and Member Type (Staff / Student). If you do not want to change the information - enter the existing information into the box.");
			// Save Dom variables neccessary to make the request
			const submitUpdateUserButton = document.querySelector('#sub-update-user-button');
			const updateUserIdInput = document.querySelector('#update-user-input');
			const usernameInput = document.querySelector('#update-user-input-two');
			const barcodeInput = document.querySelector('#update-user-input-three');
			const membershipInput = document.querySelector('#update-user-input-four');
			// Add Event Listener to submit update user button
			submitUpdateUserButton.addEventListener('click', function() {
				// Complete request only if all input boxes are complete 
				if ((membershipInput.value) && (barcodeInput.value) && (usernameInput.value) && (updateUserIdInput.value)) {
					// Check if Barcode Input is a number (false if just a number)
					var barcodeStringBool = isNaN(barcodeInput.value);
					// Complete request only if barcode is all numeric and 6 digits long and if member type is staff or student
					if ((barcodeStringBool === false) && (barcodeInput.value.length === 6) && (membershipInput.value === "Staff" || membershipInput.value === "Student")) {
						// Hide updateUserSection 
						hideElement(updateUserSection);
						// Make request
						const userUpdateUrl = url + 'users/' + updateUserIdInput.value;
						// Declare updated user object
						const updatedUser = {
							name: usernameInput.value,
							barcode: barcodeInput.value,
							memberType: membershipInput.value
						}
						// Make request
						updateItemRequest("User", userUpdateUrl, updateUserSection, updatedUser);
					} else {
						alert("A user's barcode should be 6 digits long and consist of only numbers. Member Type should be either 'Staff' or 'Student'");
					}
				} else {
					alert("Please Complete All Input Fields");
				}
			})
		}
		// For update user by Name
		else if (chooseHowToUpdateUserMenu.value == "BY NAME") {
			// Call Function to create the form 
			createForm(updateUserSection, ['Enter the Current Name of the User: ', "Enter New User Name: ", "Enter User Barcode: ", "Enter User Member Type: "], 'update-user-input', 'sub-update-user-button', 4, "To update a User, enter the User's Current Name followed by the new Name, Barcode and Member Type (Staff / Student). If you do not want to change the information - enter the existing information into the box.");
			// Save Dom variables neccessary to make the request
			const submitUpdateUserByNameButton = document.querySelector('#sub-update-user-button');
			const updateUserCurrentNameInput = document.querySelector('#update-user-input');
			const newUsernameInput = document.querySelector('#update-user-input-two');
			const barcodeInput = document.querySelector('#update-user-input-three');
			const membershipInput = document.querySelector('#update-user-input-four');
			// Add Event Listener to submit update user button
			submitUpdateUserByNameButton.addEventListener('click', function() {
				// Complete request only if all input boxes are complete 
				if ((membershipInput.value) && (barcodeInput.value) && (newUsernameInput.value) && (updateUserCurrentNameInput.value)) {
					// Check if Barcode Input is a number (false if just a number)
					var barcodeStringBool = isNaN(barcodeInput.value);
					// Complete request only if barcode is all numeric and 6 digits long and if member type is staff or student
					if ((barcodeStringBool === false) && (barcodeInput.value.length === 6) && (membershipInput.value === "Staff" || membershipInput.value === "Student")) {
						// Hide updateUserSection 
						hideElement(updateUserSection);
						// Make request
						const userUpdateByNameUrl = encodeURI(url + 'username/' + updateUserCurrentNameInput.value);
						// Save updated user object
						const updatedUser = {
							name: newUsernameInput.value,
							barcode: barcodeInput.value,
							memberType: membershipInput.value
						}
						updateItemRequest("User", userUpdateByNameUrl, updateUserSection, updatedUser);
					} else {
						alert("A user's barcode should be 6 digits long and consist of only numbers. Member Type should be either 'Staff' or 'Student'");
					}

				} else {
					alert("Please Complete All Input Fields");
				}
			})
		}
		// For updating user by barcode
		else if (chooseHowToUpdateUserMenu.value == "BY BARCODE") {
			// Call Function to create the form 
			createForm(updateUserSection, ['Enter the Current Barcode of the User: ', "Enter User Name: ", "Enter User Barcode: ", "Enter User Member Type: "], 'update-user-input', 'sub-update-user-button', 4, "To update a User, enter the User's Current Barcode followed by the new Name, Barcode and Member Type (Staff / Student). If you do not want to change the information - enter the existing information into the box.");
			// Save Dom variables neccessary to make the request
			const submitUpdateUserByBarcodeButton = document.querySelector('#sub-update-user-button');
			const updateUserCurrentBarcodeInput = document.querySelector('#update-user-input');
			const newUsernameInput = document.querySelector('#update-user-input-two');
			const barcodeInput = document.querySelector('#update-user-input-three');
			const membershipInput = document.querySelector('#update-user-input-four');
			// Add Event Listener to submit update user button
			submitUpdateUserByBarcodeButton.addEventListener('click', function() {
				// Complete request only if all input boxes are complete 
				if ((membershipInput.value) && (barcodeInput.value) && (newUsernameInput.value) && (updateUserCurrentBarcodeInput.value)) {
					// Check if Barcode Input is a number (false if just a number)
					var barcodeStringBool = isNaN(barcodeInput.value);
					// Complete request only if barcode is all numeric and 6 digits long and if member type is staff or student
					if ((barcodeStringBool === false) && (barcodeInput.value.length === 6) && (membershipInput.value === "Staff" || membershipInput.value === "Student")) {
						// Hide updateUserSection 
						hideElement(updateUserSection);
						// Make request
						const userUpdateByBarcodeUrl = encodeURI(url + 'userbarcode/' + updateUserCurrentBarcodeInput.value);
						// Save updated user object
						const updatedUser = {
							name: newUsernameInput.value,
							barcode: barcodeInput.value,
							memberType: membershipInput.value
						}
						updateItemRequest("User", userUpdateByBarcodeUrl, updateUserSection, updatedUser);
					} else {
						alert("A user's barcode should be 6 digits long and consist of only numbers. Member Type should be either 'Staff' or 'Student'");
					}

				} else {
					alert("Please Complete All Input Fields");
				}
			})
		}
	})
})


//=============================================
// SEARCH USERS
//=============================================

searchUserButton.addEventListener('click', function(){
	// Display Elements - Hide Elements 
	const hideArray = [deleteUserSection, updateUserSection, addUserSection, resultsHeader, responseMessageSection, resultsField];
	hideArray.forEach(function(item) {
		hideElement(item);
	})

	// Display Elements - Clear Containers
	const clearArray = [deleteUserSection, updateUserSection, addUserSection, searchUserSection, resultsField, resultsHeader];
	clearArray.forEach(function(item) {
		clearContainer(item);
	})

	showFlexColumnDisplay(searchUserSection);
	// Change Results Header
	changeResultsHeader("User");

	// ------
	// Create Form to ask user how they want to search users
	// - Create the Grid Container
	const gridContainer = createPrelimSelectForm(["Choose How to Search for a User", "You can Search Users by entering the User's ID, NAME, BARCODE or MEMBER TYPE"], ["ID", "NAME", "BARCODE", "MEMBER TYPE"]);
	searchUserSection.appendChild(gridContainer);
	// Select elements from the DOM
	const startSearchButton = document.querySelector('#prelim-form-submit-button');
	const chooseHowToSearchMenu = document.querySelector('#prelim-select-option-menu');

	// Add Event Listener to start
	startSearchButton.addEventListener('click', function() {
		// Hide prelim form section
		hideElement(gridContainer);
		// For Searches by ID
		if (chooseHowToSearchMenu.value === "ID") {
			// Call Function to Create Form to Search User By ID
			createForm(searchUserSection, ['Enter the ID of the User: '], "search-user-by-id-input", "sub-search-user-by-id-button", 1, "To Search User by ID, enter the User's ID in the Box Below");
			// Save DOM variables neccessary to make the request 
			const submitSearchUserByIdButton = document.querySelector('#sub-search-user-by-id-button');
			const searchUserInput = document.querySelector('#search-user-by-id-input');
			// Send the request
			submitSearchUserByIdButton.addEventListener('click', function() {
				// Complete request only if all input boxes are complete 
				if (searchUserInput.value) {
					// Hide searchUserSection 
					hideElement(searchUserSection);
					// Clear Results Field
					clearContainer(resultsField);
					// Make request
					const searchUserUrl = url + 'users/' + searchUserInput.value;
					getFromServer(searchUserUrl, renderSearchResponse, "Users");
				} else {
					alert("Please Enter a Search Query");
				}
			})

		}
		// For Searches by Name
		else if (chooseHowToSearchMenu.value === "NAME") {
			// Call Function to Create Form to Search User by Name
			createForm(searchUserSection, ["Enter the User's Name: "], "search-user-by-name-input", "sub-search-user-by-name-button", 1, "To Search User by Name, enter the User's Name in the Box Below");
			// Save DOM variables neccessary to make the request
			const submitSearchUserByNameButton = document.querySelector('#sub-search-user-by-name-button');
			const searchUserByNameInput = document.querySelector('#search-user-by-name-input');
			// Send the request
			submitSearchUserByNameButton.addEventListener('click', function() {
				// Complete request only if all input boxes are complete 
				if (searchUserByNameInput.value) {
					// Hide searchUserSection 
					hideElement(searchUserSection);
					// Clear Results Field
					clearContainer(resultsField);
					// Specify specific User url 
					const searchUserByNameUrl = encodeURI(url + 'search?type=user&name=' + searchUserByNameInput.value);
					// Make request
					getFromServer(searchUserByNameUrl, renderGetResponse, "Users");
				} else {
					alert("Please Enter a Search Query");
				}
			})

		}
		// For Searches by Barcode
		else if (chooseHowToSearchMenu.value === "BARCODE") {
			// Call Function to create form to search User by Barcode
			createForm(searchUserSection, ["Enter the User's Barcode: "], "search-user-by-barcode-input", "sub-search-user-by-barcode-button", 1, "To Search User by Barcode, enter the User's Barcode in the Box Below");
			// Save DOM variables neccessary to make the request
			const submitSearchUserByBarcodeButton = document.querySelector('#sub-search-user-by-barcode-button');
			const searchUserByBarcodeInput = document.querySelector('#search-user-by-barcode-input');
			// Send the request
			submitSearchUserByBarcodeButton.addEventListener('click', function() {
				// Complete request only if all input boxes are complete 
				if (searchUserByBarcodeInput.value) {
					// Hide searchUserSection 
					hideElement(searchUserSection);
					// Clear Results Field
					clearContainer(resultsField);
					// Specify Barcode URL
					const searchUserByBarcodeUrl = encodeURI(url + 'search?type=user&barcode=' + searchUserByBarcodeInput.value);
					// Make request
					getFromServer(searchUserByBarcodeUrl, renderGetResponse, "Users");

				} else {
					alert("Please Enter a Search Query");
				}
			})

		}
		// For Searches by Member Type
		else if (chooseHowToSearchMenu.value === "MEMBER TYPE") {
			// Call Function to create From to Search User By Member Type
			createForm(searchUserSection, ["Enter the User's Member Type: "], "search-user-by-member-type-input", "sub-search-user-by-member-type-button", 1, "To Search User by Member Type, enter either 'Student' or 'Staff' into the box below.");
			// Save DOM variables neccessary to make the request
			const submitSearchUserByMemberTypeButton = document.querySelector('#sub-search-user-by-member-type-button');
			const searchUserByMemberTypeInput = document.querySelector('#search-user-by-member-type-input');
			// Send the request
			submitSearchUserByMemberTypeButton.addEventListener('click', function() {
				// Complete request only if all input boxes are complete 
				if (searchUserByMemberTypeInput.value) {
					// Hide searchUserSection 
					hideElement(searchUserSection);
					// Clear Results Field
					clearContainer(resultsField);
					// Specify Member Type URL
					const searchUserByMemberTypeUrl = encodeURI(url + ('search?type=user&memberType=').toLowerCase() + searchUserByMemberTypeInput.value);
					console.log(searchUserByMemberTypeUrl);
					// Make request
					getFromServer(searchUserByMemberTypeUrl, renderGetResponse, "Users");

				} else {
					alert("Please Enter a Search Query");
				}
			})
		}
	})

})




