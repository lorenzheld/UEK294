
const form = document.forms.newTodo;
const url = "http://localhost:80/"
const put = "auth/jwt/tasks"
const delurl = "http://localhost:80/auth/jwt/task/"
const TodoDiv = document.getElementById("TodoList");
const newDiv = document.getElementById("newTodo");

login();






form.addEventListener("submit", async () => {
    event.preventDefault();
    const formData = new FormData(form);
    const todoTitle = formData.get("title");
    const todoCheckbox = formData.get("completed");
    const todoCheckboxBoolean = (todoCheckbox == "on" ? true : false);

    const response = await fetch(url + put, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
            "completed": todoCheckboxBoolean,
            "title": todoTitle,
            "id": 1
        })
    })
    console.log(response);
    loadTasks();
})





