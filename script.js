document.addEventListener("DOMContentLoaded", function () {
  const formEl = document.querySelector(".todo-form");
  const formBtn = document.querySelector(".form-btn");
  const todoList = document.querySelector(".todo-list");
  const todoInput = document.querySelector(".todo-input");

  let editMode = false;
  let editItem = null;

  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    const todoInputValue = todoInput.value.trim();
    if (todoInputValue !== "") {
        if (editMode){
            editItem.firstChild.textContent = todoInputValue;
            formBtn.textContent = "Add Todo";
            todoInput.value = "";
            editMode = false;
            editItem = null;
        }else{
            addTodoItem(todoInputValue);
            todoInput.value = "";
        }
      
    } else{
        alert("Enter a valid input");
    }
    
  });

  //event delegation(avoiding adding event listeners to each li element)
  todoList.addEventListener("click", function (e) {
    let target = e.target;
    if (target.tagName === "BUTTON") {
      let todoItem = target.parentNode;
      if (target.innerText === "❌") {
        todoItem.remove(); //delete todo
      }else if (target.innerText === "✏️") {
        editMode = true;
        editItem = todoItem;
        formBtn.textContent = "Edit Todo";
        todoInput.value = todoItem.firstChild.textContent;
        todoInput.focus(); // autofocus
      } 
    } 
  });

  //adding Todo Item
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
});
