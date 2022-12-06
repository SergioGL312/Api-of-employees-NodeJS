window.onload = init;

function init() {
    if (!localStorage.getItem('token')) {
        document.querySelector('.btn-primary').addEventListener('click', login);
    } else {
        window.location.href = "admin.html";
    }
}

function login() {
    var email = document.getElementById('input-mail').value;
    var password = document.getElementById('input-password').value;
    if (validateEmail(email)) {
        if (email && password) {
            if (password !== "user") {
                axios.post("http://localhost:3000/employee/login", {
                "email": email,
                "password": password
                })
                .then(res => {
                    if (res.data.code === 200) {
                        localStorage.setItem("token", res.data.message);
                        window.location.href = "admin.html";
                    } else { alert("Error Incorrect email address and/or password"); }
                })
                .catch(err => console.log(err));
            } else{ alert("You don't have permission to access"); }
        } else { alert("Error missing fields"); }
    } else { alert('Type a valid email address'); }
    


}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return String(email)
      .toLowerCase()
      .match(
        re
    );
}