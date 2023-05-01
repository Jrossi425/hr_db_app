INSERT INTO departments (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
       ('Salesperson', 80000, 1),
       ('Lead Engineer', 200000, 2),
       ('Software Engineer', 150000, 2),
       ('Accountant', 140000, 3),
       ('Legal Advisor', 200000, 4),
       ('Lawyer', 180000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Lebron', 'James', 1, NULL),
       ('Kevin', 'Durant', 2, 1),
       ('Stephen', 'Curry', 3, NULL),
       ('Klay', 'Thompson', 4, 3),
       ('Draymond', 'Green', 5, NULL),
       ('Kawhi', 'Leonard', 6, NULL),
       ('Devin', 'Booker', 7, 6);