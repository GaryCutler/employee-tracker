const inquirer = require("inquirer");
const mysql = require("mysql2");
const logo = require("asciiart-logo");
const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "password",
      database: "company_db",
    },
    console.log(`Connected to employees_db database.`)
  );

  function init(){
    const logoText = logo({ name: "example \n :p" }).render();
  console.log(logoText);

  inquirer.prompt([
    {
      type: "list",
      name: "openingMessage",
      message: "what would you like to do",
      choices: [
          "viewAllEmployees",
          "viewAllDepartments",
          "viewAllRoles",
          "addADepartment",
          "addARole",
          "addAEmployee",          
          "quit",
      ]

    }
  ]).then((answers)=>{
    let answerChoice = answers.openingMessage
    switch(answerChoice){
        case "viewAllEmployees":
          viewAllEmployees();
          break;
        case "viewAllDepartments":
          viewAllDepartments();
          break;
        case "viewAllRoles":
          viewAllRoles();
          break;
        case "addADepartment":
          addADepartment();
          break;
        case "addARole":
          addARole();
          break;
        case "addAEmployee":
          addAEmployee();
          break;      
        case "quit":
          quit();
          break;
        default:
          console.log("somethings wrong with you");
          break;
    }
  })
  } 
  function viewAllEmployees(){
    db.query("select * from employees", function(err, res){
        err? console.log(err): console.table(res), init()
    })
  }
  
  function viewAllDepartments(){
    db.query("select * from departments", function(err, res){
        err? console.log(err): console.table(res), init()
    })
  }

  function viewAllRoles(){
    db.query("select * from roles", function(err, res){
        err? console.log(err): console.table(res), init()
    })
  }

  function addADepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "addDepartment",
            message: "enter a department you want to add"

        }
    ]).then((departmentResponse)=>{
        let departmentName = departmentResponse.addDepartment
        db.query(`insert into departments (department_name) values ("${departmentName}")`, function(err, res){
            err? console.log(err): viewAllDepartments(), init()
        })
    })
  }
  function addARole(){
    db.query("select * from departments", function(err, res){
        if (err){
            console.log(err)
            init()
        }
        const departmentList = res.map((department)=>({
            value: department.department_id, name: department.department_name
        }))
        inquirer.prompt([
            {
                type: "input",
                name: "addRole",
                message: "enter new role"
            },
            {
                type: "input",
                name: "salary",
                message: "what is the salary?"
            },
            {
                type: "list",
                name: "departmentName",
                message: "which department does this role belong to",
                choices: departmentList
            }
        ]).then((roleResponses)=>{
            let departmentChoice = roleResponses.departmentName
            let roleName = roleResponses.addRole
            let roleSalary = roleResponses.salary
            db.query(`insert into roles (job_title, salary, department_id) values ("${roleName}","${roleSalary}","${departmentChoice}")`, function(err, res){
                err? console.log(err): viewAllRoles(), init()
            })
        })
    })
  }
  function addAEmployee() {
    db.query("SELECT * FROM roles", function (err, results) {
      if (err) {
        console.log(err);
        return init();
      }
  
      const roleChoices = results.map((role) => ({
        value: role.role_id,
        name: role.role_title,
      }));
      db.query("SELECT * FROM employees", function (err, employeeResults) {
        if (err) {
          console.log(err);
          return init();
        }
  
        const managerChoices = employeeResults.map((employee) => ({
          value: employee.employee_id,
          name: `${employee.first_name} ${employee.last_name}`,
        }));
  
        // Add an option for no manager
        managerChoices.push({ value: null, name: "No Manager" });
      ///inquirer
      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "Enter an employee name dood.",
          },
          {
            type: "input",
            name: "lastName",
            message: "enter an employee last name dood.",
          },
          {
            type: "list",
            name: "roleId",
            message: "wich role are we adding this guy to.",
            choices: roleChoices,
          },
          {
            type: "list",
            name: "managerId",
            message: "Select the employee's manager (or 'No Manager'):",
            choices: managerChoices,
          },
        ])
        .then((inquirerResponse) => {
          console.log("dood added: " + inquirerResponse.roleId);
          const roleId = inquirerResponse.roleId;
          const empName = inquirerResponse.firstName;
          const empLast = inquirerResponse.lastName;
          const managerId = inquirerResponse.managerId;
          db.query(
            `INSERT INTO employees 
                 (first_name, last_name, 
                  role_id, manager_id) VALUES 
                  ('${empName}', 
                  '${empLast}', 
                  '${roleId}',
                  '${managerId}')`,
            function (err, results) {
              err
                ? console.log(err)
                : viewAllEmployees(),
                init();
            }
          );
        });
    });
  });
  }
  function quit() {
    console.log("quitting you");
    process.exit();
  }
  init()

