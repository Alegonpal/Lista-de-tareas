
// Creación de la clase tarea
class Tarea {
    constructor(id, descripcion, completada) {
        this.id = id;
        this.descripcion = descripcion;
        this.completada = false;
    }
}

// Creación del array de tareas

const listaDeTareas = [];



// Función para agregar tareas
function agregarTarea() {
    let descripcion = document.getElementById('descripcion-tarea').value;
    let id = listaDeTareas.length + 1;
    if (descripcion !== "") {
        const nuevaTarea = new Tarea(id, descripcion);
        listaDeTareas.push(nuevaTarea);
        document.getElementById('descripcion-tarea').value = "";
        mostrarTareas();
    } else {
        alert("¡Introduce una tarea!");
    }

}

// Agregar tarea con la tecla enter
function agregarTareaConEnter(event) {
    if (event.key === 'Enter') {
        agregarTarea();
    }
}


function mostrarTareas(tareas = listaDeTareas) {
    const listaDeTareasElement = document.getElementById("tareas-lista");
    listaDeTareasElement.innerHTML = "";

    for (let i = 0; i < tareas.length; i++) {
        const tarea = tareas[i];
        const tareaElement = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarea.completada; 
        checkbox.onchange = function () {
            tarea.completada = checkbox.checked;
            mostrarTareas(filtrarTareas()); 
        };

        const tareaDescripcion = document.createElement("label");
        tareaDescripcion.textContent = tarea.descripcion;
        tareaDescripcion.style.textDecoration = tarea.completada ? "line-through" : "none";

        const botonEliminar = document.createElement("button");
        botonEliminar.id = "eliminar";
        botonEliminar.onclick = function () {
            eliminarTarea(tarea.id);
        };
        botonEliminar.innerHTML = '<img src="images/papelera.png"/>';

        tareaElement.appendChild(checkbox);
        tareaElement.appendChild(tareaDescripcion);
        tareaElement.appendChild(botonEliminar);
        listaDeTareasElement.appendChild(tareaElement);
    }
}



// Marcar tareas como completadas
function marcarTareaComoCompletada(id) {
    const tarea = listaDeTareas.find((t) => t.id === id);
    if (tarea) {
        tarea.completada = true;
    }
    mostrarTareas();
}

// Eliminar tareas
function eliminarTarea(id) {
    const index = listaDeTareas.findIndex((t) => t.id === id);
    if (index !== -1) {
        let confirmar = confirm("¿Estás seguro de que quieres eliminar esta tarea?");
        if (confirmar) {
            listaDeTareas.splice(index, 1);
        }

    }
    mostrarTareas();
}


function filtrarTareas() {
    const filtro = document.getElementById('filtro').value;

    switch (filtro) {
        case "todas":
            return mostrarTareas(listaDeTareas);

        case "completas":
            return mostrarTareas(listaDeTareas.filter(tarea => tarea.completada));

        case "incompletas":
            return mostrarTareas(listaDeTareas.filter(tarea => !tarea.completada));
    }
}




