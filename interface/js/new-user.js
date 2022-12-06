window.onload = init;
var headers = {};
var url = "http://localhost:3000/employee";

function init() {
    if (localStorage.getItem('token')) {
        headers = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        document.getElementById('back').addEventListener('click', () => window.location.href = "admin.html")
        document.getElementById('register').addEventListener('click', register);
    } else {
        window.location.href = "index.html";
    }
}

function register() {
    var name = document.getElementById('input-name').value;
    var last_names = document.getElementById('input-last-names').value;
    var phone_number = document.getElementById('input-phone-number').value;
    var email = document.getElementById('input-email').value;
    var password = document.getElementById('input-password').value;
    var address = document.getElementById('input-address').value;
    if (validateEmail(email)) {
        if (name != "" && last_names != "" && email != "" && password != ""){
            axios.post(url + "/new-user/", {
                "name": name,
                "last_names": last_names,
                "phone_number": phone_number,
                "email": email,
                "password": password,
                "address": address
            })
            .then(res => {
                if (res.data.code === 201) {
                    alert(`${res.data.message}`);
                    window.location.href = "admin.html";
                } else { alert(`${res.data.message}`); }
            })
            .catch(err => { console.log(err); });
        } else { alert("Incomplete values") }
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