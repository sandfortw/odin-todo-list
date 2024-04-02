import "./style.css";
import Project from "./project";
import Task from "./task";
const projects = [];
const taskDialogBox = document.querySelector("#add-task-dialog-box");
const taskDialogCloseButton = document.querySelector("#task-dialog-close");
const addTaskContainer = document.querySelector("#add-task-button");
const addProjectContainer = document.querySelector("#add-project-container");
const projectDialogBox = document.querySelector("#add-project-dialog-box");
const navProjects = document.querySelector("#nav-projects-list");

const projectDialogCloseButton = document.querySelector(
  "#project-dialog-close"
);

// Create a new project
function createProject(name) {
  return new Project(name);
}

function addProjectToProjects(arry, project) {
  arry.push(project);
}
let project1 = createProject("Testproject");
addProjectToProjects(projects, project1);

// Create a new task
function createTask({ name, description, dueDate, priority }) {
  return new Task({ name, description, dueDate, priority });
}
let task1 = createTask({
  name: "Do dishes",
  description: "do them",
  dueDate: new Date(),
  priority: 1,
});
project1.addTask(task1);

//Display Projects
function displayProjects(projects) {
  navProjects.innerHTML = ""
  projects.forEach((project) => {
    const div = document.createElement('div')
    div.className = "project-name"
    div.textContent = project.name
    navProjects.appendChild(div)
  });
}

displayProjects(projects)

//Display Project Tasks

addTaskContainer.addEventListener("click", () => {
  taskDialogBox.showModal();
});

taskDialogCloseButton.addEventListener("click", () => {
  taskDialogBox.close();
});

addProjectContainer.addEventListener("click", () => {
  projectDialogBox.showModal();
});

projectDialogCloseButton.addEventListener("click", () => {
  projectDialogBox.close();
});
