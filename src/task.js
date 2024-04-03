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
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = dueDate.toLocaleDateString('en-US', options);
    return formattedDate
  }
}

export default Task