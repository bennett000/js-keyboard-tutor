import {Component, Inject} from 'angular2/core';
import {PcKeyboardController} from '../controllers/pc-keyboard-controller';
import {Store} from 'redux';

@Component({
  selector: 'keyboard-tutor',
  template: `<h1 (keypress)="onKeyPress($event)">Keyboard Tutor</h1>`
})
export class App {
  private unsubscribe: Function;
  private store: Store<any>;

  constructor(@Inject('ngRedux') ngRedux,
              private pcKeyboardController: PcKeyboardController) {
    this.store = ngRedux;
  }

  public ngOnInit() {
    this.pcKeyboardController.attach();
    this.unsubscribe = this.store.subscribe(() => {
      console.log(this.store.getState());
    });
  }

  public ngOnDestroy() {
    this.pcKeyboardController.remove();
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}

