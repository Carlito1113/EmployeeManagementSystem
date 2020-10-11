// Require statements
const inquirer = require('inquirer')
const mysql = require('mysql');
const logo = require('asciiart-logo');
const cTable = require('console.table');

console.table([
  {
    name: 'foo',
    age: 10
  }, {
    name: 'bar',
    age: 20
  }
]);


  // connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });


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
    // Switch statement
    switch (choice) {
        case "VIEW_EMPLOYEES":
            return viewEmployees();
    }
}

