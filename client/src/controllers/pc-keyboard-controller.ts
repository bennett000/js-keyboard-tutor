import {Inject, Injectable} from 'angular2/core';
import {pcKeypress} from '../actions/pc-keypress';
import {Store} from 'redux';

/*global window */
@Injectable()
export class PcKeyboardController {
  private store: Store<any>;
  constructor(@Inject('ngRedux') ngRedux) {
    this.store = ngRedux;
    this.attach();
  }

  public attach() {
    window.addEventListener('keypress', this.listener.bind(this));
  }

  public remove() {
    window.removeEventListener('keypress', this.listener.bind(this));
  }

  private listener(e: KeyboardEvent) {
    this.store.dispatch(pcKeypress(e.charCode, +Date.now()));
  }

}
