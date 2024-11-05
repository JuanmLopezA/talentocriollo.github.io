// Manejar la subida de tareas
document.getElementById('upload-task-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario
  
    // Obtener los datos de la tarea
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
  
    // Crear un objeto de tarea
    const task = {
      title: title,
      description: description
    };
  
    // Obtener las tareas almacenadas y añadir la nueva tarea
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  
    // Limpiar el formulario
    document.getElementById('upload-task-form').reset();
  
    // Mostrar las tareas actualizadas
    displayTasks();
  });
  
  // Función para mostrar las tareas
  function displayTasks() {
    const tasksContainer = document.getElementById('submitted-tasks');
    tasksContainer.innerHTML = ''; // Limpiar contenedor antes de mostrar
  
    // Obtener las tareas del almacenamiento local
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      const taskElement = document.createElement('div');
      taskElement.className = 'task';
      taskElement.innerHTML = `<h3>${task.title}</h3><p>${task.description}</p>`;
      tasksContainer.appendChild(taskElement);
    });
  
    // Actualizar la lista de proyectos en el formulario de aplicación
    updateProjectSelect(tasks);
  }
  
  // Actualizar el menú de selección de proyectos en el formulario de postulación
  function updateProjectSelect(tasks) {
    const projectSelect = document.getElementById('project-select');
    projectSelect.innerHTML = ''; // Limpiar opciones anteriores
  
    tasks.forEach((task, index) => {
      const option = document.createElement('option');
      option.value = index; // Guardar el índice de la tarea
      option.textContent = task.title; // Mostrar el título de la tarea
      projectSelect.appendChild(option);
    });
  }
  
  // Manejar la postulación a proyectos
  document.getElementById('application-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario
  
    // Obtener los datos de la postulación
    const name = document.getElementById('applicant-name').value;
    const email = document.getElementById('applicant-email').value;
    const projectIndex = document.getElementById('project-select').value;
  
    // Mostrar la postulación
    const applicationsContainer = document.getElementById('applications-container');
    const applicationElement = document.createElement('div');
    applicationElement.innerHTML = `<p><strong>${name}</strong> se ha postulado al proyecto: ${JSON.parse(localStorage.getItem('tasks'))[projectIndex].title}.</p>`;
    applicationsContainer.appendChild(applicationElement);
  
    // Limpiar el formulario
    document.getElementById('application-form').reset();
  });
  
  // Mostrar las tareas al cargar la página
  document.addEventListener('DOMContentLoaded', displayTasks);
  