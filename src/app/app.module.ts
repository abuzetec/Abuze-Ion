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
import { PriceAvailablePipe } from '../pipes/offer-filter/price-filter';

import { OfferFilterPipe } from '../pipes/offer-filter/offer-filter';
import { CategoryFilterPipe } from '../pipes/offer-filter/category-filter';

import { CouponsFilterPipe } from '../pipes/coupons-filter';

import { Login } from '../modals/login/login';
import { Coupon } from '../modals/coupon/coupon';
import { ShowOnMap } from '../pages/map/map';
import { OfferPage } from '../pages/offer/offer';
import { CardsPage } from '../pages/cards/cards';
import { ChangeCityPage } from '../modals/change-city/change-city';
import { PricesPage } from '../modals/prices/prices';

import { SessionData } from '../providers/session/session-data';
import { CitiesProvider } from '../providers/cities/cities';
import { Loading } from '../providers/loading';

import { QRCodeModule } from 'angular2-qrcode';
import { InvoicesPage } from '../pages/invoices/invoices';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GoogleMaps } from '@ionic-native/google-maps';

@NgModule({
  declarations: [
    Abuze,
    HomePage,
    CouponsPage,
    MoneyPipe,
    PriceAvailablePipe,
    OfferFilterPipe,
    CouponsFilterPipe,
    CategoryFilterPipe,
    Login,
    ShowOnMap,
    Coupon,
    OfferPage,
    CardsPage,
    InvoicesPage,
    ChangeCityPage,
    PricesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(Abuze),
    HttpModule,
    QRCodeModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Abuze,
    HomePage,
    CouponsPage,
    Login,
    Coupon,
    OfferPage,
    CardsPage,
    InvoicesPage,
    ChangeCityPage,
    ShowOnMap,
    PricesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SessionData,
    Loading,
    CitiesProvider,
    InAppBrowser,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: RequestOptions, useClass: HttpDefaultHeaders}
  ]
})
export class AppModule {}
