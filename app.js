// App data stored in localStorage
const todoList = JSON.parse(localStorage.getItem("todos")) || [];

// DOM elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoListContainer = document.getElementById("todo-list");

// Event listeners
todoForm.addEventListener("submit", addTodo);
document.addEventListener("DOMContentLoaded", loadTodos);

// Add Todo
function addTodo(e) {
  e.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText === "") return;

  const newTodo = {
    id: Date.now(),
    text: todoText,
    completed: false,
  };

  todoList.push(newTodo);
  saveTodos();
  renderTodos();
  todoInput.value = "";
}

// Load Todos from localStorage
function loadTodos() {
  renderTodos();
}

// Render Todos
function renderTodos() {
  todoListContainer.innerHTML = "";
  todoList.forEach((todo) => {
    const todoElement = document.createElement("div");
    todoElement.classList.add("todo-item");
    if (todo.completed) {
      todoElement.classList.add("completed");
    }

    todoElement.innerHTML = `
            <div class="todo-item-left">
                <button onclick="toggleComplete(${todo.id})">✓ </button>
                <span class="todo-text" onclick="editTodo(${todo.id})">${todo.text}</span>
            </div>
            <div>
                
                <button onclick="editTodo(${todo.id})">✏️ |</button>
                <button onclick="deleteTodo(${todo.id})">🗑️</button>
            </div>
        `;
    todoListContainer.appendChild(todoElement);
  });
}

// Toggle Todo Completion
function toggleComplete(id) {
  const todo = todoList.find((todo) => todo.id === id);
  todo.completed = !todo.completed;
  saveTodos();
  renderTodos();
}

// Delete Todo
function deleteTodo(id) {
  const todoIndex = todoList.findIndex((todo) => todo.id === id);
  todoList.splice(todoIndex, 1);
  saveTodos();
  renderTodos();
}

// Edit Todo
function editTodo(id) {
  const todo = todoList.find((todo) => todo.id === id);
  const newText = prompt("Edit your todo:", todo.text);

  if (newText && newText.trim() !== "") {
    todo.text = newText.trim();
    saveTodos();
    renderTodos();
  }
}

// Save Todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todoList));
}
