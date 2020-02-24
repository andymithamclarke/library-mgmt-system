//==================================================================================================================

// * UTILITY FUNCTIONS TO CREATE FORMS & POST REQUEST BUTTON 

//==================================================================================================================

//====================
// Imports
//====================

// Import from requests.js
import { url, getFromServer, addItemRequest, getAllLoansReturnBookId } from "./requests.js";

// Import from changedisplay.js
import { resultsField, resultsHeader, specificFormCreationArea, specificFormTitle, specificFormInput, navSection, responseMessageSection, searchArea, modifyArea, formModifyArea, clearContainer, showResultsHeader, createNewResultContainer, createNewResultItemContainer, hideElement, showFlexDisplay, showFlexColumnDisplay, showInlineBlockDisplay, createNewResultHeaderContainer, changeResultsHeader, createSeeMoreButton, displayMessage} from "./changedisplay.js";

// Import from render.js
import { renderGetResponse, renderSearchResponse, renderAllEntitiesResponse } from "./render.js";

//====================
// Create Form with Option to Select How to (Search / Delete / Update) 
//====================

export const createPrelimSelectForm = function(instructionArray, selectHTMLArray) {
	// Create Form to ask user if they want to delete by Author ID or Author Name
	// - Create the Grid Container
	const gridContainer = document.createElement('div');
	gridContainer.className = "form-section-container";
	// Create Instructions Elements
	const chooseHowToDeleteInstruction = document.createElement('p');
	const chooseHowToDeleteDetailedInstructions = document.createElement('p');
	chooseHowToDeleteInstruction.innerHTML = instructionArray[0];
	chooseHowToDeleteInstruction.className = "instruction-text col-row-1-2 ";
	chooseHowToDeleteDetailedInstructions.innerHTML = instructionArray[1];
	chooseHowToDeleteDetailedInstructions.className = "instruction-text-small col-row-2-3"; 
	// Create Select Dropdown Menu
	const selectMenu = document.createElement('select');
	selectMenu.id = "prelim-select-option-menu";
	selectMenu.className = "grey-box row-3-col-2";
	// Create Start Search Button 
	const startButton = document.createElement('button');
	startButton.id = "prelim-form-submit-button";
	startButton.className = "grey-box row-3-col-6";
	startButton.innerHTML = "GO!";
	// Specify inner HTML of Options; Loop through array in function params and create new option element for each item 
	let counter = 0;
	selectHTMLArray.forEach(function(item){
		let option = document.createElement('option');
		option.innerHTML = selectHTMLArray[counter];
		selectMenu.appendChild(option);
		counter = counter + 1;
	})
	// Append to parent sections
	gridContainer.appendChild(selectMenu);
	gridContainer.appendChild(startButton);
	gridContainer.appendChild(chooseHowToDeleteInstruction);
	gridContainer.appendChild(chooseHowToDeleteDetailedInstructions);
	// return prelim form 
	return gridContainer
}


//====================
// Create Form with Inputs to Make Request
//====================


export const createForm = function(parentElement, labelMessage, inputBoxId, submitItemButtonId, number, instructionText) {
	// Create Basic Elements required to produce form 
	const sectionContainer = document.createElement("div");
	const instructionTextContainer = document.createElement('p');
	const newInputLabel = document.createElement("label");
	const newInputBox = document.createElement("input");
	const submitItemButton = document.createElement("button");
	// Specify class name, inner html & id of these elements
	submitItemButton.id = submitItemButtonId;
	submitItemButton.innerHTML = "Submit";
	newInputBox.id = inputBoxId;
	newInputBox.className = "form-search-bar row-2-col-3-8";
	newInputBox.type = "text";
	newInputLabel.innerHTML = labelMessage[0];
	newInputLabel.for = inputBoxId;
	newInputLabel.className = "row-2-col-1-4 label-text";
	instructionTextContainer.innerHTML = instructionText;
	instructionTextContainer.className = "col-row-1-2 instruction-text";
	// append to appropriate containers
	sectionContainer.appendChild(instructionTextContainer);
	sectionContainer.appendChild(newInputBox);
	sectionContainer.appendChild(newInputLabel);
	if (number === 2) {
		//Second Input 
		const newSecondInputLabel = document.createElement("label");
		const newSecondInputBox = document.createElement("input");
		newSecondInputBox.id = inputBoxId + "-two";
		newSecondInputBox.className = "form-search-bar row-3-col-3-8";
		newSecondInputBox.type = "text";
		newSecondInputLabel.innerHTML = labelMessage[1];
		newSecondInputLabel.for = inputBoxId + "-two";
		newSecondInputLabel.className = "row-3-col-1-4 label-text";
		sectionContainer.appendChild(newSecondInputBox);
		sectionContainer.appendChild(newSecondInputLabel);
		// Class name of submit Item Button
		submitItemButton.className = "grey-box row-4-col-4 submit-button";
	}
	else if (number === 3) {
		//Second Input 
		const newSecondInputLabel = document.createElement("label");
		const newSecondInputBox = document.createElement("input");
		newSecondInputBox.id = inputBoxId + "-two";
		newSecondInputBox.className = "form-search-bar row-3-col-3-8";
		newSecondInputBox.type = "text";
		newSecondInputLabel.innerHTML = labelMessage[1];
		newSecondInputLabel.for = inputBoxId + "-two";
		newSecondInputLabel.className = "row-3-col-1-4 label-text";
		sectionContainer.appendChild(newSecondInputBox);
		sectionContainer.appendChild(newSecondInputLabel);
		//Third Input
		const newThirdInputLabel = document.createElement("label");
		const newThirdInputBox = document.createElement("input");
		newThirdInputBox.id = inputBoxId + "-three";
		newThirdInputBox.className = "form-search-bar row-4-col-3-8";
		newThirdInputBox.type = "text";
		newThirdInputLabel.innerHTML = labelMessage[2];
		newThirdInputLabel.for = inputBoxId + "-three";
		newThirdInputLabel.className = "row-4-col-1-4 label-text";
		sectionContainer.appendChild(newThirdInputBox);
		sectionContainer.appendChild(newThirdInputLabel);
		// Class name of submit Item Button
		submitItemButton.className = "grey-box row-5-col-4 submit-button";
	}
	else if (number === 4) {
		//Second Input 
		const newSecondInputLabel = document.createElement("label");
		const newSecondInputBox = document.createElement("input");
		newSecondInputBox.id = inputBoxId + "-two";
		newSecondInputBox.className = "form-search-bar row-3-col-3-8";
		newSecondInputBox.type = "text";
		newSecondInputLabel.innerHTML = labelMessage[1];
		newSecondInputLabel.for = inputBoxId + "-two";
		newSecondInputLabel.className = "row-3-col-1-4 label-text";
		sectionContainer.appendChild(newSecondInputBox);
		sectionContainer.appendChild(newSecondInputLabel);
		//Third Input
		const newThirdInputLabel = document.createElement("label");
		const newThirdInputBox = document.createElement("input");
		newThirdInputBox.id = inputBoxId + "-three";
		newThirdInputBox.className = "form-search-bar row-4-col-3-8";
		newThirdInputBox.type = "text";
		newThirdInputLabel.innerHTML = labelMessage[2];
		newThirdInputLabel.for = inputBoxId + "-three";
		newThirdInputLabel.className = "row-4-col-1-4 label-text";
		sectionContainer.appendChild(newThirdInputBox);
		sectionContainer.appendChild(newThirdInputLabel);
		//Fourth Input
		const newFourthInputLabel = document.createElement("label");
		const newFourthInputBox = document.createElement("input");
		newFourthInputBox.id = inputBoxId + "-four";
		newFourthInputBox.className = "form-search-bar row-5-col-3-8";
		newFourthInputBox.type = "text";
		newFourthInputLabel.innerHTML = labelMessage[3];
		newFourthInputLabel.for = inputBoxId + "-four";
		newFourthInputLabel.className = "row-5-col-1-4 label-text";
		sectionContainer.appendChild(newFourthInputBox);
		sectionContainer.appendChild(newFourthInputLabel);
		// Class name of submit Item Button
		submitItemButton.className = "grey-box row-6-col-4 submit-button";
	}
	// Specify class names if only one input box
	if (number === 1) {
		sectionContainer.className = "single-input-form-container";
		submitItemButton.className = "grey-box row-3-col-4 submit-button";
	} else {
		sectionContainer.className = "form-section-container";
	}
	// Append to parent sections
	sectionContainer.appendChild(submitItemButton);
	parentElement.appendChild(sectionContainer);
}




//=============================================
// POST REQUEST BUTTON 
//=============================================


export const createSpecificItemPostRequestButton = function(type, buttonText, objectKey) {
	// Create a button to add extra Post Functionality to each result container
	const postToThisItemButton = document.createElement("button");
	// Set class name & inner html of button
	postToThisItemButton.className = "post-button col-8-9";
	postToThisItemButton.innerHTML = buttonText;

	// Add Event Listener
	postToThisItemButton.addEventListener('click', function() {
		// Hide Elements 
		const hideElementArray = [resultsField, resultsHeader, searchArea, modifyArea, formModifyArea];
		hideElementArray.forEach(function(item) {
			hideElement(item);
		})
		// Show Form Creation Area
		showFlexDisplay(specificFormCreationArea);
		// Create Text Containers for title and Instructions
		const newLabelTextContainer = createNewResultItemContainer();
		const newInstructionTextContainer = createNewResultItemContainer();
		newInstructionTextContainer.className = "instruction-text";
		newLabelTextContainer.className = "instruction-text";
		// Check for types
		// Author
		if (type === "Author") {

			// Specify the inner Html of these text containers
			newInstructionTextContainer.innerHTML = "Either enter the Book's Title AND the ISBN number to add this author to a new book <br> OR  <br> Enter the Book's ID to add this author to an existing book";
			newLabelTextContainer.innerHTML = "Add a New Book by " + objectKey.name;
			// Create a form to add a NEW book
			createForm(specificFormInput, ["Title", "Isbn"], "add-book-by-object-input", "sub-add-book-by-object", 2, "Enter the Title & ISBN of the Book to add this Author to that Book - If the Book doesn't exist a new Book will be created.");
			specificFormTitle.appendChild(newLabelTextContainer);
			specificFormTitle.appendChild(newInstructionTextContainer);
			// Create a form to add author to existing book
			createForm(specificFormInput, ["ID"], "add-book-by-id-input", "sub-add-book-by-id", 1, "Enter the Book's ID to add the Author to that Book.");
			// Select elements neccessary to make post request 
			const submitAddBookByObjectButton = document.querySelector('#sub-add-book-by-object');
			const submitAddBookByIdButton = document.querySelector('#sub-add-book-by-id');
			const addBookByObjectInputTitle = document.querySelector('#add-book-by-object-input');
			const addBookByObjectInputIsbn = document.querySelector('#add-book-by-object-input-two');
			const addBookByIdInput = document.querySelector('#add-book-by-id-input');
			// Add Event Listener to submit new book button
			submitAddBookByObjectButton.addEventListener('click', function(){
				// Complete Request Only if all input forms have been entered 
				if ((addBookByObjectInputTitle.value) && (addBookByObjectInputIsbn.value)) {
					// Check if Barcode Input is a number (false if just a number)
					var isbnStringBool = isNaN(addBookByObjectInputIsbn.value);
					if (isbnStringBool === false) {
						// Specify Book post Url 
						const postNewBookUrl = url + "authors/" + objectKey.id.toString() + "/books";
						// Create new book object
						const newBookToPost = {
							bookTitle: addBookByObjectInputTitle.value,
		    				bookISBN: addBookByObjectInputIsbn.value
						}
						// Make request
						addItemRequest("Relationship", postNewBookUrl, specificFormCreationArea, newBookToPost);
					// If ISBN is not a number display alert
					} else {
						alert("ISBN should be a number")
					}
				} else {
					alert("Please Complete all Input Fields");
				}
			})
			// Add by ID
			submitAddBookByIdButton.addEventListener('click', function() {
				// Complete Request Only if all input forms have been entered 
				if (addBookByIdInput.value) {
					const addBookByIdUrl = url + "authors/" + objectKey.id +"/books/" + addBookByIdInput.value;
					addItemRequest("newRelationship", addBookByIdUrl, specificFormCreationArea);
				} else {
					alert("Please Complete all Input Fields");
				}			

			})
		}
		// For Books
		else if (type === "Book") {
			// Specify the inner Html of these text containers
			newLabelTextContainer.innerHTML = "Add an Author to: " + objectKey.title;
			newInstructionTextContainer.innerHTML = "To add an Author to this Book either enter the Author's Name <br> OR  <br> Enter the Author's ID";
			// Create a form for entering Author's Name
			createForm(specificFormInput, ["Author's Name: "], "add-new-author-by-name-input", "sub-new-author-by-name", 1, "Enter the name of the Author. If the Author doesn't exist - a new Author will be created");
			specificFormTitle.appendChild(newLabelTextContainer);
			specificFormTitle.appendChild(newInstructionTextContainer);
			// Create a form to add Author By ID
			createForm(specificFormInput, ["ID"], "add-new-author-by-id-input", "sub-add-new-author-by-id", 1, "Enter the ID of the Author");
			// Select elements neccessary to make post request 
			const submitAddAuthorByNameButton = document.querySelector('#sub-new-author-by-name');
			const submitAddAuthorByIdButton = document.querySelector('#sub-add-new-author-by-id');
			const addNewAuthorInputName = document.querySelector('#add-new-author-by-name-input');
			const addNewAuthorInputId = document.querySelector('#add-new-author-by-id-input');
			// Add Event Listener to submit by name 
			submitAddAuthorByNameButton.addEventListener('click', function() {
				// Complete Request Only if all input forms have been entered
				if (addNewAuthorInputName.value) {
					// Specify post Author by name url 
					const postAuthorByNameUrl = url + "books/" + objectKey.id.toString() +"/authors";
					const authorToPost = {
						name: addNewAuthorInputName.value
					}
					// Make request
					addItemRequest("Relationship", postAuthorByNameUrl, specificFormCreationArea, authorToPost);
				} else {
					alert("Please Complete all Input Fields");
				}

			})
			// Event Listener to submit by Id
			submitAddAuthorByIdButton.addEventListener('click', function() {
				// Complete Request Only if all input forms have been entered
				if (addNewAuthorInputId.value) {
					// Declare URL and make request
					const postAuthorByIdUrl = url + "books/" + objectKey.id.toString() +"/authors/" + addNewAuthorInputId.value;
					addItemRequest("newRelationship", postAuthorByIdUrl, specificFormCreationArea);
				} else {
					alert("Please Complete all Input Fields");
				}
					
			})
		}
 		// For Users
		else if (type === "Users") {
			// Hide Navigation Section to force user to reload page
			hideElement(navSection);
			// Create instructions & Label
			newLabelTextContainer.innerHTML = "Add a Loan for: " + objectKey.name;
			newInstructionTextContainer.innerHTML = "To add a Loan for this User enter a Due Date <br> AND <br> Enter the Books ID";
			// Append to specific form Title area
			specificFormTitle.appendChild(newLabelTextContainer);
			specificFormTitle.appendChild(newInstructionTextContainer);
			// Create a form for entering new Loan
			createForm(specificFormInput, ["Due Date: ", "Book ID:"], "add-new-loan-input", "sub-add-new-loan", 2, "To Add a Loan for this User, Enter a Due Date for the Loan (YYYY-MM-DD), followed by the ID of the Book the User will Loan.");
			// Select elements neccessary to make post request 
			const submitAddNewLoanButton = document.querySelector('#sub-add-new-loan');
			const addNewLoanDueDateInput = document.querySelector('#add-new-loan-input');
			const addNewLoanBookIdInput = document.querySelector('#add-new-loan-input-two');
			const loanedBooksArray = getAllLoansReturnBookId();
			// Add Event Listener to submit new loan
			submitAddNewLoanButton.addEventListener('click', function() {
				// Complete Request Only if all input forms have been entered
				if ((addNewLoanDueDateInput.value) && (addNewLoanBookIdInput.value)) {
					// Create a counter to increment if bookIDinput is equal to item in loaned books array
					let counter = 0;
					// Loop through Loaned Books Array and check if input value is equal to already loaned book id
					loanedBooksArray.forEach(function(item) {
						if (item == addNewLoanBookIdInput.value) {
							counter = counter + 1;
						} else {counter}
					})
					// Only make request if counter == 0
					if (counter === 0) {
						const postNewLoanUrl = encodeURI(url + "users/" + (objectKey.id).toString() + '/loans/' + addNewLoanBookIdInput.value);
						const newLoan = {
							dueDate: addNewLoanDueDateInput.value
						}
						// Make request
						addItemRequest("Relationship", postNewLoanUrl, specificFormCreationArea, newLoan);
					} else {
						// Display message stating "Book is already on loan"
						showInlineBlockDisplay(responseMessageSection);
						hideElement(specificFormCreationArea);
						displayMessage('This Book is already on Loan');				
					}	
				} else {
					alert("Please Complete all Input Fields");
				}				
			})

		}
	})
	return postToThisItemButton
}



