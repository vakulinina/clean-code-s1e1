//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput = document.querySelector(".task-wrap__input-text");//Add a new task.
var addButton = document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder = document.querySelector(".incomplete-tasks");//ul of #incompleteTasks
var completedTasksHolder = document.querySelector(".completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement = function (taskString) {

  var listItem = document.createElement("li");

  //input (checkbox)
  var checkBox = document.createElement("input");//checkbx
  //label
  var label = document.createElement("label");//label
  //input (text)
  var editInput = document.createElement("input");//text
  //button.edit
  var editButton = document.createElement("button");//edit button

  //button.delete
  var deleteButton = document.createElement("button");//delete button
  var deleteButtonImg = document.createElement("img");//delete button image

  label.innerText = taskString;
  label.className = 'task-item__task-label task-label';

  //Each elements, needs appending
  checkBox.type = "checkbox";
  checkBox.className = "task-item__cb";

  editInput.type = "text";
  editInput.className = "task-item__input-text input-text";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "btn btn_edit";

  deleteButton.className = "btn btn_delete";
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = "img-del";
  deleteButton.appendChild(deleteButtonImg);


  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  listItem.className = "task-item";
  console.log('create elem')
  return listItem;
}


var addTask = function () {
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";

}

//Edit an existing task.

var editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  var listItem = this.parentNode;

  var editInput = listItem.querySelector('.input-text');
  var label = listItem.querySelector(".task-label");
  var editBtn = listItem.querySelector(".btn_edit");
  var containsClass = editInput.classList.contains("task-item__input-text_edit-mode");
  //If class of the parent is .editmode

  if (containsClass) {

    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    label.classList.remove('task-item__task-label_edit-mode');
    editInput.classList.remove('task-item__input-text_edit-mode');
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    label.classList.add('task-item__task-label_edit-mode');
    editInput.classList.add('task-item__input-text_edit-mode');

    editBtn.innerText = "Save";
  }

  //toggle .editmode on the parent.
};


//Delete task.
var deleteTask = function () {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted = function () {
  console.log("Complete Task...");
  //Append the task list item to the #completed-tasks
  console.log(this)
  console.log(this.parentNode)

  var listItem = this.parentNode;
  var label = listItem.querySelector('.task-label');
  var editBtn = listItem.querySelector(".btn_edit");
  var editInput = listItem.querySelector('.task-item__input-text');

  label.classList.remove('task-item__task-label_edit-mode');
  label.classList.add('task-item__task-label_complete');
  editInput.classList.remove('task-item__input-text_edit-mode');
  editBtn.innerText = "Edit";
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete = function () {
  console.log("Incomplete Task...");
//Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var listItem = this.parentNode;
  var label = listItem.querySelector('.task-label');
  label.classList.remove('task-item__task-label_complete');
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}


var ajaxRequest = function () {
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
//select ListItems children
  var checkBox = taskListItem.querySelector(".task-item__cb");
  var editButton = taskListItem.querySelector(".btn_edit");
  var deleteButton = taskListItem.querySelector(".btn_delete");


  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}


//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}


// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
