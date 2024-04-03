const { format } = require("date-fns")
class Task {
  static idCounter = 1

  constructor({name, description = "", dueDate = new Date(), priority = 5}) {
    this.id = Task.idCounter++
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  get formattedDate(){
    const dueDate = typeof this.dueDate === "string" ? new Date(this.dueDate) : this.dueDate
    return format(dueDate, "MMM dd, yyyy")
  }
}

export default Task