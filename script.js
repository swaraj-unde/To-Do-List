document.addEventListener("DOMContentLoaded", () => {
  let field = document.getElementById("field");
  let addbutton = document.getElementById("InButton");
  let list = document.getElementById("list");

  let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];

  tasks.forEach((task) => displaytask(task));

  addbutton.addEventListener("click", () => {
    const text = field.value.trim();
    if (text === "") return;
    const newTask = {
      id: Date.now(),
      data: text,
      done: false,
    };
    tasks.push(newTask);
    saveTask();
    field.value = "";
    console.log(tasks);
    displaytask(newTask);
  });

  function displaytask(task) {
    let li = document.createElement("li");
    li.setAttribute("data-id", task.data);
    li.id = `item`;
    li.innerHTML = `
    <p id="para">${task.data}</p>
    <button id="del" class="btnr">Delete</button>
    `;
    if (task.done) {
      let p = li.querySelector("p");
      p.classList.add("complete");
    }
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "P") {
        task.done = !task.done;
        let p = li.querySelector("p");
        p.classList.toggle("complete");
        saveTask();
      }
    });
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTask();
    });
    list.appendChild(li);
  }

  function saveTask() {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  }
});
