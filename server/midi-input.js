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

function openPort(name) {
    'use strict';

    var ports = listPorts,
        index = [ports.indexOf(name)];

    if (index === -1) {
        throw new Error();
    }

    input.openPort(index);
}

function openDefault() {
    'use strict';

    var defaultName = config.defaultDevice();

    if (defaultName === null) {
        return null;
    }

    return openPort(defaultName);
}

console.log(listPorts().join('\n'));

input.openPort(1);

input.on('message', function (deltaTime, message) {
    console.log('M:', message, 'd:', deltaTime);
});

input.ignoreTypes(false, false, false);

module.exports.helpers = {
    openDefault: openDefault,
    openPort: openPort,
    listPorts: listPorts,
    totalPorts: totalPorts
};
