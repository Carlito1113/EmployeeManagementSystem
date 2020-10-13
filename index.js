// Require statements
const inquirer = require("inquirer");
const mysql = require("mysql");

// const logo = require('asciiart-logo');
// const cTable = require('console.table');

// function init() {
// // const logoText = logo({ name: "Employee"}).render();
// // console.log(logoText);
//     // Load our prompts
//     loadPrompts();
// }

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employees",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  init();
});

function init() {
  // const logoText = logo({ name: "Employee"}).render();
  // console.log(logoText);
  // Load our prompts
  loadPrompts();
}

function loadPrompts() {
  inquirer
    .prompt({
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View Departments",
        "View Employees",
        "View Roles",
        "Add Department",
        "Add Employee",
        "Add Role",
        "Update Employee Role",
      ],
    })
    .then((answer) => {
      switch (answer.choice) {
        case "View Departments":
          viewDepartments();
          break;
        case "View Employees":
          viewAllEmployees();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "exit":
          connection.end();
          break;
      }
    });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
}

function viewAllEmployees() {
  connection.query("SELECT first_name, last_name FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
}

function viewRoles() {
  connection.query("SELECT title FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
}
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "newDepartment",
      message: "What department would you like to add?",
    })
    .then((answer) => {
      connection.query(
        "INSERT INTO DEPARTMENT name VALUES = ?",
        answer,
        function (err, res) {
          if (err) throw err;
          console.table(res);
        }
      );
    });
}
function addEmployee() {
  connection.query("INSERT INTO DEPARTMENT name VALUES = ?", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
}

function addRole() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
}
