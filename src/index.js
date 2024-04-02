import './style.css';
import addTaskButton from './createAddProjectButton.js'


let addTaskContainer = document.querySelector('#add-task-button')
addTaskContainer.appendChild(addTaskButton)

const dialogBox = document.querySelector('#add-task-dialog-box')
const dialogCloseButton = document.querySelector('#dialog-close')

addTaskContainer.addEventListener('click', ()=>{
  dialogBox.showModal()
})

dialogCloseButton.addEventListener('click', ()=>{
  dialogBox.close()
})
