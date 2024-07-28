
import fs from 'fs';
import path from 'path';

const createStructure = (structure, basePath) => {
  const createDir = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  };

  const createFile = (filePath) => {
    const dir = path.dirname(filePath);
    createDir(dir);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '');
    }
  };

  const traverse = (node, currentPath) => {
    for (const [key, value] of Object.entries(node)) {
      const newPath = path.join(currentPath, key);
      if (typeof value === 'object' && value !== null) {
        createDir(newPath);
        traverse(value, newPath);
      } else {
        createFile(newPath);
      }
    }
  };

  traverse(structure, basePath);
};

const structure = {
  "name": "todo-backend",
  "description": "A simple todo backend API",
  "tech_stack": [
    "NodeJS",
    "Express",
    "MongoDB"
  ],
  "directory_structure": {
    "src": {
      "app.js": "main application file",
      "routes": {
        "todos.js": "routes for handling todo operations"
      },
      "models": {
        "todo.js": "schema and methods for todo model"
      },
      "db": {
        "mongoose.js": "database connection and configuration"
      }
    },
    "test": {
      "todos.test.js": "tests for todo routes",
      "models.test.js": "tests for todo models",
      "db.test.js": "tests for database connection"
    },
    "config": {
      "default.json": "default configuration settings"
    },
    "bin": {
      "www": "script to start the application"
    },
    ".env": "environment variables"
  }
};
const basePath = 'C:\\Coding\\Projects\\example code\\code\\create_a_simple_todo_backend';
createStructure(structure, basePath);
