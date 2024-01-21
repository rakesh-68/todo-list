document.addEventListener("DOMContentLoaded", function () {
  show();
});

index = 0

function addTask() {
  const enteredTask = document.getElementById("inputTask");

  const val = enteredTask.value;
  if (!val) {
    return;
  }

  const list_items = document.getElementById("tasks");

  const task_el = document.createElement("div");
  task_el.classList.add("task");

  const task_content = document.createElement("div");
  task_content.classList.add("content");

  task_el.appendChild(task_content);

  const task_input = document.createElement("input");
  task_input.classList.add("text");
  task_input.type = "text";
  task_input.value = val;
  task_input.setAttribute("readonly", "readonly");

  task_content.appendChild(task_input);

  const task_action = document.createElement("div");
  task_action.classList.add("actions");

  const edit_action = document.createElement("button");
  edit_action.classList.add("edit");
  edit_action.innerHTML = "Edit";

  const del_action = document.createElement("button");
  del_action.classList.add("delete");
  del_action.innerHTML = "Delete";

  task_action.appendChild(edit_action);
  task_action.appendChild(del_action);

  task_el.appendChild(task_action);

  list_items.appendChild(task_el);
  enteredTask.value = "";

  saveContents(list_items.innerHTML, val, index++);

  edit_action.addEventListener("click", () => {
    editing(edit_action, task_input, index);
  });

  del_action.addEventListener("click", () => {
    deleting(list_items, task_el);
  });

  show();
}

function editing(edit_action, task_input, index) {
  if (edit_action.innerText == "Edit") {
    task_input.removeAttribute("readonly");
    task_input.focus();
    edit_action.innerText = "Save";
  }
   else {
    task_input.setAttribute("readonly", "readonly");
    edit_action.innerText = "Edit";

    saveContents(
      document.getElementById("tasks").innerHTML,
      task_input.value,
      index
    );
  }
}

function deleting(list_items, task_el) {

  const task_input = task_el.querySelector(".text");
  list_items.removeChild(task_el);

  removeFromLocalStorage(task_input.value);

}

function removeFromLocalStorage(inputValue) {

  const storedContent = JSON.parse(localStorage.getItem("datas")) || [];
  const index = storedContent.findIndex((item) => item.input_value === inputValue);

  if (index !== -1) {
    storedContent.splice(index, 1);
    localStorage.setItem("datas", JSON.stringify(storedContent));
  }
}

function saveContents(listItemsHTML, inp_value, index) {

  storedContent = JSON.parse(localStorage.getItem("datas")) || [];

  const objCont = {
    task_val: listItemsHTML,
    input_value: inp_value,
  };

  if (index === -1) {
    storedContent.push(objCont);
  } else {
    storedContent[index] = objCont;
  }

  localStorage.setItem("datas", JSON.stringify(storedContent));
}


function show() {
  stor = JSON.parse(localStorage.getItem("datas")) || [];

  const list_items = document.getElementById("tasks");
  list_items.innerHTML = "";

  for (let i = 0; i < stor.length; i++) {

    
    let {  input_value } = stor[i];

    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content = document.createElement("div");
    task_content.classList.add("content");


    task_el.appendChild(task_content);

    const task_input = document.createElement("input");
    task_input.classList.add("text");
    task_input.type = "text";
    task_input.value = input_value || "";
    task_input.setAttribute("readonly", "readonly");

    task_content.appendChild(task_input);

    const task_action = document.createElement("div");
    task_action.classList.add("actions");

    const edit_action = document.createElement("button");
    edit_action.classList.add("edit");
    edit_action.innerHTML = "Edit";

    const del_action = document.createElement("button");
    del_action.classList.add("delete");
    del_action.innerHTML = "Delete";

    task_action.appendChild(edit_action);
    task_action.appendChild(del_action);

    task_el.appendChild(task_action);

    list_items.appendChild(task_el);

    edit_action.addEventListener("click", () => {
      editing(edit_action, task_input, i);
    });
  
    del_action.addEventListener("click", () => {
      deleting(list_items, task_el);
    });

  }
}

show();
