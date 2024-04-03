const { lightFormat } = require("date-fns")
import _ from "lodash";
import "./style.css";
import createTask from "./createTask";
import createProject from "./createProject";
import addProjectToProjects from "./addProjectToProjects";
const projects = localStorage["projects"] ? retrieveProjects(localStorage["projects"]) : [createProject("My new project")];
let currentProject = projects[0] 

const taskDialogBox = document.querySelector("#add-task-dialog-box");
const taskDialogCloseButton = document.querySelector("#task-dialog-close");
const addTaskContainer = document.querySelector("#add-task-button");
const addProjectContainer = document.querySelector("#add-project-container");
const projectDialogBox = document.querySelector("#add-project-dialog-box");
const navProjectsList = document.querySelector("#nav-projects-list");
const taskList = document.querySelector("#inbox-task-list");
let navProjects = document.querySelectorAll(".project-name");
const deleteTasksButton = document.querySelector("#delete-tasks");

const projectDialogCloseButton = document.querySelector(
  "#project-dialog-close"
);


function retrieveProjects(localStorage){
  let parsed = JSON.parse(localStorage)
  let newProjects = []
  parsed.forEach((project) =>{
    let newProject = createProject(project.name)
    let tasks = project.tasks
    for (let index = 0; index < tasks.length; index++) {
      let task = tasks[index];
      project.tasks[index] = createTask({name: task.name, description: task.description, dueDate: task.dueDate, priority: task.priority})
    }
    newProject.tasks = tasks
    newProjects.push(newProject)
  })
  return newProjects
}

//Create Project from form
const addProjectForm = document.querySelector("#add-project-dialog-box-form")
addProjectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const projectName = document.querySelector("#project-name").value;
  const project = createProject(projectName);
  addProjectToProjects(projects, project);
  displayProjects(projects);
  clearForm(addProjectForm)
  projectDialogBox.close();
});

//Create Task from form
const taskForm = document.querySelector("#add-task-form")
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let form = taskForm;
  let inputs = form.querySelectorAll("input");
  let task = createTask({
    name: inputs[0].value,
    description: inputs[1].value,
    dueDate: new Date(inputs[2].value),
    priority: inputs[3].value,
  });
  currentProject.addTask(task);
  localStorage.setItem('projects', JSON.stringify(projects))
  displayCurrentProjectTasks(taskList, currentProject);
  clearForm(form)
  taskDialogBox.close();
});

//Delete checked tasks button
deleteTasksButton.addEventListener("click", () => {
  const inputs = taskList.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.checked === true) {
      currentProject.removeTask(input.id);
      localStorage.setItem('projects', JSON.stringify(projects))
    }
  });
  displayCurrentProjectTasks(taskList, currentProject);
});

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
    const editButton = document.createElement("span");
    editButton.className = "material-symbols-outlined";
    editButton.textContent = "Edit";

    const editTaskContainer = document.querySelector(
      "#edit-task-form-container"
    );

    editButton.addEventListener("click", () => {
      editTaskContainer.innerHTML = "";
      const form = document.createElement("form");
      form.id = "edit-task-form";

      ["name", "description", "dueDate", "priority"].forEach((prop) => {
        const label = document.createElement("label");
        label.setAttribute("for", `edit-task-${prop}`);
        label.textContent = prop.charAt(0).toUpperCase() + prop.slice(1) + ":";

        const input = document.createElement("input");
        input.type =
          prop === "dueDate" ? "date" : prop === "priority" ? "number" : "text";
        input.name = `task-${prop}`;
        input.id = `edit-task-${prop}`;
        input.required = true;
        input.value = prop === "dueDate" ? lightFormat( new Date(task[prop]), "yyyy-MM-dd") : task[prop];
        input.min = prop === "priority" ? 1 : "";
        input.max = prop === "priority" ? 5 : "";
        input.step = prop === "priority" ? 1 : "";
        form.appendChild(label);
        form.appendChild(input);
      });

      const submitButton = document.createElement("input");
      submitButton.type = "submit";
      submitButton.value = "Update Task";
      submitButton.id = "edit-task-submit-button";
      form.appendChild(submitButton);
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        let inputs = form.querySelectorAll("input");
        task.name = inputs[0].value;
        task.description = inputs[1].value;
        task.dueDate = new Date(inputs[2].value);
        task.priority = inputs[3].value;
        localStorage.setItem('projects', JSON.stringify(projects))
        displayCurrentProjectTasks(taskList, currentProject);
        clearForm(form)
        editTaskContainer.close();
      });
      editTaskContainer.appendChild(form);
      editTaskContainer.showModal();
    });
    div.appendChild(editButton);

    const detailsButton = document.createElement("span");
    detailsButton.className = "material-symbols-outlined";
    detailsButton.textContent = "page_info";
    detailsButton.addEventListener("click", () => {
      const dialog = document.querySelector("#see-task-details");
      dialog.innerHTML = "";
      const nameString = `Name: ${task.name}`;
      const descriptionString = `Description: ${task.description}`;
      const dateString = `Date: ${task.formattedDate}`;
      const priorityString = `Priority: ${task.priority}`;
      const array = [nameString, descriptionString, dateString, priorityString];
      for (let index = 0; index < array.length; index++) {
        const p = document.createElement("p");
        p.textContent = array[index];
        dialog.appendChild(p);
      }
      const button = document.createElement("button");
      button.id = "task-details-dialog-close";
      button.textContent = "Close Window";
      button.addEventListener("click", () => {
        document.querySelector("#see-task-details").close();
      });
      dialog.appendChild(button);
      dialog.showModal();
    });
    div.appendChild(detailsButton);
    taskList.appendChild(div);
  });
  document.getElementById("inbox-title").textContent = `${currentProject.name} Inbox`;
}

addTaskContainer.addEventListener("click", () => {
  taskDialogBox.showModal();
});

taskDialogCloseButton.addEventListener("click", () => {
  var form = document.getElementById("add-task-form");
  clearForm(form)
  taskDialogBox.close();
});

addProjectContainer.addEventListener("click", () => {
  projectDialogBox.showModal();
});

projectDialogCloseButton.addEventListener("click", () => {
  var form = document.getElementById("add-project-dialog-box-form");
  clearForm(form)
  projectDialogBox.close();
});

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


function clearForm(form) {
  var elements = form.elements;
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (element.type !== "button" && element.type !== "submit" ) {
      element.value = "";
    }
  }
}


/*TODO:
Fix bug where my date is a day earlier than what I selected
Refactor for way better readability 
Convert to-do-list buttons to grid to line it up better
*/


document.getElementById("inbox-title").textContent = `${currentProject.name} Inbox`;
displayCurrentProjectTasks(taskList, currentProject)
