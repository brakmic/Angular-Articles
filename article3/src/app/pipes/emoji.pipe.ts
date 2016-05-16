import { Pipe, PipeTransform } from '@angular/core';
import { IEmoji } from '../interfaces/IEmoji';
import { api } from '../../platform/api/emoji-api';

@Pipe({
  name: 'emoji'
})
export class EmojiPipe implements PipeTransform {
  private regex = /^:.+:$/;

  constructor() {}

  public transform(value: string, args: string[]) {
    if (value &&
      this.regex.test(value)) {
      let emoji = api.getEmoji(value.replace(/:/g, ''));
      if (emoji) {
        return emoji.emoji;
      }
    }
    return '';
  }
}
