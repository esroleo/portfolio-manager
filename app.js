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
const fs = require('fs');
const generatePage =  require('./src/page-template.js');

// slice(2...) - means start at index of 3. node app args(2) ++
const profileDataArgs = process.argv.slice(2, process.argv.length);

// Assign input to variables - Traditional Way //
// const userName = profileDataArgs[0];
// const github = profileDataArgs[1];

// *** ES6 feature - destructuring assignment *** //
const [userName, github] = profileDataArgs


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


// *** FS system *** //
// writeFileSync is asynchronous, no need to wait for the file to complete to run more code
fs.writeFileSync('index.html', generatePage(userName, github), err => {
  if (err) throw err;

  console.log('Portfolio complete! Check out index.html to see the output!');
});
