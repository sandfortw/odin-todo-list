class Task {
  constructor(name, description = "", dueDate = new Date(), priority = 5) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  get formattedDate(){
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = this.dueDate.toLocaleDateString('en-US', options);
    return formattedDate
  }
}
