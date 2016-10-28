'use strict';

const EventEmitter = require('events').EventEmitter;
const request = require('request');
const Pie = require('cli-pie');
const chalk = require('chalk');
const ora = require('ora');
const spinner = ora('Loading');

function showResults(pollAddress) {
  spinner.color = 'white';
  spinner.start();
  let body = new EventEmitter();
  request.get(pollAddress, function (error, response, data) {
    body.data = data;
    body.emit('update');
  });
  body.on('update', function () {
    spinner.text = 'Done';
    spinner.succeed();
    let obj = JSON.parse(body.data);
    let pollOptions = obj.options.length;
    let totalVotes = 0;
    console.log(chalk.bold('Poll subject:\n\n') + obj.title + '\n' + chalk.bold('\n-----RESULTS-----\n'));
    let resultPie = new Pie(12, [], { legend: true });
    for (let i = 0; i < pollOptions; i++) {
      totalVotes += obj.votes[i];
      resultPie.add({ label: obj. options[i], value: obj.votes[i] });
    }
    console.log('Total number of votes:', chalk.bold.green(totalVotes));
    console.log(resultPie.toString());
  });
}

module.exports = {
  showResults
};
