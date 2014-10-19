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
    config = rewire('../config.js');

config.__set__({
                   fs: helpers.fs
               });

describe('Config module', function () {
    'use strict';

    it('load should call readFileSync', function () {
        spyOn(helpers.fs, 'readFileSync').andCallThrough();
        config.load();
        expect(helpers.fs.readFileSync).toHaveBeenCalled();
    });

    it('init should essentially alias load', function () {
        spyOn(helpers.fs, 'readFileSync').andCallThrough();
        config.init();
        expect(helpers.fs.readFileSync).toHaveBeenCalled();
    });

    it('load should set defaultDevice to null if readFileSync throws',
       function () {
           var old = helpers.fs.readFileSync;
           helpers.fs.readFileSync = function () { throw new Error('test'); }
           expect(config.load().defaultDevice).toBe(null);
           helpers.fs.readFileSync = old;
       });

    it('load should set defaultDevice to null if readFileSync returns non ' +
       ' parsable json', function () {
        var old = helpers.fs.readFileSync;
        helpers.fs.readFileSync = function () { return; };
        expect(config.load().defaultDevice).toBe(null);
        helpers.fs.readFileSync = old;
    });

    it('save should call writeFileSync', function () {
        spyOn(helpers.fs, 'writeFileSync').andCallThrough();
        config.save();
        expect(helpers.fs.writeFileSync).toHaveBeenCalled();
    });

    it('save should return false if config is invalid', function () {
        var old = config.__get__('config');
        config.__set__('config', null);
        expect(config.save()).toBe(false);
        config.__set__('config', old);
    });

    it('defaultDevice should act like a getter with no parameters',
       function () {
           config.__set__('config', { defaultDevice: true });
           expect(config.defaultDevice() === null || config.defaultDevice()).
           toBe(true);
       });

    it('defaultDevice should act like a setter given a parameter', function () {
        var c = { defaultDevice: 'blue' };
        config.__set__('config', c);
        config.defaultDevice('red');
        expect(c.defaultDevice).toBe('red');
    });

    it('defaultDevice should write when acting as a setter', function () {
        spyOn(helpers.fs, 'writeFileSync').andCallThrough();
        var c = { defaultDevice: 'blue' };
        config.__set__('config', c);
        config.defaultDevice('blue');
        expect(helpers.fs.writeFileSync).toHaveBeenCalled();
    });
});
