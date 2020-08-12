const inputField = document.getElementById('create_todo');
const createButton = document.getElementById('create_btn');
const save = document.getElementById('save');

const todoUL = document.getElementById('todo_items');

const getButton = (text, id) => {
	let button = document.createElement('button');
	button.textContent = text;
	button.id = id;
	return button;
};

const getListCount = () => todoUL.childNodes.length;

const createListItem = (id, className = 'todoItem') => {
	const listItem = document.createElement('li');
	listItem.id = id;
	listItem.className = className;
	return listItem;
};

const createInputField = (text) => {
	const listItemInput = document.createElement('input');
	listItemInput.value = text;
	return listItemInput;
};

const createListItemEntry = (nodeContainer, element) => {
	return nodeContainer.appendChild(element);
};

// Creates the todo list
createButton.addEventListener('click', () => {
	let id = getListCount();
	const listItem = createListItem(id);

	let todoText = inputField.value;
	if (todoText) {
		const listItemInput = createInputField(todoText);

		const upButton = getButton('Up', 'up');
		const downButton = getButton('Down', 'down');
		const deleteButton = getButton('Delete', 'delete');

		createListItemEntry(listItem, listItemInput);
		createListItemEntry(listItem, upButton);
		createListItemEntry(listItem, downButton);
		createListItemEntry(listItem, deleteButton);

		createListItemEntry(todoUL, listItem);
		inputField.value = '';
	}
});

// Move element up in list
const upListElementHandler = (event) => {
	let currentNode = event.target.parentNode;
	let parentContainer = currentNode.parentNode;

	let previousNode = currentNode.previousElementSibling;
	if (previousNode) {
		parentContainer.insertBefore(currentNode, previousNode);
	}
};

const downElementHandler = (event) => {
	let currentNode = event.target.parentNode;
	let parentContainer = currentNode.parentNode;

	let nextNode = currentNode.nextElementSibling;
	if (nextNode) {
		parentContainer.insertBefore(nextNode, currentNode);
	}
};

const deleteElementHandler = (event) => {
	let contentNode = event.target.parentNode;
	contentNode.remove();
};

todoUL.addEventListener('click', (event) => {
	const buttonClicked = event.target.id;
	if (buttonClicked === 'up') {
		upListElementHandler(event);
	} else if (buttonClicked === 'down') {
		downElementHandler(event);
	} else if (buttonClicked === 'delete') {
		deleteElementHandler(event);
	}
});

// Save todo list to local storage

const saveChangesHandler = () => {
	localStorage.clear();
	let inputElements = todoUL.getElementsByTagName('input');

	let todosForStorage = [];
	for (let i = 0; i < inputElements.length; i++) {
		todosForStorage.push({ id: inputElements[i].parentNode.id, value: inputElements[i].value });
	}

	todosForStorage.forEach((element) => {
		localStorage.setItem(element.id, element.value);
	});
};

save.addEventListener('click', () => {
	saveChangesHandler();
});

// Rebuild the list from local storage
window.addEventListener('load', () => {
	Object.keys(localStorage).forEach((value) => {
		let id = value;
		// grab what's in the local storage
		let theItem = localStorage.getItem(value);
		const listItem = createListItem(id);

		// Create list item and buttons
		const listItemInput = createInputField(theItem);

		const upButton = getButton('Up', 'up');
		const downButton = getButton('Down', 'down');
		const deleteButton = getButton('Delete', 'delete');

		createListItemEntry(listItem, listItemInput);
		createListItemEntry(listItem, upButton);
		createListItemEntry(listItem, downButton);
		createListItemEntry(listItem, deleteButton);

		createListItemEntry(todoUL, listItem);
	});
});

window.addEventListener('unload', () => {
	saveChangesHandler();
});
