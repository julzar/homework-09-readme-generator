require('dotenv').config()
const axios = require('axios');
const inquirer = require('inquirer');
const fs = require('fs')
const generateMarkdown = require('./utils/generateMarkdown');
const getUser = require('./utils/api');


const questions = [
    [
        {
            type: 'input',
            name: 'username',
            message: 'Enter your GitHub username:'
        }
    ],
    [
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of your project:',
            default: 'No title yet.'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a description of your project:',
            default: 'No description yet.'
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Enter any installation instructions for your project:',
            default: 'No installation instructions yet.'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Enter any usage information about your project:',
            default: 'No usage information yet.'
        },
        {
            type: 'input',
            name: 'license',
            message: 'Enter a license for your project (see https://choosealicense.com/):',
            default: 'No license yet.'
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Enter any information about contributing to your project:',
            default: 'No information about contributing yet.'
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Enter any information about tests for this project:',
            default: 'No information about tests yet.'
        },
    ]
];

function question(q) {
    return inquirer.prompt(q)
};

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function(err) {
        if (err) {
            throw new Error(err)
        }
        else {
            console.log(`File written successfully to "my_readme".`)
        }
    })
};

async function init(filename, askUserData, askAppData) {
    try {
        let userData;
        let user = await question(askUserData);
        try {
            userData = await getUser(user.username);
        }
        catch {
            user = await question(askUserData);
            userData = await getUser(user.username);
        }
        const appData = await question(askAppData);
        const markdownData = await generateMarkdown(userData, appData);
        writeToFile(filename, markdownData)
    }
    catch (err) {
        throw new Error(err)
    }
}

init('./my_readme/README.md', questions[0], questions[1]);
