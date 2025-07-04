#!/usr/bin/env node
// CLI To-Do App - saves tasks to JSON

const { Command } = require("commander");
const { addTask, listTasks, deleteTask, editTask } = require("./tasks");

function showMenu() {
  console.log(`\n==== TO-DO MENU ====`);
  console.log("1. Add a new task");
  console.log("2. List all tasks");
  console.log("3. Delete a task");
  console.log("4. Edit a task");
  console.log("5. List all available commands");
  console.log("0. Exit");
  console.log("====================\n");
}

function handleMenuSelection(choice, args) {
  switch (choice) {
    case "1":
      addTask(args[0] || "");
      console.log("✅ Task added:", args[0]);
      break;
    case "2":
      listTasks();
      break;
    case "3":
      deleteTask(Number(args[0]));
      break;
    case "4":
      editTask(Number(args[0]), args[1] || "");
      break;
    case "5":
      console.log("Available commands:");
      console.log("  add <task> - Add a new task");
      console.log("  list - List all tasks");
      console.log("  delete <number> - Delete a task by its number");
      console.log("  edit <number> <newTask> - Edit a task by its number");
      console.log("  help-commands - List all available commands");
      break;
    case "0":
      console.log("Goodbye!");
      process.exit(0);
    default:
      console.log("Invalid choice. Please select a valid option.");
  }
}

function main() {
  const args = process.argv.slice(2);
  if (args[0] === "menu") {
    showMenu();
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question("Select an option: ", (choice) => {
      let extraArgs = [];
      if (["1", "3", "4"].includes(choice)) {
        readline.question("Enter arguments (space separated): ", (input) => {
          extraArgs = input.split(" ");
          handleMenuSelection(choice, extraArgs);
          readline.close();
        });
      } else {
        handleMenuSelection(choice, []);
        readline.close();
      }
    });
  } else {
    // Fallback to commander CLI
    const program = new Command();
    program
      .command("add <task>")
      .description("Add a new task")
      .action((task) => {
        addTask(task);
        console.log("✅ Task added:", task);
      });
    program
      .command("list")
      .description("List all tasks")
      .action(() => {
        listTasks();
      });
    program
      .command("delete <number>")
      .description("Delete a task by its number (see list)")
      .action((number) => {
        deleteTask(Number(number));
      });
    program
      .command("edit <number> <newTask>")
      .description("Edit a task by its number (see list)")
      .action((number, newTask) => {
        editTask(Number(number), newTask);
      });
    program
      .command("help-commands")
      .description("List all available commands")
      .action(() => {
        console.log("Available commands:");
        program.commands.forEach((cmd) => {
          console.log(`  ${cmd.name()} - ${cmd.description()}`);
        });
      });
    program.parse(process.argv);
  }
}

main();
