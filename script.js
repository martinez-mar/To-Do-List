const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Cargar tareas guardadas
renderTasks();

addBtn.addEventListener("click", addTask);

// Permitir Enter
taskInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

function addTask(){

    const taskText = taskInput.value.trim();

    if(taskText === ""){
        return;
    }

    tasks.push(taskText);

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">
                x
            </button>
        `;

        taskList.appendChild(li);
    });
}

function deleteTask(index){

    tasks.splice(index, 1);

    saveTasks();
    renderTasks();
}

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* REGISTRO DEL SERVICE WORKER */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("./service-worker.js")

        .then(() => {
            console.log("Service Worker registrado");
        })

        .catch(err => {
            console.log("Error:", err);
        });

    });

}