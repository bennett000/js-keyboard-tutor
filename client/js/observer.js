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
angular.module('ptt-observer', [
]).factory('observer', ['$timeout', '$log', function ($timeout, $log) {
    'use strict';

    /**
     * @param input {Object}
     * @returns {Object}
     */
    function makeObserver(input) {
        if (!input || typeof input !== 'object') {
            input = {};
        }

        var listeners = Object.create(null);

        /**
         * @param event {string}
         * @param handler {function(...)}
         * @returns {function()}
         */
        function on(event, handler) {
            if (!event || typeof event !== 'string') {
                return angular.noop;
            }
            if (typeof handler !== 'function') {
                return angular.noop;
            }
            if (!listeners[event]) {
                listeners[event] = Object.create(null);
            }
            var id = 'ptt.' + Date.now().toString(16) + '.' + Math.random();
            listeners[event][id] = handler;

            return function off() {
                delete listeners[event][id];
            };
        }

        /**
         * @param fn {function(...)}
         * @param args {Array}
         */
        function tryFunction(fn, args) {
            try {
                fn.apply(null, args);
            } catch (err) {
                $log.error(err.message);
            }
        }

        /**
         * @param event {string}
         * @returns {boolean|null}
         */
        function trigger(event) {
            if (!event || typeof event !== 'string') {
                return false;
            }
            if (!listeners[event]) {
                return null;
            }
            var args = Array.prototype.slice.call(arguments, 1);
            $timeout(function () {
                Object.keys(listeners[event]).forEach(function (id) {
                    tryFunction(listeners[event][id], args);
                });
            }, 0);
            return true;
        }

        /**
         * @param event {string}
         * @returns {boolean|null}
         */
        function triggerSync(event) {
            if (!event || typeof event !== 'string') {
                return false;
            }
            if (!listeners[event]) {
                return null;
            }
            var args = Array.prototype.slice.call(arguments, 1);
            Object.keys(listeners[event]).forEach(function (id) {
                tryFunction(listeners[event][id], args);
            });
            return true;
        }

        /**
         * @returns {Object}
         */
        function debug() {
            return listeners;
        }

        input.on = on;
        input.trigger = trigger;
        input.triggerSync = triggerSync;
        input._listeners = debug;

        return input;
    }

    return makeObserver;
}]);