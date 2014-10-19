function Io () {
    'use strict';
    var listeners = {},
        onEmiters = {};

    function on(event, fn) {
        if (!listeners[event]) {
            listeners[event] = [];
        }
        if (typeof fn !== 'function') {
            return;
        }
        listeners[event].push(fn);
    }

    function trigger(event) {
        if (!listeners[event]) {
            return;
        }
        var args = Array.prototype.slice.call(arguments, 1);

        listeners[event].forEach(function (fn) {
            fn.apply(null, args);
        });
    }

    function onEmit(event, fn) {
        if (!onEmiters[event]) {
            onEmiters[event] = [];
        }
        if (typeof fn !== 'function') {
            return;
        }
        onEmiters[event].push(fn);
    }

    function emit(message, data) {
        if (!onEmiters[event]) {
            return;
        }
        var args = Array.prototype.slice.call(arguments, 1);

        onEmiters[event].forEach(function (fn) {
            fn.apply(null, args);
        });
    }

    this.on = on;
    this.emit = emit;
    this.trigger = trigger;
    this.onEmit = onEmit;
}

/*global angular*/
angular.module('socket-io-wrapper', [

]).factory('socketIo', [function wrapIO() {
    'use strict';

    return new Io();
}]);
