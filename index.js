// Require statements
const inquirer = require("inquirer");
const connection = require("./db/connection.js");
const DB = require("./db/dbFunctions.js")

// const logo = require('asciiart-logo');
// const cTable = require('console.table');


function init() {
// const logoText = logo({ name: "Employee"}).render();
// console.log(logoText);
    // Load our prompts
    loadPrompts();
}


function loadPrompts () {
    inquirer.prompt ({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
            "View Departments", 
            "View Employees", 
            "View Roles", 
            "Add Department", 
            "Add Employee", 
            "Add Role", 
            "Update Employee Role"
        ]
    })
    .then(answer => {
       // Switch statement
    switch (answer.choice) {
        case "View Departments":
            DB.viewDepartments();
            break;
        case "View Employees":
            DB.viewAllEmployees();
            break;
        case "View Roles":
            DB.viewRoles();
            break;            
        case "Add Department":
            DB.addDepartment();
            break;
        case "Add Employee":
            DB.addEmployee();
            break;
        case "Add Role":
            DB.addRole();
            break;
        case "Update Employee Role":
            DB.updateEmployeeRole();
            break;
        case "exit":
            connection.end();
            break;    
    } 
    })
    
}


 // Function init()
init();

module.exports = loadPrompts;