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

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs, it, module,inject */

var defaultDevice = 'red';

function FS() {
    'use strict';

    this.readFileSync = function () {};
    this.writeFileSync = function () {};
}

function Config() {
    'use strict';

    this.defaultDevice = function () { return 'One'; };
}

function Port(name) {
    'use strict';

    this.name = name || Date.now().toString(16) + Math.random();
    this.isOpen = false;
}

function Midi() {
    'use strict';
    var ports = {
        0: new Port('One')
    }, listeners = { 'message': []};

    this.getPortCount = function () { return Object.keys(ports).length; };
    this.ignoreTypes = function () { };
    this.getPortName = function (id) {
        if (!ports[id]) {
            return null;
        }
        return ports[id].name || null;
    };
    this.trigger = function (channel) {
        if (!listeners[channel]) {
            return;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        listeners[channel].forEach(function (fn) {
            try {
                fn.apply(null, args);
            } catch (err) {
                console.error(err.message);
            }
        });
    };
    this.on = function (channel, fn) {
        if (!listeners[channel])  {
            listeners[channel] = [];
        }
        if (typeof fn !== 'function') {
            return;
        }
        listeners[channel].push(fn);
    };
    this.openPort = function (id) {
        if (ports[id]) {
            ports[id].isOpen = true;
        }
    };
}


module.exports.midi = new Midi();
module.exports.fs = new FS();
module.exports.config = new Config();
