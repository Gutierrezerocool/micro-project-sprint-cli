const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'tasks.json');

function resetTasksFile(content = '[]') {
  fs.writeFileSync(DATA_FILE, content);
}

function readTasksFile() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

module.exports = {
  DATA_FILE,
  resetTasksFile,
  readTasksFile,
};
