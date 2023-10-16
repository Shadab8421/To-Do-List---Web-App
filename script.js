const tasksContainer = document.getElementById("tasks");
const taskInput = document.getElementById("taskInput");

// Load tasks from local storage
window.addEventListener("load", loadTasksFromLocalStorage);

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((taskText) => {
    addTask(taskText);
  });
}

function editTask(event) {
  const taskTextElement =
    event.target.parentElement.querySelector('input[type="text"]');
  taskTextElement.removeAttribute("readonly");
  taskTextElement.focus();
  taskTextElement.select();
  taskTextElement.addEventListener("blur", () => {
    taskTextElement.setAttribute("readonly", true);
    saveTasksToLocalStorage();
  });
  taskTextElement.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      taskTextElement.setAttribute("readonly", true);
      saveTasksToLocalStorage();
    }
  });
}

function addTask(taskText) {
  taskText = taskText || taskInput.value.trim();
  if (taskText === "") return;

  const taskDiv = document.createElement("div");
  taskDiv.className = "task";

  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "radio";
  taskCheckbox.addEventListener("click", toggleTask);

  const taskTextElement = document.createElement("input");
  taskTextElement.type = "text";
  taskTextElement.value = taskText;
  taskTextElement.setAttribute("readonly", true);
  taskTextElement.addEventListener("input", updateTaskText);

  const editButton = document.createElement("button");
  editButton.className = "edit-button";
  editButton.textContent = "Edit";
  editButton.addEventListener("click", editTask);

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", deleteTask);

  taskDiv.appendChild(taskCheckbox);
  taskDiv.appendChild(taskTextElement);
  taskDiv.appendChild(editButton);
  taskDiv.appendChild(deleteButton);

  tasksContainer.appendChild(taskDiv);

  // Save tasks to local storage
  saveTasksToLocalStorage();

  if (!taskText) {
    taskInput.value = "";
  }
}

function toggleTask(event) {
  const taskTextElement =
    event.target.parentElement.querySelector('input[type="text"]');
  taskTextElement.classList.toggle("completed");

  // Save tasks to local storage
  saveTasksToLocalStorage();
}

function updateTaskText(event) {
  const taskTextElement = event.target;
  if (taskTextElement.classList.contains("completed")) {
    taskTextElement.classList.remove("completed");
  }

  // Save tasks to local storage
  saveTasksToLocalStorage();
}

function deleteTask(event) {
  const taskDiv = event.target.parentElement;
  tasksContainer.removeChild(taskDiv);

  // Save tasks to local storage
  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
  const taskTextElements = document.querySelectorAll(
    '.task input[type="text"]'
  );
  const tasks = Array.from(taskTextElements).map((task) => task.value);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
