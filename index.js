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
          "updateEmployee",          
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
        case "updateEmployee":
          updateEmployee();
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
  
  
  
  init()

