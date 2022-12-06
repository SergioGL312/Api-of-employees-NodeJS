window.onload = init;
var headers = {};
var url = "http://localhost:3000/employee";
var paramURL = new URLSearchParams(window.location.search);
var id = paramURL.get('id');

function init() {
    if (localStorage.getItem('token')) {
        headers = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        loadValues();
        document.getElementById('back').addEventListener('click', () => window.location.href = "admin.html")
        document.getElementById('update').addEventListener('click', update);
    } else {
        window.location.href = "index.html";
    }
}

function loadValues() {
    axios.get(url + `/${id}`, headers)
    .then(res => displayValue(res.data.message) )
    .catch(err => console.error(err) );
}

function displayValue(value) {
    let name = document.getElementById('input-name');
    let last_names = document.getElementById('input-last-names');
    let phone_number = document.getElementById('input-phone-number');
    let email = document.getElementById('input-email');
    let password = document.getElementById('input-password');
    let address = document.getElementById('input-address');
    name.value = value[0].name;
    last_names.value = value[0].last_names;
    phone_number.value = value[0].phone_number;
    email.value = value[0].email;
    password.value = value[0].password;
    address.value = value[0].address;
}

function update() {
    var name = document.getElementById('input-name').value;
    var last_names = document.getElementById('input-last-names').value;
    var phone_number = document.getElementById('input-phone-number').value;
    var email = document.getElementById('input-email').value;
    var password = document.getElementById('input-password').value;
    var address = document.getElementById('input-address').value;

    axios.put(url + `/${id}`, {
        "name": name,
        "last_names": last_names,
        "phone_number": phone_number,
        "email": email,
        "password": password,
        "address": address
    })
    .then(res => {
        if (res.data.code === 200) {
            alert(`${res.data.message}`);
            window.location.href = "admin.html";
        } else { alert(`${res.data.message}`); }
    })
    .catch(err => { console.log(err); });
}
