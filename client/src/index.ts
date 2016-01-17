import 'reflect-metadata';
import {bootstrap}    from 'angular2/platform/browser';
import {App} from './containers/app';
import configureStore from './store/configure-store';
import {PcKeyboardController} from './controllers/pc-keyboard-controller';


const provider = <Function>require('ng2-redux').provider;
const store = configureStore();

bootstrap(
  App,
  [
    provider(store),
    PcKeyboardController
  ]
);
