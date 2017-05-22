import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule, RequestOptions } from '@angular/http';

import { Abuze } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImgCacheDirective } from '../directives/img-cache/img-cache';
import { HttpDefaultHeaders } from '../providers/http-default-headers'

@NgModule({
  declarations: [
    Abuze,
    HomePage,
    ListPage,
    ImgCacheDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(Abuze),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Abuze,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: RequestOptions, useClass: HttpDefaultHeaders}
  ]
})
export class AppModule {}
