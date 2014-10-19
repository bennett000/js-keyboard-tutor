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

/*global angular*/
angular.module('ptt-socket', [
    'socket-io-wrapper'
]).factory('socket', ['socketIo', '$q', '$window', function (socketIo, $q, $window) {
    'use strict';

    var ports = [],
        events = {
            'listPorts': onListPorts
        },
    socket;

    function onListPorts(data) {
        if (Array.isArray(data)) {
            ports = data;
        } else {
            console.debug('onListPorts:', data);
        }
    }

    function listen() {
        Object.keys(events).forEach(function (event) {
            socket.on(event, events[event]);
        });
    }

    function update() {
        socket.emit('listPorts');
    }

    function init() {
        socket.Io($window.location.host);
        listen();
        update();
    }

    init();

}]).run(['socket', function () {
    'use strict';

    console.log('dude', window.location);
}]);