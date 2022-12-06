const express = require('express');
const jwt = require('jsonwebtoken');
const employee = express.Router();
const db = require('../config/db');

employee.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    let query = `SELECT * FROM employees WHERE email = '${email}'`;
    query += ` AND password = '${password}';`;
    const rows = await db.query(query);

    if (email && password) {
        if (rows.length === 1) {
            const token = jwt.sign({
                id: rows[0].id,
                mail: rows[0].mail
            }, "debubkey");
            return res.status(200).json({ code: 200, message: `${token}` })
        } else{ return res.status(200).json({ code: 401, message: "Incorrect Email and/or Password" }) }
    }
    
    return res.status(500).json({ code: 500, message: "Incomplete values" });
});

employee.post('/new-user', async (req, res, next) => {
    const { name, last_names, phone_number, email, password, address } = req.body;
    if (name && last_names && email && password) {
        let query = `INSERT INTO employees (name, last_names, phone_number, email, password, address) `;
        query += `VALUES ('${name}', '${last_names}', '${phone_number}', '${email}', '${password}', '${address}');`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "User inserted correctly" });
        }

        return res.status(500).json({ code: 500, message: "An error ocurred" });
    }
    return res.status(500).json({ code: 500, message: "Incomplete values" });
});

employee.delete('/:id([0-9]{1,3})', async (req, res, next) => {
    const query = `DELETE FROM employees WHERE id = '${req.params.id}';`
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Employee successfully deleted"});
    }
    return res.status(404).json({ code: 404, message: "Employee not found"});
});

employee.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const { name, last_names, phone_number, email, password, address } = req.body;
    if (name && last_names && email && password) {
        let query = `UPDATE employees SET name = '${name}',`;
        query += ` last_names = '${last_names}', phone_number = '${phone_number}',`;
        query += ` email = '${email}', password = '${password}', address = '${address}'`
        query += ` WHERE id = '${req.params.id}';`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Employee succesfully updated" });
        }

        return res.status(500).json({ code: 500, message: "An error ocurred" });
    }
    return res.status(500).json({ code: 500, message: "Incomplete values" });
});

employee.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    const size = await db.query(`SELECT count(*) AS "size" FROM employees;`);
    if (id >= 1 && id <= size[0].size) {
        const emp = await db.query(`SELECT * FROM employees WHERE id = '${id}';`);
        return res.status(200).json({code: 200, message: emp});
    }
    return res.status(404).json({code: 404, message: "Employee not found" });
}); 

employee.get('/', async (req, res, next) => {
    const query = "Select * FROM employees;"
    const rows = await db.query(query);
    return res.status(200).json({ code: 200, message: rows });
});

module.exports = employee;