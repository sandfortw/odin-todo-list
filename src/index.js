import './style.css';


let addTaskContainer = document.querySelector('#add-task-button')

const dialogBox = document.querySelector('#add-task-dialog-box')
const dialogCloseButton = document.querySelector('#dialog-close')

addTaskContainer.addEventListener('click', ()=>{
  dialogBox.showModal()
})

dialogCloseButton.addEventListener('click', ()=>{
  dialogBox.close()
})
