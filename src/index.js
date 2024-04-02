import _ from "lodash";
import "./style.css";
import Project from "./project";
import Task from "./task";
const projects = [];
const taskDialogBox = document.querySelector("#add-task-dialog-box");
const taskDialogCloseButton = document.querySelector("#task-dialog-close");
const addTaskContainer = document.querySelector("#add-task-button");
const addProjectContainer = document.querySelector("#add-project-container");
const projectDialogBox = document.querySelector("#add-project-dialog-box");
const navProjectsList = document.querySelector("#nav-projects-list");
const taskList = document.querySelector("#inbox-task-list")
const addTaskSubmit = document.querySelector('#add-task-submit-button')
const addProjectSubmit = document.querySelector('#add-project-submit-button')
let navProjects = document.querySelectorAll(".project-name")


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


//Create Project from form

//TODO: Add validation
addProjectSubmit.addEventListener('click', ((event)=>{
  event.preventDefault()
  const projectName = document.querySelector("#project-name").value
  const project = createProject(projectName)
  addProjectToProjects(projects, project);
  displayProjects(projects)
  projectDialogBox.close();
}))

//Create Task from form


//Edit Project Name

//Update Task from form

//Display task details

//Display Projects
function displayProjects(projects) {
  navProjectsList.innerHTML = ""
  projects.forEach((project) => {
    const div = document.createElement('div')
    div.className = "project-name"
    div.id = project.id
    div.textContent = project.name
    navProjectsList.appendChild(div)
  })
  addSelectProjectListener()
  ;
}

displayProjects(projects)

//Display Project Tasks
let currentProject = project1


function displayCurrentProjectTasks(taskList, currentProject){
  taskList.innerHTML = ""
  currentProject.tasks.forEach((task) => {
    const div = document.createElement('div')
    const input = document.createElement('input')
    const name = document.createElement('p')
    const date = document.createElement('p')
    div.className = "inbox-task"
    input.type = 'checkbox'
    input.name = task.name
    input.id = `task${task.id}`
    input.className = "check-button"
    div.appendChild(input)
    name.className="inbox-task-name"
    name.textContent = task.name
    div.appendChild(name)
    date.className = "inbox-task-date"
    date.textContent = task.formattedDate
    div.appendChild(date)
    taskList.appendChild(div)
  })
}

displayCurrentProjectTasks(taskList, project1)

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


//Select Current Project
function addSelectProjectListener(){
  navProjects = document.querySelectorAll(".project-name")
  navProjects.forEach((project) =>{
    project.addEventListener("click", ()=>{
      currentProject = _.find(projects, (p)=> p.id == project.id)
    })
  })
}