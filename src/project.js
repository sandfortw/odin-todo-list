import _ from "lodash";

class Project {
  static idCounter = 1;

  constructor(name) {
    this.id = Project.idCounter++;
    this.name = name;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(id) {
    id = id.slice(4)
    _.remove(this.tasks, (t) => t.id == id);
  }
}

export default Project;
