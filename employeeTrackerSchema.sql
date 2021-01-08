DROP DATABASE IF EXISTS employee_tracker_app_DB;

CREATE DATABASE employee_tracker_app_DB;

USE employee_tracker_app_DB;

CREATE TABLE Department(
id INTEGER auto_increment not null,
name VARCHAR(50) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE Role(
id INTEGER auto_increment not null,
title VARCHAR(50) NOT NULL,
salary DECIMAL NOT NULL,
department_id INTEGER NOT NULL,
CONSTRAINT fk_department_id FOREIGN KEY (department_id) REFERENCES department(id),
PRIMARY KEY(id)
);

CREATE TABLE Employee(
id INTEGER auto_increment not null,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
role_id INTEGER NOT NULL,
CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES role(id),
manager_id INTEGER ,
CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) REFERENCES employee(id),
PRIMARY KEY(id)
);

SELECT * FROM Employee;
SELECT * FROM Role;
SELECT * FROM Department;

INSERT INTO Department (name)
VALUES ("SALES");
INSERT INTO Department (name)
VALUES ("Engineering");
INSERT INTO Department (name)
VALUES ("Finace");
INSERT INTO Department (name)
VALUES ("Legal");
INSERT INTO Department (name)
VALUES ("Manager");

SELECT * FROM Department;

INSERT INTO Role (title, salary, department_id)
VALUES ("Sales Head", 50000, 1);
INSERT INTO Role (title, salary, department_id)
VALUES ("Sales Representative", 30000, 2);
INSERT INTO Role (title, salary, department_id)
VALUES ("Senior Engineer", 55000, 3);
INSERT INTO Role (title, salary, department_id)
VALUES ("Accountant", 45000, 4);
INSERT INTO Role (title, salary, department_id)
VALUES ("Legal", 65000, 5);
INSERT INTO Role (title, salary, department_id)
VALUES ("Manager", 70000, 6);

SELECT * FROM Role;


INSERT INTO Role (first_name, last_name, role_id)
VALUES ("Jesus", "Emmanuel", 1);
INSERT INTO Role (first_name, last_name, role_id)
VALUES ("Paul", "Abraham", 2);
INSERT INTO Role (first_name, last_name, role_id)
VALUES ("Moses", "Levi", 3);
INSERT INTO Role (first_name, last_name, role_id)
VALUES ("Joshua", "Caleb", 4);
INSERT INTO Role (first_name, last_name, role_id)
VALUES ("Samuel", "David", 5);
INSERT INTO Role (first_name, last_name, role_id)
VALUES ("John", "Peter", 6);
INSERT INTO Role (first_name, last_name, role_id)
VALUES ("Luke", "Matthew", 7);
INSERT INTO Role (first_name, last_name, role_id)
VALUES ("Anna", "Esther", 8);
INSERT INTO Role (first_name, last_name, role_id)
VALUES ("Mary", "Elizabeth", 9);
INSERT INTO Role (first_name, last_name, role_id)
VALUES ("Sarah", "Naomi", 10);
INSERT INTO Role (first_name, last_name, role_id)
VALUES ("Hannah", "Joanna", 11);
INSERT INTO Role (first_name, last_name, role_id)
VALUES ("Deborah", "Lois", 12);

SELECT * FROM Employee;