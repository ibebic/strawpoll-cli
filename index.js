'use strict';

const chalk = require('chalk');
const showResults = require('./showResults.js').showResults;
const createPoll = require('./createPoll.js').createPoll;
const args = process.argv.slice(2);
const open = require('opn');

let pollAddress = 'http://www.strawpoll.me/api/v2/polls/' + args[1];

switch (args[0]) {
  case '--create':
  case '-c':
    createPoll();
    break;
  case '--results':
  case '-r':
    if (isNaN(args[1])) {
      console.log(chalk.bold.red('Error: no poll ID is provided!'));
      break;
    }
    showResults(pollAddress);
    break;
  case '--vote':
  case '-v':
    if (isNaN(args[1])) {
      console.log(chalk.bold.red('Error: no poll ID is provided!'));
      break;
    }
    open('http://www.strawpoll.me/' + args[1]);
    break;
  default:
      console.log('Instructions:')
      console.log('Create a poll:    ', chalk.bold.green('--create'));
      console.log('View poll results:', chalk.bold.green('--results [poll_id]'));
      console.log('Vote on a poll:   ', chalk.bold.green('--vote    [poll_id]'));
}
