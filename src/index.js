import './style.css';
const taskDialogBox = document.querySelector('#add-task-dialog-box')
const taskDialogCloseButton = document.querySelector('#task-dialog-close')
const addTaskContainer = document.querySelector('#add-task-button')
const addProjectContainer = document.querySelector('#add-project-container')
const projectDialogBox = document.querySelector('#add-project-dialog-box')

const projectDialogCloseButton = document.querySelector('#project-dialog-close')


addTaskContainer.addEventListener('click', ()=>{
  taskDialogBox.showModal()
})

taskDialogCloseButton.addEventListener('click', ()=>{
  taskDialogBox.close()
})

addProjectContainer.addEventListener('click', ()=>{
  projectDialogBox.showModal()
})

projectDialogCloseButton.addEventListener('click', ()=>{
  projectDialogBox.close()
})







