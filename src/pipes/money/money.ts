import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MoneyPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'asMoney',
})
export class MoneyPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if (value){
      return 'R$ ' + parseFloat(value).toFixed(2).toString().replace(/\./g, ',');
    } else {
      return 'R$ 0,00';
    }
  }
}
