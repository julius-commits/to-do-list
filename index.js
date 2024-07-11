var tasks = [];
var count = 0;
var deleteId = null;
var addBtn = document.getElementById("addTaskButton");
addBtn.addEventListener("click", () => {
  var userInput = document.getElementById("taskInput");
  var userInputValue = userInput.value;
  if (userInput.value != "") {
    addTask(userInput.value);
    userInput.value = "";
  } else alert("Empty task ! ! ! ");
});

function addTask(task) {
  count++;
  tasks.push({ id: count, text: task });
  showTasks();
  console.log(tasks);
}

function showTasks() {
  var taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  document.body.appendChild(taskList);
  tasks.forEach((item) => {
    console.log(item, "single task");
    var li = document.createElement("li");
    var p = document.createElement("p");
    li.classList = "list-group-item d-flex justify-content-between";
    p.textContent = item.text;
    li.appendChild(p);
    taskList.appendChild(li);
    var icons = document.createElement("div");
    icons.classList = "icons";
    li.appendChild(icons);
    var trashIcon = document.createElement("img");
    var editIcon = document.createElement("img");
    trashIcon.src = "./trash.svg";
    editIcon.src = "edit.svg";
    icons.appendChild(trashIcon);
    icons.appendChild(editIcon);

    trashIcon.addEventListener("click", () => {
      deleteId = item.id;
      const trashModal = new bootstrap.Modal(
        document.getElementById("exampleModal-delete")
      );

      trashModal.show();
    });
    editIcon.addEventListener("click", () => {
      const editModal = new bootstrap.Modal(
        document.getElementById("exampleModal")
      );

      editModal.show();
    });
  });
}

const deletebtn = document.getElementById("confirmDeleteButton");
deletebtn.addEventListener("click", () => {
  deleteTask(deleteId);
  deleteId = null;
  var trashModal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal-delete")
  );
  trashModal.hide();
});

function deleteTask(deleteId) {
  deleteId = Number(deleteId);
  tasks = tasks.filter((task) => task.id !== deleteId);
  console.log(tasks, deleteId);
  showTasks();
}
