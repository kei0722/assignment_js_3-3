'use strict';

const todoList = [];

document.getElementById('add-btn').addEventListener('click', () => {

	let inputValue = document.getElementById('input-task').value;

	if (inputValue === '') {
		return;
	}

	const tr = document.createElement('tr');
	const statusButton = document.createElement('button');
	const deleteButton = document.createElement('button');
	const tbody = document.querySelector('tbody');

	let todoListId = todoList.length;

	const todo = {
		id: todoListId,
		comment: inputValue,
		status: ['作業中', '完了'],
		deleteBtn: '削除',
	};

	function showTodoList() {
		for (let i = 0; i < todoList.length; i++) {
			todoList[i].id = i;
			tbody.children[i].children[0].textContent = i;
			tbody.children[i].children[1].textContent = todoList[i].comment;
		}
	}

	function showButton() {
		for (let i = 0; i < todoList.length; i++) {
			statusButton.textContent = todoList[i].status[0];
			statusButton.className = 'working-button';
			tbody.children[i].children[2].appendChild(statusButton);
			deleteButton.textContent = todoList[i].deleteBtn;
			deleteButton.className = 'delete-button';
			tbody.children[i].children[3].appendChild(deleteButton);
		}
	}

	todoList.push(todo);

	for (let i = 0; i < Object.keys(todo).length; i++) {
		const td = document.createElement('td');
		tbody.appendChild(tr).appendChild(td);
	}
	
	showTodoList();
	
	showButton();

	document.getElementById('input-task').value = '';

	statusButton.addEventListener('click', e => {
		let index = Number(e.target.closest('tr').children[0].textContent);
		if (e.target.classList.contains('working-button')) {
			e.target.textContent = todoList[index].status[1];
			e.target.className = 'done-button';
		} else if (e.target.classList.contains('done-button')) {
			e.target.textContent = todoList[index].status[0];
			e.target.className = 'working-button';
		}
	});

	deleteButton.addEventListener('click', e => {
		todoList.splice(Number(e.target.closest('tr').children[0].textContent), 1);
		tbody.removeChild(e.target.closest('tr'));
		showTodoList();
	});

});