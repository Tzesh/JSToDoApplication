// JS Structure of JS ToDo Application
// github.com/Tzesh/JSToDoApplication

const form = document.querySelector('form');
const input = document.querySelector('#newTaskName');
const deleteAllButton = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let tasks;

// loading items
loadTasks();

// adding event listeners
eventListeners();

function loadTasks() {
    getTasksFromLS();
    if (tasks == null) return;
    tasks.forEach(function (item) {
        createTask(item);
    });
}

function getTasksFromLS() {
    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
}

function saveTasktoLS(text) {
    getTasksFromLS();
    tasks.push(text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTaskFromLS(text) {
    getTasksFromLS();
    tasks.forEach(function (task, index) {
        if (task == text) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function eventListeners() {
    // adding new item
    form.addEventListener('submit', addNewTask);

    // deleting an item with clicking X button next to item
    taskList.addEventListener('click', deleteTask);

    // deleting all items
    deleteAllButton.addEventListener('click', deleteAll);
}

function addNewTask(e) {
    if (input.value.trim() === '') {
        alert('Please provide a new task')
        e.preventDefault();
        return;
    }

    // creating task
    createTask(input.value);

    // saving task to LS
    saveTasktoLS(input.value);

    e.preventDefault();
}

function createTask(text) {
    // create li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    // create a
    const a = document.createElement('a');
    a.classList = 'delete-item float-end';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class = "fas fa-times text-dark"></i>';

    // appending a as a child of li
    li.appendChild(a);

    // adding li to task list
    taskList.appendChild(li);
}

function deleteTask(e) {
    if (e.target.className == 'fas fa-times text-dark') {
        if (confirm('Do you want to delete this task?')) {
            e.target.parentElement.parentElement.remove();

            // delete task from LS
            deleteTaskFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

function deleteAll(e) {
    if (confirm('Do you want to delete whole tasks?')) {
        while (taskList.firstChild) {
            deleteTaskFromLS(taskList.firstChild.textContent);
            taskList.removeChild(taskList.firstChild);
        }
    }
    e.preventDefault();
}