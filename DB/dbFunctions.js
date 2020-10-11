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

    
};

module.exports = new DB();