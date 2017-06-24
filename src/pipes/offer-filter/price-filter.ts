import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceAvailable',
})
export class PriceAvailablePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[]) {
    if (!items) {
      return [];
    } else {
      return items.filter(it => it.show == true);
    }
  }
}
