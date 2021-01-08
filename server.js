const mysql = require("mysql");
const inquirer = require("inquirer");
const express = require("express");
const cTable = require("console.table");

const app = express();
const PORT = 3301;

const connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "root",
  database: "employee_tracker_app_DB"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);

    startSearch();
});

function startSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                {
                    name: "Add a department",
                    value: "addDepartment",
                },
                {
                    name: "Add a role",
                    value: "addRole",
                },
                {
                    name: "Add an employee",
                    value: "addEmployee",
                },
                {
                    name: "View all departments, roles, or employees",
                    value: "view",
                },
                {
                    name: "Update employee roles",
                    value: "update",
                },
                {
                    name: "Delete a department",
                    value: "deleteDepartment",
                },
                {
                    name: "Delete a role",
                    value: "deleteRole",
                },
                {
                    name: "Delete an employee",
                    value: "deleteEmployee",
                },
                new inquirer.Separator(),
                {
                    name: "Exit The Employee Tracker",
                    value: "exit",
                },
            ]
        })

        .then(function (answer) {
            switch (answer.action) {
                case "view":
                    viewAll();
                    break;

                case "addDepartment":
                    addDepartment();
                    break;

                case "addRole":
                    addRole();
                    break;

                case "addEmployee":
                    addEmployee();
                    break;

                case "update":
                    updateRole();
                    break;

                case "deleteDepartment":
                    deleteDepartment();
                    break;

                case "deleteRole":
                    deleteRole();
                    break;

                case "deleteEmployee":
                    deleteEmployee();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}

function deleteDepartment() {
    // This displays a table of the departments with all the ID's
    displayAllDepartments();

    inquirer
        .prompt({
            name: "departmentId",
            type: "input",
            message: "Enter the ID of the department you want to delete",
        })
        .then((answer) => {
            console.log("Deleting department...\n");

            // Thhis deletes a department
            connection.query(
                "DELETE FROM department WHERE ?",
                {
                    id: answer.departmentId,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Department deleted!\n");

                    // startSearch();
                }
            );

            // This updates the table of roles which updates the id numbers once a department is deleted
            connection.query(
                "UPDATE roles SET ? WHERE ?",
                [
                    {
                        department_id: "0",
                    },
                    {
                        department_id: answer.departmentId,
                    },
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log(
                        "Roles that were assigned to this department have been updated to '0' which signifies that they are now unassigned to a department.\n"
                    );
                }
            );

            startSearch();
        });
}
function deleteRole() {
    // This displays the department table to view all IDs
    displayAllRoles();

    inquirer
        .prompt({
            name: "roleId",
            type: "input",
            message: "Enter the ID of the role you want to delete",
        })
        .then((answer) => {
            console.log("Deleting role...\n");

            // This deletes a role from table
            connection.query(
                "DELETE FROM roles WHERE ?",
                {
                    id: answer.roleId,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Department deleted!\n");
                }
            );

            // This updates the employee table which updates the id numbers once the role is deleted
            connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                    {
                        role_id: "0",
                    },
                    {
                        role_id: answer.roleId,
                    },
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log(
                        "Employees that were assigned to this role have been updated to '0' which signifies that they are now unassigned to a role.\n"
                    );
                }
            );

            startSearch();
        });
}

function deleteEmployee() {
    // This displays the department table to view all IDs
    displayAllEmployees();

    inquirer
        .prompt({
            name: "employeeId",
            type: "input",
            message: "Enter the ID of the employee you want to delete",
        })
        .then((answer) => {
            console.log("Deleting employee...\n");
            connection.query(
                "DELETE FROM employee WHERE ?",
                {
                    id: answer.employeeId,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee deleted!\n");
                }
            );

            startSearch();
        });
}

function updateRole() {
    let employeeId;

    // This displays the department table to view all IDs
    displayAllEmployees();

    inquirer
        .prompt({
            name: "employeeId",
            type: "input",
            message: "Enter the ID of the employee you want to update",
        })
        .then((answer) => {
            employeeId = answer.employeeId;

            // This displays the table of roles in order to select a role ID
            displayAllRoles();

            inquirer
                .prompt({
                    name: "roleId",
                    type: "input",
                    message: "Enter the role ID you want the user to have",
                })
                .then((answer) => {
                    console.log("Updating employee role...\n");

                    connection.query(
                        "UPDATE employee SET ? WHERE ?",
                        [
                            {
                                role_id: answer.roleId,
                            },
                            {
                                id: employeeId,
                            },
                        ],
                        function (err, res) {
                            if (err) throw err;
                            console.log("Employee role updated!\n");

                            startSearch();
                        }
                    );
                });
        });
}

function addDepartment() {
    inquirer
        .prompt({
            name: "department_name",
            type: "input",
            message: "What is the name of the department you want to add?",
        })
        .then((answer) => {
            console.log("Adding a new department...\n");
            connection.query(
                `INSERT INTO department SET ?`,
                {
                    department_name: answer.department_name,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("New department added!\n");

                    startSearch();
                }
            );
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the name of the role that you would like to add?",
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of this role?",
                validate: function (value) {
                    let valid = !isNaN(value);
                    return valid || "Please enter a number";
                },
            },
            {
                name: "department_id",
                type: "input",
                message: "What is this role's department ID?",
            },
        ])
        .then((answer) => {
            console.log("Adding a new role...\n");
            connection.query(
                `INSERT INTO roles SET ?`,
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("New role added!\n");
                    startSearch();
                }
            );
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?",
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?",
            },
            {
                name: "roleId",
                type: "input",
                message: "What is this employee's role ID?",
            },
            {
                name: "managerId",
                type: "input",
                message: "What is this employee's manager ID?",
            },
        ])
        .then((answer) => {
            console.log("Adding a new employee...\n");
            connection.query(
                `INSERT INTO employee SET ?`,
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleId,
                    manager_id: answer.managerId,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("New role added!\n");

                    startSearch();
                }
            );
        });
}

function viewAll() {
    inquirer
        .prompt({
            name: "table",
            type: "list",
            message:
                "Would you like to view all departments, roles, or employees?",
            choices: [
                {
                    name: "Departments",
                    value: "department",
                },
                {
                    name: "Roles",
                    value: "roles",
                },
                {
                    name: "Employees",
                    value: "employee",
                },
            ],
        })
        .then(function (answer) {
            console.log(`Selecting all from ${answer.table}...`);

            switch (answer.table) {
                case "department":
                    displayAllDepartments();
                    break;

                case "roles":
                    displayAllRoles();
                    break;

                case "employee":
                    displayAllEmployees();
                    break;
            }

            startSearch();
        });
}

function displayAllEmployees() {
    let query = "SELECT * FROM employee ";
    connection.query(query, (err, res) => {
        if (err) throw err;

        console.log("\n\n ** Full Employee list ** \n");
        console.table(res);
    });
}

function displayAllRoles() {
    let query = "SELECT * FROM roles ";
    connection.query(query, (err, res) => {
        if (err) throw err;

        console.log("\n\n ** Full Role list ** \n");
        console.table(res);
    });
}

function displayAllDepartments() {
    let query = "SELECT * FROM department ";
    connection.query(query, (err, res) => {
        if (err) throw err;

        console.log("\n\n ** Full Department list ** \n");
        console.table(res);
    });
}

// This starts the server
app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});