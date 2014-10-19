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

var rewire = require('rewire'),
    helpers = require('./helpers.js'),
    midiInput = rewire('../midi-input.js');

midiInput.__set__('config', helpers.config);
midiInput.__set__('input', helpers.midi);

describe('midi input provider', function () {
    'use strict';

    it('helpers.totalPorts should call midi.totalPorts', function () {
        spyOn(helpers.midi, 'getPortCount').andCallThrough();
        midiInput.helpers.totalPorts();
        expect(helpers.midi.getPortCount).toHaveBeenCalled();
    });

    it('helpers.listPorts should return an array of portNames', function () {
        expect(Array.isArray(midiInput.helpers.listPorts())).toBe(true);
    });

    it('helpers.openPort should throw if the port does not exist', function () {
        expect(function () {
            midiInput.helpers.openPort('green');
        }).toThrow();
    });

    it('helpers.openPort should call midi.openPort', function () {
        spyOn(helpers.midi, 'openPort').andCallThrough();
        midiInput.helpers.openPort('One');
        expect(helpers.midi.openPort).toHaveBeenCalled();
    });

    it('helpers.openPort should call midi.ignoreTypes', function () {
        spyOn(helpers.midi, 'ignoreTypes').andCallThrough();
        midiInput.helpers.openPort('One');
        expect(helpers.midi.ignoreTypes).toHaveBeenCalled();
    });

    it('openDefault should call config.defaultDevice', function () {
        spyOn(helpers.config, 'defaultDevice').andCallThrough();
        midiInput.helpers.openDefault();
        expect(helpers.config.defaultDevice).toHaveBeenCalled();
    });

    it('openDefault should call midi.openPort', function () {
        spyOn(helpers.midi, 'openPort').andCallThrough();
        midiInput.helpers.openDefault();
        expect(helpers.midi.openPort).toHaveBeenCalled();
    });

    it('openDefault should return true if there is a default port, ' +
       'and openPort is successfully called', function () {
        expect(midiInput.helpers.openDefault()).toBe(true);
    });

    it('openDefault should return false if there is a default port, ' +
       'and openPort fails', function () {
        spyOn(helpers.config, 'defaultDevice').andReturn('green');
        expect(midiInput.helpers.openDefault()).toBe(false);
        expect(helpers.config.defaultDevice).toHaveBeenCalled();
    });

    it('openDefault should return null if the default port is falsey',
       function () {
           spyOn(helpers.config, 'defaultDevice').andReturn(null);
           expect(midiInput.helpers.openDefault()).toBe(null);
           expect(helpers.config.defaultDevice).toHaveBeenCalled();
       });

    it('on should return null if not given a function', function () {
        expect(midiInput.on()).toBe(null);
    });

    it('on should call midi.on if given a function', function () {
        spyOn(helpers.midi, 'on').andCallThrough();
        var fn = function () {};
        midiInput.on(fn);
        expect(helpers.midi.on).toHaveBeenCalledWith('message', fn);
    });
});