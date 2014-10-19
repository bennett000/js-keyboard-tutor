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

var server = require('http').createServer(serve),
io = require('socket.io')(server),
fs = require('fs'),
midiInput = require('./midi-input.js'),
config = require('./config.js'),
midiModuleStatus,
events = require('./events.js'),
/** @const */
defaultIndex = '<html><body>default</body></html>',
index;

function cacheIndex() {
    'use strict';

    try {
        index = fs.readFileSync('www/index.html', 'utf-8');
    } catch (err) {
        console.warn(err.message);
        index = defaultIndex;
    }
}

function serve(req, res) {
    'use strict';

    if (!index) {
        cacheIndex();
    }

    res.writeHead(200);
    res.end(index);
}

function initEvents() {
    'use strict';

    Object.keys(events.events).forEach(function (message) {
        io.on(message, function (data) {
            io.emit(message, events.events[message](data));
        });
    });
}

function midiStatus(val) {
    'use strict';

    if (val === undefined) {
        return midiModuleStatus;
    }
    midiModuleStatus = val;
    return midiModuleStatus;
}

function init() {
    'use strict';

    initEvents();
    midiModuleStatus = midiInput.init();
    server.listen(config.port());
    console.log('');
    console.log('Piano Typing Tutor - Listening On Port ' + config.port());
    console.log('');
}

function restart() {
    'use strict';

    server.close(init);
}

init();

module.exports.io = io;
module.exports.init = restart;
module.exports.midiStatus = midiStatus;
