var inquirer = require('inquirer');

console.log("start requests");

inquirer
  .prompt([
    {
        name:"target_folder",
        message:"creation du symlink front/src/shared vers le dossier back/shared\nentrez le dossier racine de l'appli front liée"
    }
  ])
  .then((answers) => {
    console.log("answers",answers);
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
      console.log(error);
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });