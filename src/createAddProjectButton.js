import Icon from './plus-circle.svg';

function createAddTaskButton(){
  let p = document.createElement('p')
  let plusGraphic = new Image()
  plusGraphic.src = Icon


  p.appendChild(plusGraphic)
  let span = document.createElement('span')
  span.textContent = 'Add Task'
  p.appendChild(span)
  return p
}

export default createAddTaskButton()