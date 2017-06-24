import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

@Component({
  templateUrl: 'map.html'
})
export class ShowOnMap {
  partner: any;

  constructor(public viewCtrl: ViewController, private googleMaps: GoogleMaps, public navParams: NavParams) {
    this.partner = this.navParams.get('partner');
    console.log(this.partner);
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
    let map: GoogleMap = this.googleMaps.create(element);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(
     () => {
       // create LatLng object
       let partnerLatLng: LatLng = new LatLng(this.partner.latitude, this.partner.longitude);

       // create CameraPosition
       let position: CameraPosition = {
        target: partnerLatLng,
        zoom: 18,
        tilt: 30
       };

       // move the map's camera to position
       map.moveCamera(position);

       // create new marker
       let markerOptions: MarkerOptions = {
        position: partnerLatLng,
        title: this.partner.name
       };

       map.addMarker(markerOptions).then((marker: Marker) => {
        marker.showInfoWindow();
       });
     }
    );
  }
}
