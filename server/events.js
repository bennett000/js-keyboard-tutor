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

var midiInput = require('./midi-input.js'),
config = require('./config.js'),
serve = require('./serve.js');

/**
 * @returns {Array.<String>}
 */
function listDevices() {
    'use strict';

    return midiInput.list();
}

/**
 * @returns {string|boolean|null}
 */
function getDefaultDevice() {
    'use strict';

    return config.defaultDevice();
}

/**
 * @param val {string}
 * @returns {string|boolean|null}
 */
function setDefaultDevice(val) {
    'use strict';

    return config.defaultDevice(val);
}

/**
 * @returns {*}
 */
function listen() {
    'use strict';

    return midiInput.on(function (deltaTime, message) {
        console.log('we here');
        serve.io.emit('midi', { deltaTime: deltaTime, message: message });
    });
}

function isStarted () {
    'use strict';

    return !!serve.midiStatus();
}

function start(data) {
    'use strict';
    if (!data || !data.port) {
        return null;
    }

    try {
        midiInput.open(data.port);
    } catch (err) {
        return false;
    }
}

module.exports.events = {
    listDevices: listDevices,
    getDefaultDevice: getDefaultDevice,
    setDefaultDevice: setDefaultDevice,
    listen: listen,
    isStarted: isStarted,
    start: start
};