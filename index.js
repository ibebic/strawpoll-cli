'use strict';

const chalk = require('chalk');
const showResults = require('./showResults.js').showResults;
const createPoll = require('./createPoll.js').createPoll;
const args = process.argv.slice(2);

let pollAddress = 'http://www.strawpoll.me/api/v2/polls/' + args[1];

switch (args[0]) {
  case '--create':
    createPoll();
    break;
  case '--results':
    if (isNaN(args[1])) {
      console.log(chalk.bold.red('Error: no poll ID is provided!'));
      break;
    }
    showResults(pollAddress);
    break;
}
