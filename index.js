// Require statements
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

// const logo = require('asciiart-logo');
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
};

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
        "Update Employee",
      ],
    })
    .then((answers) => {
      switch (answers.choice) {
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
        case "Update Employee":
          updateEmployee();
          break;
        default:
          viewRoles();
          break;
      }
    });
};

viewDepartments = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
};

viewAllEmployees = () => {
  connection.query("SELECT first_name, last_name FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
};

viewRoles = () => {
  connection.query("SELECT title FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
};

addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      name: "newDepartment",
      message: "What department would you like to add?",
    })
    .then((answers) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answers.newDepartment,
        },
        function (err, res) {
          if (err) throw err;
          console.table(res);

          loadPrompts();
        }
      );
    });
};

addEmployee = () => {
  connection.query(
    "SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id",
    function (err, results) {
      console.table(results);
      if (err) throw err;
      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "lastName",
            message: "What is their last name?",
          },
          {
            type: "rawlist",
            name: "role",
            message: "What is their role?",
            choices: function () {
              let choiceArray = [];
              for (let i = 0; i < results.length; i++) {
                choiceArray.push(results[i].title);
              }
              return choiceArray;
            },
          },
          {
            input: "input",
            name: "manager",
            message: "Who is their manager?",
          },
        ])
        .then((answers) => {
          let newRole;
          for (let i = 0; i < results.length; i++) {
            if (results[i].title === answers.role) {
              newRole = results[i];
            }
          }
          let newManager;
          for (let i = 0; i < results.length; i++) {
            if (results[i].first_name === answers.manager) {
              newManager = results[i];
            }
          }
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answers.firstName,
              last_name: answers.lastName,
              role_id: newRole.role_id,
              manager_id: newManager.manager_id,
            },

            function (err, res) {
              if (err) throw err;
              console.table(res);
              loadPrompts();
            }
          );
        });
    }
  );
};

addRole = () => {
  inquirer
    .prompt([
      {
        input: "input",
        name: "role",
        message: "What role would you like to add?",
      },
      {
        input: "input",
        name: "salary",
        message: "What is their salary?",
      },
      {
        input: "input",
        name: "id",
        message: "What is their ID?",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answers.role,
          salary: answers.salary,
          department_id: answers.id,
        },
        function (err) {
          if (err) throw err;
          loadPrompts();
        }
      );
    });
};

updateEmployee = () => {
  connection.query(
    "SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id",
    function (err, results) {
      console.table(results);
      if (err) throw err;
      inquirer
        .prompt([
          {
            type: "input",
            name: "employee",
            message: "Which employee would you like to update?",
          },
          {
            type: "input",
            name: "role",
            message: "What is their new role?",
            choices: function () {
              let choiceArray = [];
              for (let i = 0; i < results.length; i++) {
                choiceArray.push(results[i].title);
              }
              return choiceArray;
            },
          },
        ])
        .then((answers) => {
          let newRole;
          for (let i = 0; i < results.length; i++) {
            if (results[i].first_name === answers.employee) {
              newRole = results[i];
            }
          }

          // let newRole;
          // for (let i = 0; i < results.length; i++) {
          //   if (results[i].title === answers.role) {
          //     newRole = results[i];
          //   }
          // }

          connection.query(
            "UPDATE role SET ? WHERE ?",
            [
              {
                title: answers.role,
              },
              {
                id: newRole.role_id,
              },
            ],
            function (err) {
              if (err) throw err;
              console.log("Update successful.")
              loadPrompts();
            }
          );
        });
    }
  );
};
