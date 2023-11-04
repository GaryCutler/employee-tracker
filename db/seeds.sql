-- Insert data into the departments table
INSERT INTO departments (department_name) VALUES
    ('HR'),
    ('Sales'),
    ('Engineering'),
    ('Marketing');

-- Insert data into the roles table
INSERT INTO roles (job_title, salary, department_id) VALUES
    ('HR Manager', 60000.00, 1),
    ('Sales Representative', 50000.00, 2),
    ('Software Engineer', 80000.00, 3),
    ('Marketing Specialist', 55000.00, 4);

-- Insert data into the employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL), -- HR Manager
    ('Alice', 'Smith', 2, 1),   -- Sales Representative, managed by John
    ('Bob', 'Johnson', 3, 1),   -- Software Engineer, managed by John
    ('Eva', 'Brown', 4, NULL);  -- Marketing Specialist