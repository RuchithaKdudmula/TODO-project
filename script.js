// DOM Elements
const input = document.querySelector('.input');
const addBtn = document.querySelector('.button');
const emptyText = document.querySelector('.empty-text');
const list = document.querySelector('.list');

let editingSpan = null;

// Load todos on page load
window.onload = loadTodos;

// Add / Update Todo
addBtn.addEventListener('click', () => {
  const todoText = input.value.trim();
  if (todoText === "") {
    alert("No task yet");
    return;
  }

  // UPDATE MODE
  if (editingSpan) {
    editingSpan.innerText = todoText;
    editingSpan = null;
    addBtn.innerText = "ADD";
    addBtn.classList.remove("update-btn");
    input.value = "";
    saveTodos();
    return;
  }

  // CREATE TODO
  createTodo(todoText, false);
  input.value = "";
  emptyText.style.display = "none";
  saveTodos();
});

// Create Todo Function
function createTodo(text, completed) {
  const li = document.createElement('li');
  let isCompleted = completed;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;

  const span = document.createElement('span');
  span.innerText = text;

  const editBtn = document.createElement('button');
  editBtn.innerText = 'Edit';
  editBtn.classList.add('edit-btn');

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';

  // Checkbox logic
  if (completed) {
    span.classList.add("completed");
    editBtn.disabled = true;
    deleteBtn.disabled = true;
  }

  checkbox.addEventListener('change', () => {
    isCompleted = checkbox.checked;
    if (isCompleted) {
      span.classList.add("completed");
      editBtn.disabled = true;
      deleteBtn.disabled = true;
    } else {
      span.classList.remove("completed");
      editBtn.disabled = false;
      deleteBtn.disabled = false;
    }
    saveTodos();
  });

  // Edit logic
  editBtn.addEventListener('click', () => {
    if (isCompleted) return;
    input.value = span.innerText;
    input.focus();
    editingSpan = span;
    addBtn.innerText = "Update";
    addBtn.classList.add("update-btn");
  });

  // Delete logic
  deleteBtn.addEventListener('click', () => {
    if (isCompleted) return;
    li.remove();
    saveTodos();
    if (list.children.length === 0) {
      emptyText.style.display = "block";
    }
  });

  li.append(checkbox, span, editBtn, deleteBtn);
  list.appendChild(li);
}

// Save Todos
function saveTodos() {
  const todos = [];
  document.querySelectorAll('.list li').forEach(li => {
    todos.push({
      text: li.querySelector('span').innerText,
      completed: li.querySelector('input').checked
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Load Todos
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  if (todos.length === 0) {
    emptyText.style.display = "block";
  }
  todos.forEach(todo => createTodo(todo.text, todo.completed));
}
document.addEventListener('keydown', (e) => {

  //Keyboard support
  if (e.key === "Enter") {
    addBtn.click();
  }
  if (e.key === "Escape" && editingSpan) {
    editingSpan = null;
    input.value = "";
    addBtn.innerText = "ADD";
    addBtn.classList.remove("update-btn");
  }

});

