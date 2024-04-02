import _ from "lodash";

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    _.remove(this.tasks, (t) => t === task);
  }
}

export default Project;
