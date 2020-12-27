/*
Middleman - Peer Reviewed Image API's.
Copyright (C) 2020 CollierDevs

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
*/

const chalk = require('chalk');
let { version } = require('../../package.json');

function splash() {
    console.log(chalk.redBright(`Loading Middleman...\nVersion ${version}\n`))
}

function debug(data) {
    if (!data) process.exit(1);
    console.log(chalk.white(`[DEBUG]: ${data}`))
}

function log(data) {
    if (!data) process.exit(1);
    console.log(chalk.greenBright(`[INFO]: ${data}`))
}

function warn(data) {
    if (!data) process.exit(1);
    console.log(chalk.yellowBright(`[WARN]: ${data}`))
}

function error(data) {
    if (!data) process.exit(1);
    console.log(chalk.redBright(`[ERROR]: ${data}`))
}

module.exports = {
    splash,
    debug,
    log,
    warn,
    error
};