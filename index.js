
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const askQuestions = async () => {
  const questions = [
    {
      type: 'input',
      name: 'projectIdea',
      message: 'What is your project idea?',
    },
    {
      type: 'input',
      name: 'techStack',
      message: 'What is the tech stack?',
    },
  ];
  return inquirer.prompt(questions);
};

const getGoogleGenerativeAIResponse = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContentStream([prompt]);
  let response = '';
  for await (const chunk of result.stream) {
    response += chunk.text();
  }
  return response;
};

const cleanJsonResponse = (response) => {
  // Remove backticks and other potential formatting issues
  return response.replace(/```json/g, '').replace(/```/g, '');
};

const generateCodeToCreateStructure = (jsonStructure, basePath) => {
  let code = `
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

const structure = ${JSON.stringify(jsonStructure, null, 2)};
const basePath = '${basePath.replace(/\\/g, '\\\\')}';
createStructure(structure, basePath);
`;

  return code;
};

const main = async () => {
  const answers = await askQuestions();
  const prompt = `Generate a directory structure in JSON format for a project with the following details:
  Project Idea: ${answers.projectIdea}
  Tech Stack: ${answers.techStack}`;
  
  let directoryStructure = await getGoogleGenerativeAIResponse(prompt);
  directoryStructure = cleanJsonResponse(directoryStructure);
  console.log('Proposed Directory Structure in JSON:\n', directoryStructure);

  const { confirmStructure } = await inquirer.prompt({
    type: 'confirm',
    name: 'confirmStructure',
    message: 'Are you okay with this directory structure?',
  });

  if (confirmStructure) {
    try {
      const parsedStructure = JSON.parse(directoryStructure);
      const projectDir = path.join(__dirname, answers.projectIdea.replace(/\s+/g, '_'));
      const creationCode = generateCodeToCreateStructure(parsedStructure, projectDir);
      
      console.log('Generated Code to Create Directory Structure:\n', creationCode);

      const { confirmCode } = await inquirer.prompt({
        type: 'confirm',
        name: 'confirmCode',
        message: 'Do you want to save and execute this code to create the directory structure?',
      });

      if (confirmCode) {
        const scriptPath = path.join(__dirname, 'createStructure.js');
        fs.writeFileSync(scriptPath, creationCode);
        console.log(`The code has been saved to ${scriptPath}. You can run it using 'node createStructure.js'`);
      }
    } catch (error) {
      console.error('Failed to parse the directory structure JSON:', error);
    }
  }
};

main();
