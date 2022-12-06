window.onload = init;
var url = "http://localhost:3000";
const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");
let emps = [];

function init() {
    if (localStorage.getItem('token')) {
        headers = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        searchEmployee();
        searchInput.addEventListener("input", e => {
            const value = e.target.value.toLowerCase();
            emps.forEach(user => {
                const isVisible = user.name.toLowerCase().includes(value) ||
                user.last_names.toLowerCase().includes(value) || 
                user.email.toLowerCase().includes(value) || user.address.toLowerCase().includes(value) ||
                user.phone_number.includes(value) || user.id == value;
                user.element.classList.toggle("hide", !isVisible);
            });
        });
    } else {
        window.location.href = 'index.html';
    }
}



function searchEmployee() {
    axios.get(url + '/employee/', headers)
    .then(res => {
        emps = res.data.message.map(e => {
            const card  = userCardTemplate.content.cloneNode(true).children[0];
            const data_id = card.querySelector("[data-id]");
            const data_name = card.querySelector("[data-name]");
            const data_last_name = card.querySelector("[data-last-name]");
            const data_number = card.querySelector("[data-number]");
            const data_email = card.querySelector("[data-email]");
            const data_address = card.querySelector("[data-address]");
            let data_operations = card.querySelector("[data-operations]");
            let operations;
            data_id.textContent = e.id;
            data_name.textContent = e.name;
            data_last_name.textContent = e.last_names;
            data_number.textContent = e.phone_number;
            data_email.textContent = e.email;
            data_address.textContent = e.address;
            operations = `<a href=\"edit.html?id=${e.id}\" class=\"btn btn-secondary\">`;
            operations += `<i class=\"fas fa-marker\"></i></a><a href=\"delete.html?id=${e.id}\" `;
            operations += ` class=\"btn btn-danger\" id=\"delete"><i class=\"fas fa-trash-alt\"></i></a>`;
            data_operations.innerHTML = operations;
            userCardContainer.append(card);
            return { 
                id: e.id,
                name: e.name,
                last_names: e.last_names,
                phone_number: e.phone_number,
                email: e.email,
                address: e.address,
                element: card
            };
        });
    });
}