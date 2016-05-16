import { Component } from '@angular/core';
import { EmojiPipe } from '../pipes/emoji.pipe';

const log = require('bows')('AppComponent');

@Component({
  selector: 'emoji-demo',
  templateUrl: 'app/templates/app.template.html',
  pipes: [EmojiPipe]
})
export class AppComponent {
  private alias: string = ':smile:';
  constructor() {}

}
