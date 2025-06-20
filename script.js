const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const themeToggle = document.querySelector(".theme-toggle");
const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");
const modalbtn = document.querySelector(".modal");
const modalClose = document.querySelector("#close-modal");
const p = document.querySelector("#task-description");
const desc = document.querySelector("#todo-desc");
const modalTitle= document.querySelector(".modal-title");
const tasklist=document.querySelector("#task-list");
const displayBtn= document.querySelector(".display-btn");

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    themeToggle.textContent = "Dark Mode";
    document.body.classList.remove("dark-mode");
  } else {
    themeToggle.textContent = "Light Mode";
    document.body.classList.add("dark-mode");
  }
})

fetch('https://yurippe.vercel.app/api/quotes?character=&random=1')
.then(res => res.json())
.then(data => {
  console.log(data[0].quote);
  const quotesDiv = document.querySelector(".quotes");
  quotesDiv.innerHTML = `
    <blockquote>
      <p>${data[0].quote}</p>
      <footer>${data[0].character} </footer>
    </blockquote>
  `;
});

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
    console.log("Task deleted:", taskText);
    localStorage.removeItem(taskText);
    tasks = tasks.filter(task => task.task !== taskText);
    updateStatistics();
  });
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
  todoInput.value = "";
  desc.value = "";
  updateStatistics();
  const date = new Date();
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const timeSpan = document.createElement("span");
  document.querySelector(".modal-content").appendChild(timeSpan);
  timeSpan.textContent = time;
  li.style.color = "black";
  li.appendChild(timeSpan);
  tasks.push({
    task:taskText,
    time: time,
    description:desc.value,
    value: checkbox.checked
  });
  saveTasks();
  console.log(tasks);
}
modalClose.addEventListener("click", function () {
  modalbtn.style.display = "none";
  desc.value = "";
});
displayBtn.addEventListener("click", function () {
  tasklist.innerHTML = "";
  tasks.map((task) => {
    const li = document.createElement("li");
    li.textContent = task.task;
    tasklist.appendChild(li);
    console.log(task);
  });
});

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem('tasks');
  if (stored) {
    return JSON.parse(stored).map(task => ({
      ...task,
      date: new Date(task.date)
    }));
  }
  return [];
}

let tasks = loadTasks();

function addTask(task) {
  tasks.push(task);
  saveTasks();
  renderTasks();
}


addTask({ title: "New Task", description: "Details", date: new Date() });
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.title;
    li.addEventListener("click", () => {
      taskDetails.innerHTML = `
        <strong>Description:</strong> ${task.description}<br>
        <strong>Date Created:</strong> ${task.date.toLocaleString()}`;
    });
    taskList.appendChild(li);
  });
}

renderTasks();
function deleteTask(task){
  
  tasks = tasks.filter(t => t !== task);
  saveTasks();
  renderTasks();
}


