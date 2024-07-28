
# Folder Structure Generator

## Overview

The Folder Structure Generator is a CLI tool designed to create a directory structure for your project based on user inputs. It uses Google Generative AI to generate a JSON representation of the directory structure, which can then be used to create the actual directories and files on your filesystem.

## Features

- **Interactive CLI**: Prompts users for details about their project, such as project idea, tech stack, and special requirements.
- **AI-Powered Generation**: Utilizes Google Generative AI to suggest a directory structure based on the provided details.
- **Customizable**: Allows users to confirm and modify the proposed structure before creation.
- **Automatic Code Generation**: Generates the necessary code to create the directory structure on the user's machine.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 14.x or above is recommended).
- **npm**: Node package manager, typically installed with Node.js.
- **Google Generative AI API Key**: Obtain an API key from Google for using the generative AI service.


## Installation
    
1. Clone the github repository:

   ```bash
   git clone https://github.com/JaswantSingh41/folder-structure-generator.git
   cd folder-structure-generator 

2. Install the necessary packages:

```bash
npm install
```

3. Set up your environment variables:


Create a new .env file in the root directory.

Add your Google Generative AI API key to the .env file:
```bash
API_KEY=your_api_key_here
```
## Usage/Run Locally

Run the CLI tool by executing the following command:
```
node cli.js 
```
Follow the prompts to enter details about your project. The tool will generate a proposed directory structure in JSON format. You can review and confirm the structure. If confirmed, the tool will generate a script to create the directory structure on your machine.

#### To create the directories and files, run the generated script:
```
node createStructure.js
```
## Project Structure

1. cli.js: The entry point for the CLI tool.
2. index.js: Main logic for handling user inputs, AI integration, and directory structure generation.
3. createStructure.js: Generated script for creating the directory structure.
## Demo Output

After running the ```node createStructure.js``` command, a typical project structure might look like this:

```
my-new-project/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── router/
│   │   ├── styles/
│   │   └── utils/
│   ├── public/
│   ├── package.json
│   └── .env
├── server/
│   ├── src/
│   │   ├── app.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── package.json
│   └── .env
├── scripts/
├── .eslintrc.js
├── README.md
└── package.json
```






## Contributing

Contributions are always welcome!

Feel free to contribute to the project by submitting issues or pull requests. 

For major changes, please open an issue first to discuss what you would like to change.


