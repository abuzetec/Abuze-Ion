import { Injectable } from '@angular/core';
import { BaseRequestOptions, Headers } from '@angular/http';
import { ENV } from '../../config/environment.dev'

@Injectable()
export class HttpDefaultHeaders extends BaseRequestOptions{

    headers:Headers = new Headers({
      'Content-Type': 'application/json; charset=UTF-8',
      'X-APP-ID': ENV.APP_ID,
      'X-APP-TOKEN': ENV.APP_TOKEN
    });
}