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
    'socket-io-wrapper',
    'ptt-observer'
]).factory('socket', ['socketIo', '$q', '$window', 'observer', function (socketIo, $q, $window, observer) {
    'use strict';

    var that = observer(),
        updateListener = angular.noop,
        events = {
            'listPorts': { fn: defaultEventHandler, value: [] },
            'getDefaultDevice': { fn: defaultEventHandler, value: null },
            'isStarted': { fn: defaultEventHandler, value: false }
        },
    socket;

    function defaultEventHandler(data) {
        /*jshint validthis:true */
        this.value = data;
    }


    function listen() {
        Object.keys(events).forEach(function (event) {
            socket.on(event, function (data){
                events[event].fn(data);
                that.triggerSync(event, data);
                that.triggerSync('update', data);
            });
        });
    }

    function update() {
        Object.keys(events).forEach(function (event) {
            socket.emit(event);
        });
    }

    function expose() {
        Object.keys(events).forEach(function (event) {
            that[event] = function localAccessor() {
                return events[event].value;
            };
        });
    }

    function destroy() {
        updateListener();
        updateListener = angular.noop;
    }

    function init() {
        socket = socketIo($window.location.host);
        listen();
        update();
        expose();
    }

    init();


    that.init = init;
    that.destroy = destroy;

    return that;

}]).run(['socket', function (socket) {
    'use strict';

    console.log('dude', socket.listPorts());

    socket.on('listPorts', function (ports){
        console.log(ports);
        socket.listPorts();
    });

    socket.on('isStarted', function (well){
        console.log(well);
        socket.isStarted();
    });
}]);