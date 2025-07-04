const { execSync } = require('child_process');
const path = require('path');
const { DATA_FILE, resetTasksFile, readTasksFile } = require('./testHelpers');

const TODO_CMD = `node ${path.join(__dirname, 'index.js')}`;

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8' });
  } catch (e) {
    return e.stdout || e.message;
  }
}

function testAddWhitespaceTask() {
  resetTasksFile();
  run(`${TODO_CMD} add "     "`);
  const tasks = readTasksFile();
  if (tasks.length !== 1 || tasks[0].task.trim() !== "") {
    throw new Error('Failed to handle whitespace-only task');
  }
  console.log('testAddWhitespaceTask passed');
}

function testDeleteInvalidIndex() {
  resetTasksFile('[{"task":"Task 1","created":"2025-07-04T19:34:25.481Z"}]');
  const output = run(`${TODO_CMD} delete 5`);
  if (!output.toLowerCase().includes('invalid') && !output.toLowerCase().includes('not found')) {
    throw new Error('Failed to handle invalid delete index');
  }
  console.log('testDeleteInvalidIndex passed');
}

function testEditNonexistentTask() {
  resetTasksFile('[{"task":"Task 1","created":"2025-07-04T19:34:25.481Z"}]');
  const output = run(`${TODO_CMD} edit 3 "New Task"`);
  if (!output.toLowerCase().includes('invalid') && !output.toLowerCase().includes('not found')) {
    throw new Error('Failed to handle edit of nonexistent task');
  }
  console.log('testEditNonexistentTask passed');
}

// Run tests
try {
  testAddWhitespaceTask();
  testDeleteInvalidIndex();
  testEditNonexistentTask();
  console.log('All edge-case tests passed.');
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
