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
  port: 3306,
  user: "root",
  password: "root",
  database: "employees",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  init();
});

init = () => {
  // const logoText = logo({ name: "Employee"}).render();
  // console.log(logoText);
  // Load our prompts
  loadPrompts();
}

loadPrompts = () => {
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

viewDepartments = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
}

viewAllEmployees = () => {
  connection.query("SELECT first_name, last_name FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
}

viewRoles = () => {
  connection.query("SELECT title FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
}
addDepartment = () => {
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




addEmployee = () => {
  connection.query("INSERT INTO DEPARTMENT name VALUES = ?", (err, res) => {
    if (err) throw err;
    console.table(res);
  });

  inquirer.prompt(
    {
    type: "input",
    name: "firstName",
    message: "What is the employee's first name?",
    validate: answer => {
      if (answer !== "") {
        return true;
      }
      return "Please enter a valid first name";
      }
    },
    {
      type: "input",
      name: "lastName",
      message: "What is their last name?",
      validate: answer => {
        if (answer !== "") {
          return true;
        }
        return "Please enter a valid last Name";
      }
    },
    {
      type: "list",
      name: "role",
      message: "What is their role?",
      choices: []
    },
    {
      type: "list",
      name: "manager",
      message: "Who is their manager?",
      choices: []
    })
    .then(answers => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answers.firstName,
          last_name: answers.lastName
        }
      )

      startPrompts();
    });

}

addRole = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
}
