'use strict';

const inquirer = require('inquirer');
const addOptions = require('./options.js').addOptions;

function createPoll() {

  let questions = [
    {
      type: 'input',
      name: 'title',
      message: 'Title: ',
    },
    {
      type: 'confirm',
      name: 'multi',
      message: 'Allow multiple choices? ',
      default: false
    }
  ];

  inquirer.prompt(questions).then(function (answers) {
    addOptions(answers);
  });
}

module.exports = {
  createPoll
};
