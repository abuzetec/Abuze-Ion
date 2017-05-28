import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OfferFilterPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'couponsFilter',
})
export class CouponsFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], filter : string) {
    if (!items) {
      return [];
    } else {
      if (filter == 'available'){
        return items.filter(it => !it.archived && Date.parse(it.expiration) >= new Date().getTime());        
      } else if (filter == 'archived'){
        return items.filter(it => it.archived || Date.parse(it.expiration) < new Date().getTime());        
      }
    }
  }
}
