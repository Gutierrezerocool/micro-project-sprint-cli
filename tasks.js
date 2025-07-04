const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "tasks.json");

function addTask(task) {
  const tasks = getTasks();
  tasks.push({ task, created: new Date().toISOString() });
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}

function listTasks() {
  const tasks = getTasks();
  if (tasks.length === 0) {
    console.log("📭 No tasks found.");
    return;
  }

  tasks.forEach((t, i) => {
    console.log(`${i + 1}. ${t.task} (${t.created})`);
  });
}

function getTasks() {
  if (!fs.existsSync(FILE)) return [];
  const content = fs.readFileSync(FILE, "utf-8");
  try {
    return JSON.parse(content);
  } catch (e) {
    return [];
  }
}

module.exports = { addTask, listTasks };
