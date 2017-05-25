import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OfferFilterPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'offerFilter',
})
export class OfferFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], filter : string) {
    if (!items) {
      return [];
    } else {
      let reg = new RegExp(filter, 'i');
      return items.filter(it => it.title.match(reg));
    }
  }
}
