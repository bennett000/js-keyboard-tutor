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

var express = require('express'),
app = express(),
http = require('http').Server(app),
io = require('socket.io')(http),
midiInput = require('./midi-input.js'),
config = require('./config.js'),
midiModuleStatus,
events = require('./events.js');


function initEvents(socket) {
    'use strict';

    Object.keys(events.events).forEach(function (message) {
        socket.on(message, function (data) {
            socket.emit(message, events.events[message](data));
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

    midiModuleStatus = midiInput.init();
    app.use(express.static(__dirname + '/www'));
    http.listen(config.port(), function () {
        console.log('');
        console.log('Piano Typing Tutor - Listening On Port ' + config.port());
        console.log('');
    });
    io.on('connection', function (socket) {
        console.log('connected');
        initEvents(socket);
    });
}

function restart() {
    'use strict';

    //server.close(init);
}

init();

module.exports.io = io;
module.exports.init = restart;
module.exports.midiStatus = midiStatus;
