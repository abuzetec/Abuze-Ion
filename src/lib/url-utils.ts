export class URLUtils{
  static parameterize(params:any){
    let newParams: Array<string> = [];

    for (var key in params) {
      newParams.push([key, params[key]].join('='));
    }

    return ['?', newParams.join('&')].join('');
  }
}