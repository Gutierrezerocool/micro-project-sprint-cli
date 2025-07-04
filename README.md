# CLI To-Do App

A simple command-line to-do list manager that saves tasks to a JSON file.

## Requirements
- Node.js (v14 or higher recommended)
- npm (for installing dependencies)

## Installation
1. Clone or download this repository.
2. Install dependencies:
   ```sh
   npm install
   ```

## Usage

### 1. Menu Mode (Interactive)
Run the app in menu mode for an interactive experience:
```sh
node index.js menu
```
- Follow the prompts to add, list, delete, or edit tasks.

### 2. Command Mode (Direct CLI)
You can also use direct commands:

- **Add a task:**
  ```sh
  node index.js add "Your new task"
  ```

- **List all tasks:**
  ```sh
  node index.js list
  ```

- **Delete a task by number:**
  ```sh
  node index.js delete 1
  ```

- **Edit a task by number:**
  ```sh
  node index.js edit 1 "Updated task text"
  ```

- **List all available commands:**
  ```sh
  node index.js help-commands
  ```

## Data Storage
- Tasks are stored in `tasks.json` in the project directory.

## Testing Edge Cases
Run the provided edge-case tests:
```sh
node edge-cases.test.js
```

## Notes
- Task numbers correspond to their position in the list (starting from 1).
- The app handles invalid input and empty lists gracefully.

---
Enjoy managing your tasks from the command line!
