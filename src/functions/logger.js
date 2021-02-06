/*
Middleman - Peer Reviewed Image API's.
Copyright (C) 2020 Checksum

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


/**
 * 
 * @param {*} data 
 * Text to output to console.
 */
function debug(data) {
    if (!data) process.exit(1);
    console.log(chalk.magenta(`[DEBUG]: ${data}`))
}

/**
 * 
 * @param {*} data 
 * Text to output to console.
 */
function log(data) {
    if (!data) process.exit(1);
    console.log(chalk.greenBright(`[INFO]: ${data}`))
}

/**
 * 
 * @param {*} data 
 * Text to output to console.
 */
function warn(data) {
    if (!data) process.exit(1);
    console.log(chalk.yellowBright(`[WARN]: ${data}`))
}

/**
 * 
 * @param {*} data 
 * Text to output to console.
 */
function error(data) {
    if (!data) process.exit(1);
    console.log(chalk.redBright(`[ERROR]: ${data}`))
}

module.exports = {
    debug,
    log,
    warn,
    error
};