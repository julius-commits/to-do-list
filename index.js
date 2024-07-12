var tasks = [];
var count = 0;
var deleteId = null;
var editedId = null;

var addBtn = document.getElementById("addTaskButton");
addBtn.addEventListener("click", () => {
  var userInput = document.getElementById("taskInput");
  if (userInput.value !== "") {
    addTask(userInput.value);
    userInput.value = "";
  } else {
    alert("Empty task ! ! ! ");
  }
});

function addTask(task) {
  count++;
  tasks.push({ id: count, text: task });
  showTasks();
}

function showTasks() {
  var taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((item) => {
    var li = document.createElement("li");
    var p = document.createElement("p");
    li.classList.add("list-group-item", "d-flex", "justify-content-between");
    p.textContent = item.text;
    li.appendChild(p);

    var icons = document.createElement("div");
    icons.classList.add("icons");

    var trashIcon = document.createElement("img");
    var editIcon = document.createElement("img");
    trashIcon.src = "./trash.svg";
    editIcon.src = "edit.svg";

    icons.appendChild(trashIcon);
    icons.appendChild(editIcon);
    li.appendChild(icons);

    taskList.appendChild(li);

    trashIcon.addEventListener("click", () => {
      deleteId = item.id;
      const trashModal = new bootstrap.Modal(
        document.getElementById("exampleModal-delete")
      );
      trashModal.show();
    });

    editIcon.addEventListener("click", () => {
      var txtval = document.getElementById("editTaskInput");
      txtval.value = item.text;
      editedId = item.id;
      const editModal = new bootstrap.Modal(
        document.getElementById("exampleModal")
      );
      editModal.show();
    });
  });
}

function deleteTask(deleteId) {
  deleteId = Number(deleteId);
  tasks = tasks.filter((task) => task.id !== deleteId);
  showTasks();
}

function editTask(id, newText) {
  id = Number(id);
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex].text = newText;
    showTasks();
  }
}

var editSave = document.getElementById("saveEditButton");
editSave.addEventListener("click", () => {
  var updatedTaskInput = document.getElementById("editTaskInput");
  editTask(editedId, updatedTaskInput.value);
  var editModal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal")
  );
  editModal.hide();
});

const deletebtn = document.getElementById("confirmDeleteButton");
deletebtn.addEventListener("click", () => {
  deleteTask(deleteId);
  deleteId = null;
  var trashModal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal-delete")
  );
  trashModal.hide();
});
