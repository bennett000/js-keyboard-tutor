/**
 * @preserve @license @cc_on
 * Copyright © 2014 Michael J. Bennett
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var midi = require('midi'),
input = new midi.input(),
config = require('./config.js');

/**
 * @returns {number}
 */
function totalPorts() {
    'use strict';

    return input.getPortCount();
}

/**
 * @returns {Array.<String>}
 */
function listPorts() {
    'use strict';

    var i,
        length = totalPorts(),
        list = [];

    for (i = 0; i < length; i += 1) {
        list.push(input.getPortName(i));
    }

    return list;
}

/**
 * @param name {string} name of the port as described by midi's "getPortName"
 */
function openPort(name) {
    'use strict';

    var ports = listPorts(),
        index = [ports.indexOf(name)];

    if (+index === -1) {
        throw new Error('midiInput: openPort: port ' + name + ' not found');
    }

    input.openPort(index);
    input.ignoreTypes(false, false, false);
}

/**
 * @returns {boolean}
 */
function openDefault() {
    'use strict';

    var defaultName = config.defaultDevice();

    if (defaultName === null) {
        return null;
    }

    try {
        openPort(defaultName);
    } catch (err) {
        return false;
    }

    return true;
}

//console.log(listPorts().join('\n'));
//
//input.openPort(1);
//
//input.on('message', function (deltaTime, message) {
//    console.log('M:', message, 'd:', deltaTime);
//});


function on() {

}

function start() {

}

function stop() {

}

function init() {

}

module.exports.init = init;
module.exports.start = start;
module.exports.stop = stop;
module.exports.on = on;
module.exports.helpers = {
    openDefault: openDefault,
    openPort: openPort,
    listPorts: listPorts,
    totalPorts: totalPorts
};
