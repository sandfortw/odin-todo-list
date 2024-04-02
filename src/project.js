import _ from "lodash";

class Project {
  static idCounter = 1;

  constructor(name) {
    this.id = idCounter++;
    this.name = name;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    _.remove(this.tasks, (t) => t.id == task.id);
  }
}

export default Project;
