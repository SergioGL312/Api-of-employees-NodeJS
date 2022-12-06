window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    if (localStorage.getItem('token')) {
        headers = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        loadEmployee();
        document.getElementById("new-user").addEventListener('click', () => window.location.href = 'new-user.html');
        document.getElementById("log-out").addEventListener('click', logout);
    } else {
        window.location.href = 'index.html';
    }
}

function loadEmployee() {
    axios.get(url + "/employee/", headers)
    .then(function(res) {
        displayEmployee(res.data.message);
    }).catch(function(err) {
        console.log(err);
    });
}

function displayEmployee(employee) {
    var table = document.getElementById("table");
    let stringTable = "<thead class=\"table-dark\"><tr><th>Id</th><th>Name</th><th>Last names</th>";
    stringTable += "<th>Phone number</th><th>Email</th><th>Address</th><th>Operations</th></tr></thead><tbody>";
    for (let e of employee) {
        let row = `<tr><td>${e.id}</td>`;
        row += `<td>${e.name}</td>`;
        row += `<td>${e.last_names}</td>`;
        row += `<td>${e.phone_number}</td>`;
        row += `<td>${e.email}</td>`;
        row += `<td>${e.address}</td>`;
        row += `<td><a href=\"edit.html?id=${e.id}\" class=\"btn btn-secondary\">`;
        row += `<i class=\"fas fa-marker\"></i></a>`;
        row += `<a href=\"delete.html?id=${e.id}\" class=\"btn btn-danger\" id=\"delete\">`;
        row += `<i class=\"fas fa-trash-alt\"></i></a></td></tr>`;
        stringTable += row;
    }
    table.innerHTML = stringTable + '</tbody>';
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}