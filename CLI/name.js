const { Command } = require("commander");
const program = new Command();

program.option("-n, --name <name>");

program.parse(); // Process command-line arguments

const options = program.opts(); // Get the options

if (options.name) {
  console.log("Hello, " + options.name + "!");
} else {
  console.log("No name provided.");
}
