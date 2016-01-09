import {Injectable} from 'angular2/core';

/*global window */
@Injectable()
class PcKeyboardListeningService {
  public attach() {
    window.addEventListener('keypress', this.listener.bind(this));
  }

  public remove() {
    window.removeEventListener('keypress', this.listener.bind(this));
  }

  private listener(e:) {

  }
}
