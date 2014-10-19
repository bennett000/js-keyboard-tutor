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

/*global angular */
angular.module('ptt-directives', [
    'ptt-socket'
]).directive('socketList', ['socket', '$log', function (socket, $log) {
    'use strict';

    return {
        restrict: 'E',
        replace: true,
        link: function (scope, elem) {
            var cleanList,
                cleanDefault;
            scope.devices = [];
            scope.currentDevice = null;

            function destroy() {
                cleanList();
                cleanDefault();
            }

            function updateDefault(val) {
                scope.currentDevice = val;
            }

            function makeDeviceList(deviceArray) {
                if (!Array.isArray(deviceArray)) {
                    $log.error('socketList: unexpected input');
                    return;
                }
                while (scope.devices.length) {
                    scope.devices.pop();
                }
                deviceArray.forEach(function (device, i) {
                    scope.devices.push({ name: device, id: i });
                });
                return scope.devices;
            }

            function updateList(data) {
                console.log('list', data);
                makeDeviceList(data);
                console.log('list II', scope.devices);
            }

            function init() {
                elem.on('$destroy', destroy);
                cleanList = socket.on('listDevices', updateList);
                cleanDefault = socket.on('getDefaultDevice', updateDefault);
                scope.currentDevice = socket.getDefaultDevice();
                makeDeviceList(socket.listDevices());
            }

            init();
        },
        template: '<select ng-options="device.name for device in devices" ' +
                  'ng-model="currentDevice"></select>'
    };
}]);
