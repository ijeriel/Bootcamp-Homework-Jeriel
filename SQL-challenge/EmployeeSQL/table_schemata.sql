CREATE TABLE titles (
	title_id VARCHAR(10),
	title VARCHAR(30)
);

SELECT * FROM titles;

CREATE TABLE salaries (
	emp_no VARCHAR(10),
	salary INT
)

SELECT * FROM salaries

CREATE TABLE employees (
	emp_no VARCHAR(10),
	emp_title_id VARCHAR(10),
	birth_date VARCHAR(12),
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	sex VARCHAR(5),
	hire_date VARCHAR(12)
);

SELECT * FROM employees;

CREATE TABLE dept_manager (
	dept_no VARCHAR(10),
	emp_no VARCHAR(10)
);

SELECT * FROM dept_manager

CREATE TABLE dept_emp (
	emp_no VARCHAR(10),
	dept_no VARCHAR(10)
);

SELECT * FROM dept_emp

CREATE TABLE departments (
	dept_no VARCHAR(10),
	dept_name VARCHAR(20)
);

SELECT * FROM departments