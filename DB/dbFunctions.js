const inquirer = require("inquirer");
const connection = require("./connection");


class DB {
    viewDepartments() {
        connection.query("SELECT * FROM department", function (err, res) {
            if (err) throw err;
            console.table(res);
        });
    }

    viewAllEmployees() {
        connection.query("SELECT * FROM employee", function (err, res) {
            if (err) throw err;
            console.table(res);
        });
    }

    viewRoles() {
        connection.query("SELECT * FROM role", function (err, res) {
            if (err) throw err;
            console.table(res);
        });
    }
    addDepartment() {
        inquirer.prompt({
            type: "input",
            name: "newDepartment",
            message: "What department would you like to add?"
        }).then(answer => {
            connection.query("INSERT INTO DEPARTMENT name VALUES = ?", answer, function (err, res) {
                if (err) throw err;
                console.table(res);
            })
        });
    }
    addEmployee() {
        connection.query("INSERT INTO DEPARTMENT name VALUES = ?", answer, function (err, res) {
            if (err) throw err;
            console.table(res);
        });
    }

    addRole() {
        connection.query("SELECT * FROM department", function (err, res) {
            if (err) throw err;
            console.table(res);
        });
    }



}

module.exports = new DB();