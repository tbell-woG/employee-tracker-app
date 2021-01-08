var inquirer = require("inquirer");
var connection = require('./connection');

const viewOptions = [
    "View Departments",
    "View Roles",
    "View Employees",
    "Update Employee",
    "Quit"
];

const employeeOptions = [
    "Jesus Emmanuel",
    "Paul Abraham",
    "Moses Levi",
    "Joshua Caleb",
    "Samuel David",
    "John Peter",
    "Luke Matthew",
    "Anna Esther",
    "Mary Elizabeth",
    "Sarah Naomi",
    "Hannah Joanna",
    "Deborah Lois",
    "Exit"

];

const updateOptions = [
    "First Name",
    "Last Name",
    "Role",
    "Exit"
];

runSearch();

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: viewOptions
        })
        
        .then(function (answer) {
            switch (answer.action) {
                case viewOptions[0]:
                    departmentView();
                    break;

                case viewOptions[1]:
                    roleView();
                    break;

                case viewOptions[2]:
                    employeeView();
                    break;

                case viewOptions[3]:
                    updateEmployee();

                case updateOptions[4]:
                    connection.end();
                    break
            }
        })
}

function departmentView(){
    var sqlStr = "SELECT * FROM department";
    connection.query(sqlStr, function (err, result){
        if (err) throw err;

        console.table(result)
        runSearch();
    })
}

function employeeView() {
    var sqlStr = "SELECT first_name, last_name, title, salary FROM employee";
    sqlStr += "Left JOIN role ";
    sqlStr += "ON employee.role_id = role.id"
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;

        console.table(result)
        runSearch();
    })
}

function roleView(){
    var sqlStr = "SELECT * FROM role";
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;

        console.table(result)
        runSearch();
    })
}

const updateEmployee = () => {
    
    function runUpdateSearch() {
        inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "Which employee would you like to update?",
                choices: employeeOptions
            })
    }

    runUpdateSearch();
}