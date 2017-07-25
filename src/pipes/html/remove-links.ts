import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MoneyPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'removeLinks',
})
export class RemoveLinksPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.replace(/<a.+?>/g,'').replace(/<\/a>/g,'');
  }
}
