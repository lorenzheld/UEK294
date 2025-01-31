
async function loadTasks() {
    const response = await fetch(url + put, {
        headers: {
            "Authorization" : "Bearer "+ localStorage.getItem("token")
        }
    });
    const data = await response.json();
    const dataArray = Array.isArray(data) ? data : [data]; // Stellt sicher, dass die Daten immer ein Array sind

    console.log(dataArray);
    TodoDiv.innerHTML = "";
    let n = null;
    let n1 = null;

    dataArray.forEach(element => {
        n = element.id;
        n1++;
        element.editBoo = 0;

        console.log(element);
        const id = document.createElement("p");
        const title = document.createElement("h3");
        const completed = document.createElement("input");
        const todoDivDiv = document.createElement("div");
        const button = document.createElement("button");
        const edit = document.createElement("button");
        let titleEdit;

        todoDivDiv.className = "todoDiv";
        todoDivDiv.id = "div" + n1;
        id.innerText = element.id;
        title.innerText = element.title;
        edit.innerText = "EDIT";

        completed.type = "checkbox";
        completed.checked = element.completed;

        todoDivDiv.appendChild(id);
        todoDivDiv.appendChild(title);
        todoDivDiv.appendChild(edit);
        todoDivDiv.appendChild(completed);
        todoDivDiv.appendChild(button);

        // Button
        button.innerText = "DELETE";
        button.className = "deletebtn";
        button.id = n;


        TodoDiv.appendChild(todoDivDiv);

        edit.addEventListener("click", () => {
            if (element.editBoo == 0) {
                todoDivDiv.innerHTML = "";
                titleEdit = document.createElement("input");
                titleEdit.value = element.title;
                edit.innerText = "submit";

                todoDivDiv.appendChild(id);
                todoDivDiv.appendChild(titleEdit);
                todoDivDiv.appendChild(edit);
                todoDivDiv.appendChild(completed);
                todoDivDiv.appendChild(button);
                element.editBoo = 1;
            } else {
                todoDivDiv.innerHTML = "";
                element.title = titleEdit.value;
                console.log(title);

                const newTitle = document.createElement("h3");
                newTitle.innerText = element.title;
                edit.innerText = "EDIT";

                todoDivDiv.appendChild(id);
                todoDivDiv.appendChild(newTitle);
                todoDivDiv.appendChild(edit);
                todoDivDiv.appendChild(completed);
                todoDivDiv.appendChild(button);

                fetch(url + put, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    },
                    body: JSON.stringify({
                        "completed": element.completed,
                        "title": element.title,
                        "id": button.id,
                    })
                });




    
                element.editBoo = 0;
            }
        })

        button.addEventListener("click", () => {
            todoDivDiv.remove();
            fetch(delurl + button.id, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                method: "DELETE"
            });
        });

        completed.addEventListener("change", () => {
            element.completed = !element.completed;

            fetch(url + put, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    "completed": element.completed,
                    "title": element.title,
                    "id": button.id,
                })
            });
        });
    });
}

