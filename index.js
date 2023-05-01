const mysql = require("mysql2");
const inquirer = require("inquirer");
const fs = require("fs");

const connection = mysql.createConnection({
  host: "Localhost",
  user: "root",
  password: "password",
  database: "hr_db",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database!");
  }
});

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: "Select an option",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((answer) => {
      if (answer.option === "View all departments") {
        connection.query("SELECT * FROM departments", (err, results) => {
          console.table(results);
          init();
        });
      } else if (answer.option === "View all roles") {
        connection.query("SELECT * FROM roles", (err, results) => {
          console.table(results);
          init();
        });
      } else if (answer.option === "View all employees") {
        connection.query("SELECT * FROM employees", (err, results) => {
          console.table(results);
          init();
        });
      } else if (answer.option === "Add a department") {
        inquirer
          .prompt({
            type: "Input",
            name: "name",
            message: "What is the department name you would like to create?",
          })
          .then((answer) => {
            connection.query(
              "INSERT INTO departments(name) VALUES (?)",
              [answer.name],
              (err, results) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("New Department Added!");
                  connection.query(
                    "SELECT * FROM departments",
                    (err, results) => {
                      console.table(results);
                      init();
                    }
                  );
                }
              }
            );
          });
      } else if (answer.option === "Add a role") {
        inquirer
          .prompt([
            {
              type: "Input",
              name: "title",
              message: "What is the name of the role you would like to create?",
            },
            {
              type: "Input",
              name: "salary",
              message:
                "What is the salary of the role you would like to create?",
            },
            {
              type: "Input",
              name: "id",
              message: "What is department id for this role?",
            },
          ])
          .then((answer) => {
            connection.query(
              "INSERT INTO roles(title, salary, department_id) VALUES (?,?,?)",
              [answer.title, answer.salary, answer.id],
              (err, results) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("New Role Added!");
                  connection.query("SELECT * FROM roles", (err, results) => {
                    console.table(results);
                    init();
                  });
                }
              }
            );
          });
      } else if (answer.option === "Add an employee") {
        inquirer
          .prompt([
            {
              type: "Input",
              name: "firstname",
              message:
                "What is the first name of the employee you would like to add?",
            },
            {
              type: "Input",
              name: "lastname",
              message:
                "What is the last name of the employee you would like to add?",
            },
            {
              type: "Input",
              name: "id",
              message:
                "What is the role id of the employee you would like to add?",
            },
            {
              type: "Input",
              name: "manager",
              message:
                "What is the manager id of the employee you would like to add?",
            },
          ])
          .then((answer) => {
            const managerID = answer.manager === "" ? null : answer.manager;
            connection.query(
              "INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
              [answer.firstname, answer.lastname, answer.id, managerID],
              (err, results) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("New Employee Added!");
                  connection.query(
                    "SELECT * FROM employees",
                    (err, results) => {
                      console.table(results);
                      init();
                    }
                  );
                }
              }
            );
          });
      } else if (answer.option === "Update an employee role") {
        inquirer
          .prompt([
            {
              type: "Input",
              name: "id",
              message:
                "What is the id of the employee you would like to update?",
            },
            {
              type: "Input",
              name: "role",
              message:
                "What is the new role id of the employee you would like to update?",
            },
          ])
          .then((answer) => {
            connection.query(
              "UPDATE employees SET role_id = ? WHERE id = ?",
              [answer.role, answer.id],
              (err, results) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Employee Updated!");
                  connection.query(
                    "SELECT * FROM employees",
                    (err, results) => {
                      console.table(results);
                      init();
                    }
                  );
                }
              }
            );
          });
      }
    });
}

init();
