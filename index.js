#!/usr/bin/env node
// CLI To-Do App - saves tasks to JSON

const { Command } = require("commander");
const { addTask, listTasks } = require("./tasks");

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

program.parse(process.argv);
