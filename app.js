//console.log("Hello Node!");

//console.log(document);



// var message = 'Hello Node!';
// var sum = 5 + 3;

// console.log(message);
// console.log(sum);

// process.argv captures the arguments that were passed as part of node js.
// comparable to document or window in the browswer

// *** Basics of process.argv *** //
// var commandLineArgs = process.argv; 
// console.log(commandLineArgs);
// *** End of Basics of process.argv *** //

// Removed the firts two entries of process.argv.
// Creates also an array 
//const profileDataArgs = process.argv.slice(2, process.argv.length);
// Notice the lack of parentheses around the `profileDataArr` parameter?
// const printProfileData = profileDataArr => {
//     for (let i = 0; i < profileDataArr.length; i++) {
//       console.log(profileDataArr[i]);
//     }
//   };
// using foreach
// const printProfileData = profileDataArr => {
//     // This...
//     for (let i = 0; i < profileDataArr.length; i += 1) {
//       console.log(profileDataArr[i]);
//     }
  
//     console.log('================');
  
//     // Is the same as this...
//     // profileDataArr.forEach((profileItem) => {
//     //   console.log(profileItem)
//     // });

//     // "Shorthand" //
//     profileDataArr.forEach(profileItem => console.log(profileItem));
//   };
  
// printProfileData(profileDataArgs);

// When using let and const inside a {} block it will only appolied to that block.
// If you have a global variable and re-declare it inside the block, it will not modify the global defintion.
// If you use var in the above exaple it will be replaced.

// If you se let inside a block {} and do not re-declare from the global state, it will be replaces similar to var.
// *** Example of new ES6 arrow functions *** //



// const printProfileData = profileDataArr => {
//     console.log(profileDataArr);
//   };

// Using function expression syntax
  // Using new arrow function syntax
//   const addNums = (numOne, numTwo) => {
//     return numOne + numTwo;
//   };
//   vs
// const addNums = function(numOne, numTwo) {
//     return numOne + numTwo;
//   };
  




//const addNums = (numOne, numTwo) => numOne + numTwo; Implicit return
// const addNums = (numOne, numTwo) => {
//     console.log(numOne, numTwo);
//     return numOne + numTwo;
//   };
  
//vs
//const sum = addNums(5, 3); // sum would be 8

//console.log(profileDataArgs);

/* Examle of const error on sting and number vs object and array

const animalArray = ['dog', 'cat', 'pig'];

animalArray.push('cow');

const personObj = {
  name: 'Lernantino',
  age: 99
};

personObj.age = 100;
personObj.occupation = 'Developer';
*/





// *** Code HTML Generator  *** //
// *** Import library and modules *** //

const fs = require('fs');
const generatePage =  require('./src/page-template.js');


const inquirer = require('inquirer');
// Check that inquirer library is working.
//console.log(inquirer);

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your GitHub name!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }
  ]);

  
}

const promptProject = portfolioData => {
  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  console.log(`
=================
Add a New Project
=================
`);
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your project name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your project description!');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your GitHub link!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ]).then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
};


// *** Enable to test index.html generation *** //

const mockData = 
{
  name: 'Lernantino',
  github: 'lernantino',
  confirmAbout: true,
  about:
     'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
  projects: [
    {
      name: 'Run Buddy',
      description:
        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
      languages: ['HTML', 'CSS'],
      link: 'https://github.com/lernantino/run-buddy',
      feature: true,
      confirmAddProject: true
    },
    {
      name: 'Taskinator',
      description:
        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
      languages: ['JavaScript', 'HTML', 'CSS'],
      link: 'https://github.com/lernantino/taskinator',
      feature: true,
      confirmAddProject: true
    },
    {
      name: 'Taskmaster Pro',
      description:
        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
      languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
      link: 'https://github.com/lernantino/taskmaster-pro',
      feature: false,
      confirmAddProject: true
    },
    {
      name: 'Robot Gladiators',
      description:
        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
      languages: ['JavaScript'],
      link: 'https://github.com/lernantino/robot-gladiators',
      feature: false,
      confirmAddProject: false
    }
  ]
};


const pageHTML = generatePage(mockData);

// *** Enable up to here to test index.html generation *** //

// promptUser()
//   .then(promptProject)
//   .then(portfolioData => {
//     const pageHTML = generatePage(portfolioData);

//     // fs.writeFile('./index.html', pageHTML, err => {
//     //   if (err) throw new Error(err);

//     //   console.log('Page created! Check out index.html in this directory to see it!');
//     // });
//   });

  

// promptUser().then(answers => console.log(answers));


  



// const pageHTML = generatePage(userName, github);

// // *** FS system *** //
// // writeFileSync is asynchronous, no need to wait for the file to complete to run more code
fs.writeFileSync('index.html', pageHTML , err => {
  if (err) throw err;

  console.log('Portfolio complete! Check out index.html to see the output!');
});










// slice(2...) - means start at index of 3. node app args(2) ++
// process.argv will be replaced with  inquirer
//const profileDataArgs = process.argv.slice(2, process.argv.length);

// Assign input to variables - Traditional Way //
// const userName = profileDataArgs[0];
// const github = profileDataArgs[1];

// *** ES6 feature - destructuring assignment *** //
//const [userName, github] = profileDataArgs


//const generatePage = () => 'Name: Jane, Github: janehub';

// Template Literals //

//const generatePage = (userName, githubName) => `Name: ${userName}, Github: ${githubName}`;

// Multi Line example  //

// *** Moved to page-template.js *** //

// const generatePage = (userName, github) => {
//   return `
//   <!DOCTYPE html> 
//   <html lang="en"> 
//   <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title>Portfolio Demo</title>
//   </head>

//   <body>
//     <h1>${userName}</h1>
//     <h2><a href="https://github.com/${github}">Github</a></h2>
//   </body>
//   </html>
//   `;
// };



//console.log(generatePage('Jane', 'janehub'));
//console.log(userName, github);
//console.log(generatePage(userName, github));


