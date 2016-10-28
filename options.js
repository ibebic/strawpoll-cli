'use strict';

const inquirer = require('inquirer');
const request = require('request');
const chalk = require('chalk');
const open = require('opn');
const ora = require('ora');
const spinner = ora('Loading');

  let output = [];
  let additionals = [
    {
      type: 'input',
      name: 'options',
      message: 'Poll Question:'
    },
    {
      type: 'confirm',
      name: 'askAgain',
      message: 'Another question?',
      default: true
    }
  ];

function addOptions(originals) {
  inquirer.prompt(additionals).then(function (answers) {
    output.push(answers.options);
    if (answers.askAgain) {
      addOptions(originals);
    } else {
      spinner.color = 'white';
      spinner.start();
      let formattedReq = {'title': originals.title, 'options': output, 'multi': originals.multi};
      request({
        url: 'https://strawpoll.me/api/v2/polls',
        method: 'POST',
        followAllRedirects: true,
        json: formattedReq
      }, function(error, response, body) {
        spinner.text = 'Done';
        spinner.succeed();
        console.log('Poll created at http://www.strawpoll.me/' + chalk.bold.green(body.id));
        open('http://www.strawpoll.me/' + body.id);
        process.exit();
      });
    }
  });
}

module.exports = {
    addOptions
};
