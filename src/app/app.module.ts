import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule, RequestOptions } from '@angular/http';

import { Abuze } from './app.component';
import { HomePage } from '../pages/home/home';
import { CouponsPage } from '../pages/coupons/coupons';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpDefaultHeaders } from '../providers/http-default-headers';
import { MoneyPipe } from '../pipes/money/money';
import { OfferFilterPipe } from '../pipes/offer-filter/offer-filter';
import { CouponsFilterPipe } from '../pipes/coupons-filter';

import { Login } from '../modals/login/login';
import { Coupon } from '../modals/coupon/coupon';

import { SessionData } from '../providers/session/session-data';
import { CitiesProvider } from '../providers/cities/cities';
import { Loading } from '../providers/loading';

@NgModule({
  declarations: [
    Abuze,
    HomePage,
    CouponsPage,
    MoneyPipe,
    OfferFilterPipe,
    CouponsFilterPipe,
    Login,
    Coupon
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
    CouponsPage,
    Login,
    Coupon
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SessionData,
    Loading,
    CitiesProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: RequestOptions, useClass: HttpDefaultHeaders}
  ]
})
export class AppModule {}
