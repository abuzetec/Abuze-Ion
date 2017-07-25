import { Component, ViewChild, ElementRef } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

declare var google;

@Component({
  templateUrl: 'map.html'
})
export class ShowOnMap {
  partner: any;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.partner = this.navParams.get('partner');
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    let latLng = new google.maps.LatLng(this.partner.latitude, this.partner.longitude);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
    });

    if (this.partner.name != ""){

      let infoWindow = new google.maps.InfoWindow({
        content: this.partner.name
      });

      infoWindow.open(this.map, marker);
    }
  }

}
