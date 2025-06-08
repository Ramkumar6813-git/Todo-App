document.addEventListener("DOMContentLoaded", function () {
  function loadTodos() {
    let storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    storedTodos.forEach((todo) => addTodoItem(todo));
  }

  const formEl = document.querySelector(".todo-form");
  const formBtn = document.querySelector(".form-btn");
  const todoList = document.querySelector(".todo-list");
  const todoInput = document.querySelector(".todo-input");

  let editMode = false;
  let editItem = null;

  function saveTodos() {
    let todos = [];
    let todoItems = document.querySelectorAll(".todo-list li");
    todoItems.forEach((todo) => {
      todos.push(todo.firstChild.textContent);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    const todoInputValue = todoInput.value.trim();

    if (todoInputValue !== "") {
      if (editMode) {
        editItem.firstChild.textContent = todoInputValue;
        formBtn.textContent = "Add Todo";
        todoInput.value = "";
        saveTodos();
        editMode = false;
        editItem = null;
      } else {
        addTodoItem(todoInputValue);
      }

      saveTodos();
      todoInput.value = "";
    } else {
      alert("Enter a valid input");
    }
  });

  todoList.addEventListener("click", function (e) {
    let target = e.target;
    if (target.tagName === "BUTTON") {
      let todoItem = target.parentNode;
      if (target.innerText === "❌") {
        todoItem.remove();
        saveTodos();
      } else if (target.innerText === "✏️") {
        editMode = true;
        editItem = todoItem;
        formBtn.textContent = "Edit Todo";
        todoInput.value = todoItem.firstChild.textContent;
        todoInput.focus();
      }
    }
  });

  function addTodoItem(todoText) {
    const todoItem = document.createElement("li");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    todoItem.innerHTML = `<span>${todoText}</span>`;
    editBtn.innerText = "✏️";
    deleteBtn.innerText = "❌";

    todoItem.appendChild(editBtn);
    todoItem.appendChild(deleteBtn);

    todoList.appendChild(todoItem);
  }

  loadTodos(); // Load stored todos on page load
});
