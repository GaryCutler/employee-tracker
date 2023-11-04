DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
    department_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    role_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL(10, 2) UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE CASCADE
);

CREATE TABLE employees (
    employee_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE,
    manager_id INT UNSIGNED,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(employee_id) ON DELETE SET NULL
);