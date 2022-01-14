let todoItemsContainer = document.getElementById("todoItemsContainer"); // accesing unorder element
let addTodoButton = document.getElementById("addTodoButton"); // accesing add button
let saveButton = document.getElementById("saveTodoButton"); // save button

// funcyion that gets todolist from localStorage========
function getTodoListFromLocalStorage() {
    let JSONstring = localStorage.getItem("todoList");
    let jstodoList = JSON.parse(JSONstring);
    if (jstodoList === null) {
        return [];
    } else {
        return jstodoList;
    }
}
//============================================================

// calling todolist from localStorage=====================
let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;
//======================================================

//======= defaultly created todo array with some fixed items
/*let todoList = [{
        text: "Learn HTML",
        uniqueNo: 1
    },
    {
        text: "Learn CSS",
        uniqueNo: 2
    },
    {
        text: "Learn JavaScript",
        uniqueNo: 3
    }
];  */
//=========================================================

//======= giving event listener to save button=====
saveButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
} //to save the todo to localStorage
//====================================================

//==== length of todolist array===========
// length of todolist array
//================================================

// ==== markingup the text when this function alled=====
function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle('checked');
    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }

    });
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }

}
//==================================================

//===== delete todo item when this function called i mean when clicked on delete icon=========
function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);

    todoItemsContainer.removeChild(todoElement);
    let deleteIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteIndex, 1);
    console.log(todoList);

}
//=========================================

// todo item is created and appended to html ==============
function createAndAppendTodo(todo) {
    let todoId = 'todo' + todo.uniqueNo;
    let checkboxId = 'checkbox' + todo.uniqueNo;
    let labelId = 'label' + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;


    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    }

    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }


    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };

    deleteIconContainer.appendChild(deleteIcon);
}
//=======================================================

// todo over the todo array and calling createAndAppendTodo function for each iteration===
for (let todo of todoList) {
    createAndAppendTodo(todo);
}
//====================================================

// taking the input from user and create a todo object and calling createAndAppendTodo 
// with this todo oject=========
function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    todosCount = todosCount + 1;

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };
    todoList.push(newTodo);

    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}
//==========================================

//==== calling onddtodo function from here======== 
addTodoButton.onclick = function() {
    onAddTodo();
}
//=================================================