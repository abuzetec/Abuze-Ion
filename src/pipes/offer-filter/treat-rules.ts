import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MoneyPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'treatRules',
})
export class TreatRulesPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let rules = value.replace("{{LINK_DISPONIBILIDADES}}", "Verifique as datas disponíveis para agendamento");
    rules = rules.replace("{{LINK_CUPONS}}", "Meus cupons");

    return rules;
  }
}
