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
        let conf = confirm("Are you sure you want to remove this employee?");
        (conf) ? deleteE() : window.location.href = 'admin.html';
               
    } else {
        window.location.href = 'index.html';
    }
}

function deleteE() {
    axios.delete(url + `/${id}`, headers)
    .then(res => {
        alert(res.data.message);
        window.location.href = "admin.hmtml"
    })
    .catch(err => console.log(err));
    window.location.href = "admin.html";
}
