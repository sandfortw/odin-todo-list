import Task from "./task";

function createTask({ name, description, dueDate, priority }) {
  return new Task({ name, description, dueDate, priority });
}

export default createTask;
