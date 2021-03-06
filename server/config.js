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

var fs = require('fs'),
    /** @const */
    configFile = __dirname + '/etc/config.json',
    config;

/**
 * Loads the config file
 */
function loadConfig() {
    'use strict';

    try {
        config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
    } catch (err) {
        config = {
            defaultDevice: null
        };
    }

    return config;
}

/**
 * @returns {boolean}
 */
function writeConfig() {
    'use strict';

    if (!config || typeof config !== 'object') {
        return false;
    }
    fs.writeFileSync(configFile, JSON.stringify(config));
    return true;
}

/**
 * @param newDefault {string=}
 * @returns {string|boolean|null}
 */
function defaultDevice(newDefault) {
    'use strict';

    if (newDefault === undefined) {
        return config.defaultDevice;
    }
    console.log('COonfig', config);
    config.defaultDevice = newDefault;
    return writeConfig();
}

function defaultPort(newDefault) {
    'use strict';

    if (newDefault === undefined) {
        return config.port;
    }
    config.port = +newDefault || 8000;
    return writeConfig;

}

function init() {
    'use strict';

    loadConfig();
}
init();

module.exports.init = init;
module.exports.defaultDevice = defaultDevice;
module.exports.port = defaultPort;
module.exports.load = loadConfig;
module.exports.save = writeConfig;