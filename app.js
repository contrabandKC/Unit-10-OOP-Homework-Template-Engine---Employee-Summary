const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

let Name 

const teamMembers = [];
const idArray = []

function teamName() {
    inquirer.prompt([
        {
            type:"input",
            name: "name",
            message: "What is the Team name?"
        }
    ]).then(function(data){
    
        Name = data.name
        console.log(Name)
        menu()
    }) 
}

function manager() {
    inquirer.prompt([
        {
            type:"input",
            name: "name",
            message: "What is name of the manager?"
        },
        {
            type:"input",
            name: "id",
            message: "What is managers ID?"
        },
        {
            type:"input",
            name: "email",
            message: "What is email of the manager?"
        },
        {
            type:"input",
            name: "OfficeNumber",
            message: "What is Office number of the manager?"
        },
    
    ]).then(function(data){
    
        let name = data.name
        let id = data.id
        let email = data.email
        let officeNumber = data.OfficeNumber
        
        const manager = new Manager(name,id,email,officeNumber)
        teamMembers.push(manager)
        idArray.push(id)

        console.log(name, id, email, officeNumber, teamMembers)
        
        menu()
    })  
}

function addEngineer() {
    inquirer.prompt([
        {
            type:"input",
            name: "engineerName",
            message: "What is name of the engineer?"
        },
        {
            type:"input",
            name: "engineerId",
            message: "What is engineers ID?"
        },
        {
            type:"input",
            name: "engineerEmail",
            message: "What is Email of the engineer?"
        },
        {
            type:"input",
            name: "engineerGitHub",
            message: "What is Git Hub of the engineer?"
        },
    
    ]).then(function(data){
    
        let name = data.engineerName
        let id = data.engineerId
        let email = data.engineerEmail
        let gitHub = data.engineerGitHub
    
        const engineer = new Engineer(name,id,email,gitHub)

        teamMembers.push(engineer)

        console.log(name, id, email, gitHub), teamMembers
        menu()
    })  
}

function addIntern() {
    inquirer.prompt([
        {
            type:"input",
            name: "internName",
            message: "What is name of the intern?"
        },
        {
            type:"input",
            name: "internId",
            message: "What is interns ID?"
        },
        {
            type:"input",
            name: "internEmail",
            message: "What is Email of the intern?"
        },
        {
            type:"input",
            name: "internSchool",
            message: "What is your interns school?"
        },
    
    ]).then(function(data){
    
        let name = data.internName
        let id = data.internId
        let email = data.internEmail
        let school = data.internSchool

        const intern = new Intern(name, id, email, school)

        teamMembers.push(intern)
    
        console.log(name, id, email, school,teamMembers)
        menu()
    })  
}

function menu() {

    inquirer.prompt([
        {
            type:"list",
            name: "memberChoice",
            message: "Which team member would you like to add?",
            choices:[
                "Team Name",
                "Manager",
                "Engineer",
                "Intern",
                "Exit"
            ]
        }

    ]).then(choice=>{
        switch (choice.memberChoice) {
            case "Team Name":
                teamName()
                break;

            case "Manager":
                manager()
                break;

            case "Engineer":
                addEngineer()
                break; 

            case "Intern":
                addIntern()
                break;                
                

            default:
                buildTeam()
                break;
        }
    })
}


function buildTeam(){
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
}

menu()