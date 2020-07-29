'use strict';

const todoList = [];

const tbody = document.querySelector('tbody');

const todoListId = todoList.length;

function showTodoList() {
	for (let i = 0; i < todoList.length; i++) {
		todoList[i].id = i;
		tbody.children[i].children[0].textContent = i;
		tbody.children[i].children[1].textContent = todoList[i].comment;
	}
}

function showButton() {
	const statusButton = document.createElement('button');
	const deleteButton = document.createElement('button');

	for (let i = 0; i < todoList.length; i++) {
		statusButton.textContent = todoList[i].status;
		statusButton.className = 'working-button';
		tbody.children[i].children[2].appendChild(statusButton);
		deleteButton.textContent = todoList[i].deleteBtn;
		deleteButton.className = 'delete-button';
		tbody.children[i].children[3].appendChild(deleteButton);
	}

	statusButton.addEventListener('click', e => {
		if (e.target.classList.contains('working-button')) {
			e.target.textContent = '完了';
			e.target.className = 'done-button';
		} else if (e.target.classList.contains('done-button')) {
			e.target.textContent = '作業中';
			e.target.className = 'working-button';
		}
	});

	deleteButton.addEventListener('click', e => {
		todoList.splice(Number(e.target.closest('tr').children[0].textContent), 1);
		tbody.removeChild(e.target.closest('tr'));
		showTodoList();
	});
}

document.getElementById('add-btn').addEventListener('click', () => {

	const inputValue = document.getElementById('input-task').value;

	if (inputValue === '') {
		return;
	}

	const tr = document.createElement('tr');

	const todo = {
		id: todoListId,
		comment: inputValue,
		status: '作業中',
		deleteBtn: '削除',
	};

	todoList.push(todo);

	for (let i = 0; i < Object.keys(todo).length; i++) {
		const td = document.createElement('td');
		tbody.appendChild(tr).appendChild(td);
	}

	showTodoList();
	showButton();

	document.getElementById('input-task').value = '';

});