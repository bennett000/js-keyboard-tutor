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

/*global angular, window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs, it, module,inject */

describe('make observer function', function () {
    'use strict';

    beforeEach(function () {
        module('ptt-observer');
    });

    it('given no parameters it should return an object',
       inject(function (observer) {
           expect(observer()).toBeTruthy();
           expect(typeof observer()).toBe('object');
       }));

    it('should provide an on function', inject(function (observer) {
        expect(typeof observer().on).toBe('function');
    }));

    it('should provide a trigger function', inject(function (observer) {
        expect(typeof observer().trigger).toBe('function');
    }));

    it('on should return a function', inject(function (observer) {
        expect(typeof observer().on()).toBe('function');
    }));

    it('on with no parameters should return noop', inject(function (observer) {
        expect(observer().on()).toBe(angular.noop);
    }));

    it('on with no handler parameter return noop', inject(function (observer) {
        expect(observer().on('test')).toBe(angular.noop);
    }));

    it('should register listeners', inject(function (observer) {
        var o = observer(), listeners = o._listeners();
        o.on('test', function () {});
        expect(listeners.test).toBeTruthy();
        expect(typeof listeners.test).toBe('object');
        expect(Object.keys(listeners.test).length).toBe(1);
    }));

    it('should de-register listeners', inject(function (observer) {
        var o = observer(), listeners = o._listeners(),
            cancel = o.on('test', function () {});
        expect(Object.keys(listeners.test).length).toBe(1);
        cancel();
        expect(Object.keys(listeners.test).length).toBe(0);
    }));

    it('trigger should return false if not given an argument',
       inject(function (observer) {
           expect(observer().trigger()).toBe(false);
       }));

    it('triggerSync should return false if not given an argument',
       inject(function (observer) {
           expect(observer().triggerSync()).toBe(false);
       }));

    it('trigger should return null if there have never been registered events',
       inject(function (observer) {
           expect(observer().trigger('test')).toBe(null);
       }));

    it('triggerSync should return null if there have never been registered ' +
       'events', inject(function (observer) {
        expect(observer().triggerSync('test')).toBe(null);
    }));

    it('trigger should fire events in the next \'turn\'',
       inject(function (observer, $timeout) {
        var o = observer(), done = false;
           o.on('test', function () { done = true; });
           o.trigger('test');
           expect(done).toBe(false);
           $timeout.flush();
           expect(done).toBe(true);
       }));

    it('triggerSync should fire events in the same \'turn\'',
       inject(function (observer) {
           var o = observer(), done = false;
           o.on('test', function () { done = true; });
           o.triggerSync('test');
           expect(done).toBe(true);
       }));

    it('trigger should be log errors', inject(function ($log, observer) {
        spyOn($log, 'error').and.callThrough();
        var o = observer();
        o.on('test', function () { throw new Error('test'); });
        o.triggerSync('test');
        expect($log.error).toHaveBeenCalled();
    }));
});
