// Require statements
const inquirer = require("inquirer");
const mysql = require("mysql");
// const logo = require('asciiart-logo');
// const cTable = require('console.table');
const DB = require("./db/dbFunctions.js")

 

// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);



function init () {
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
        // choice: [{
        //     name: "view All Employees",
        //     value: "VIEW_EMPLOYEES"
        // }]
        choices: ["View Departments", "View Employees", "View Roles", "Add Department", "Add Employee", "Add Role", "Update Employee Role"]
    })
    .then(answer => {
       // Switch statement
    switch (answer.choice) {
        // case "VIEW_EMPLOYEES":
        case "View Departments":
            return DB.viewDepartments();
        
        case "View Employees":
            return DB.viewAllEmployees();

        case "View Roles":
            return DB.viewRoles();
        
        case "Add Department":
            return DB.addDepartment();
        
        case "Add Employee":
            return DB.addEmployee();

        case "Add Role":
            return DB.addRole();
        
        case "Update Employee Role":
            return DB.updateEmployeeRole();
    } 
    })
    
}


 // Function init()
init();

module.exports = loadPrompts;