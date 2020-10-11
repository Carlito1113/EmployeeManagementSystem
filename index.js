// Require statements
const inquirer = require('inquirer')
const mysql = require('mysql');
const logo = require('asciiart-logo');
const cTable = require('console.table');
const DB = require("./db/dbFunctions")


// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);

// Function init()

function init () {
const logoText = logo({ name: "Employee"}).render();
console.log(logoText);

    // Load our prompts
    loadPrompts();
}


function loadPrompts () {
    inquirer.prompt ({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choice: [{
            name: "view All Employees",
            value: "VIEW_EMPLOYEES"
        }]
    })
    .then(answer => {
       // Switch statement
    switch (answer.choice) {
        case "VIEW_EMPLOYEES":
            return viewEmployees();
    } 
    })
    
}

