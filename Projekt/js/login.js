const emailForm = document.forms.login;

function login() {
    
    
    newDiv.style.display="none";
    TodoDiv.style.display="none";

    emailForm.addEventListener("submit", async () => {
        event.preventDefault();
        const emaiV = emailForm.email.value;
        const passwordV = emailForm.password.value;
        let token;

        fetch("http://localhost/auth/jwt/sign", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emaiV,
                password: passwordV
            })
            
        })
        .then((response) => response.json())
        .then((result) => 
            localStorage.setItem("token", result.token)
        )
        .then(() => {
            newDiv.style.display = "block";
            TodoDiv.style.display = "block";
            loadTasks();
        });


        console.log(response);



    });



}