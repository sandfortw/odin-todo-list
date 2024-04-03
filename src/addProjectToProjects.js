function addProjectToProjects(arry, project) {
  arry.push(project);
  localStorage.setItem('projects', JSON.stringify(arry))
}

export default addProjectToProjects;
