import _ from "lodash";
import "./style.css";
import createTask from "./createTask";
import createProject from "./createProject";
import addProjectToProjects from "./addProjectToProjects";
const projects = [];
const taskDialogBox = document.querySelector("#add-task-dialog-box");
const taskDialogCloseButton = document.querySelector("#task-dialog-close");
const addTaskContainer = document.querySelector("#add-task-button");
const addProjectContainer = document.querySelector("#add-project-container");
const projectDialogBox = document.querySelector("#add-project-dialog-box");
const navProjectsList = document.querySelector("#nav-projects-list");
const taskList = document.querySelector("#inbox-task-list");
const addTaskSubmit = document.querySelector("#add-task-submit-button");
const addProjectSubmit = document.querySelector("#add-project-submit-button");
let navProjects = document.querySelectorAll(".project-name");
const deleteTasksButton = document.querySelector("#delete-tasks")

const projectDialogCloseButton = document.querySelector(
  "#project-dialog-close"
);

let project1 = createProject("Testproject");
addProjectToProjects(projects, project1);

let task1 = createTask({
  name: "Do dishes",
  description: "do them",
  dueDate: new Date(),
  priority: 1,
});
project1.addTask(task1);

//Create Project from form

//TODO: Add validation
addProjectSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  const projectName = document.querySelector("#project-name").value;
  const project = createProject(projectName);
  addProjectToProjects(projects, project);
  displayProjects(projects);
  projectDialogBox.close();
});

//Create Task from form
addTaskSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  let form = document.querySelector("#add-task-form");
  let inputs = form.querySelectorAll("input");
  // { name, description, dueDate, priority }
  let task = createTask({
    name: inputs[0].value,
    description: inputs[1].value,
    dueDate: new Date(inputs[2].value),
    priority: inputs[3].value,
  });
  currentProject.addTask(task)
  displayCurrentProjectTasks(taskList, currentProject);
  taskDialogBox.close();
});

//Update Task from form

//Delete checked tasks button

deleteTasksButton.addEventListener("click", ()=>{
  const inputs = taskList.querySelectorAll('input')
  inputs.forEach((input) =>{
    if(input.checked === true){
      currentProject.removeTask(input.id)
    }
  })
  displayCurrentProjectTasks(taskList, currentProject)
})

//Store User Data



//Display Projects
function displayProjects(projects) {
  navProjectsList.innerHTML = "";
  projects.forEach((project) => {
    const div = document.createElement("div");
    div.className = "project-name";
    div.id = project.id;
    div.textContent = project.name;
    navProjectsList.appendChild(div);
  });
  addSelectProjectListener();
}

displayProjects(projects);

//Display Project Tasks
let currentProject = project1;

function displayCurrentProjectTasks(taskList, currentProject) {
  taskList.innerHTML = "";
  currentProject.tasks.forEach((task) => {
    const div = document.createElement("div");
    const input = document.createElement("input");
    const name = document.createElement("p");
    const date = document.createElement("p");
    div.className = "inbox-task";
    input.type = "checkbox";
    input.name = task.name;
    input.id = `task${task.id}`;
    input.className = "check-button";
    div.appendChild(input);
    name.className = "inbox-task-name";
    name.textContent = task.name;
    div.appendChild(name);
    date.className = "inbox-task-date";
    date.textContent = task.formattedDate;
    div.appendChild(date);
    div.addEventListener("click", ()=>{
      const dialog = document.querySelector("#see-task-details")
      dialog.innerHTML = ""
      const nameString = `Name: ${task.name}`
      const descriptionString = `Description: ${task.description}`
      const dateString = `Date: ${task.formattedDate}`
      const priorityString = `Priority: ${task.priority}`
      const array = [nameString, descriptionString, dateString, priorityString]
      for (let index = 0; index < array.length; index++) {
        const p = document.createElement('p')
        p.textContent = array[index]
        dialog.appendChild(p)
      }
      const button = document.createElement("button")
      button.id = 'task-details-dialog-close'
      button.textContent = 'Close Window'
      button.addEventListener("click", () => {
        document.querySelector("#see-task-details").close();
      });
      dialog.appendChild(button)
      dialog.showModal()
    })
    taskList.appendChild(div);
  });
}

displayCurrentProjectTasks(taskList, project1);

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

// const taskDetailsDialogCloseButton = document.querySelector('#task-details-dialog-close')

// taskDetailsDialogCloseButton.addEventListener("click", () => {
//   document.querySelector("#see-task-details").close();
// });

//Select Current Project
function addSelectProjectListener() {
  navProjects = document.querySelectorAll(".project-name");
  navProjects.forEach((project) => {
    project.addEventListener("click", () => {
      currentProject = _.find(projects, (p) => p.id == project.id);
      displayCurrentProjectTasks(taskList, currentProject);
    });
  });
}
