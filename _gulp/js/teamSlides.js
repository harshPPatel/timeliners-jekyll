var teamData;
var JSON_SOURCE = './assets/json/teamMembers.json';

console.log(teamData);

fetch("assets/json/teamMembers.json")
  .then(res => res.json())
  .then(data => teamData = data);

 window.onload = function () {
  console.log(teamData[0].teamMembers);
  
 }

//  TODO: Create class of team slider with methods and init with selected element
// constructor takes html element as argument


// console.log(teamData[0].teamMmbers[0].name);
