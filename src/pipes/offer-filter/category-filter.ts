import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OfferFilterPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'categoryFilter',
})
export class CategoryFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], filter : string) {
    if (!items) {
      return [];
    } else {
      if (filter){
        return items.filter(it => it.category == filter);
      } else {
        return items;
      }
    }
  }
}
