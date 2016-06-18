import { Component } from '@angular/core';
import { Logon } from './shared';
const template = require('./app.component.html');
const styles = require('./app.component.css');
const log = require('bows')('App');

@Component({
  selector: 'logon-demo',
  template: template,
  styles: [styles],
  directives: [Logon]
})
export class App {
  constructor() {}

}
