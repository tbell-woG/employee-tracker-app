DROP DATABASE IF EXISTS employee_tracker_app_DB;

CREATE DATABASE employee_tracker_app_DB;

USE employee_tracker_app_DB;


CREATE TABLE employee
(id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT
);

CREATE TABLE roles
(id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL(10,2),
department_id INT
);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Jesus", "Emmanuel", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Paul", "Abraham", 2, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Moses", "Levi", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Joshua", "Caleb", 4, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Samuel", "David", 5, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("John", "Peter", 6, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Luke", "Matthew", 7, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Anna", "Esther", 8, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Mary", "Elizabeth", 9, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Sarah", "Naomi", 10, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Hannah", "Joanna", 11, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Deborah", "Lois", 12, 6);


INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 70000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Representative", 30000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Senior Engineer", 55000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 45000, 4);
INSERT INTO roles (title, salary, department_id)
VALUES ("Legal", 65000, 5);
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Head", 50000, 6);


CREATE TABLE department
(id INT PRIMARY KEY AUTO_INCREMENT,
department_name VARCHAR(30)
);

INSERT INTO department (department_name)
VALUES ("Manager");
INSERT INTO department (department_name)
VALUES ("Engineering");
INSERT INTO department (department_name)
VALUES ("Finace");
INSERT INTO department (department_name)
VALUES ("Legal");
INSERT INTO department (department_name)
VALUES ("Sales");

