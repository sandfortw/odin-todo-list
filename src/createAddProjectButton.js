
function createAddTaskButton(){
  let p = document.querySelector('#add-task-container')
  let span = document.createElement('p')
  span.textContent = 'Add Task'
  p.appendChild(span)
  return p
}

export default createAddTaskButton()