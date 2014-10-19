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
});