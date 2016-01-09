import {Component} from 'angular2/core';

@Component({
    selector: 'keyboard-tutor',
    template: `<h1 (click)="onKeyPress($event)">Keyboard Tutor</h1>`
})
export class AppComponent {
    public onKeyPress(e) {
       console.log('ooh', e);
    }
}

