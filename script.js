const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const themeToggle = document.querySelector(".theme-toggle");
const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");


const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDarkScheme) {
  document.body.classList.add('dark');
  themeToggle.classList.add('active');
}


window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (e.matches) {
    document.body.classList.add('dark');
    themeToggle.classList.add('active');
  } else {
    document.body.classList.remove('dark');
    themeToggle.classList.remove('active');
  }
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.classList.toggle('active');

  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});


const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.classList.add('active');
  }
}


function updateStatistics() {
  const tasks = todoList.children;
  const total = tasks.length;
  const completed = Array.from(tasks).filter(task => task.classList.contains('completed')).length;
  
  totalTasks.textContent = total;
  completedTasks.textContent = completed;
}

addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTodo();
});

function addTodo() {
  const taskText = todoInput.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function () {
    li.classList.toggle("completed", checkbox.checked);
    updateStatistics();
  });

  const span = document.createElement("span");
  span.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.style.border = "none";
  deleteBtn.style.background = "transparent";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateStatistics();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  todoList.appendChild(li);
  todoInput.value = "";
  updateStatistics();
}

