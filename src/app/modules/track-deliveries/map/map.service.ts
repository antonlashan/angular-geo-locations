import { Injectable } from '@angular/core';
import { STORE_ADDRESS, VehicleType } from '@app/common';
import { interval, Subject, Subscription } from 'rxjs';

import { Delivery } from '../deliveries/delivery.model';

@Injectable()
export class MapService {
  private delay = 50; // milliseconds
  private intervalSub: Subscription;
  private map: google.maps.Map;
  private directionsService = new google.maps.DirectionsService();
  private directionsRenderer = new google.maps.DirectionsRenderer();
  private infowindow = new google.maps.InfoWindow();
  private vehicleMarker: google.maps.Marker;
  private markers: google.maps.Marker[] = [];
  private autoComplete: google.maps.places.Autocomplete;
  private autocompleteSource = new Subject<google.maps.places.PlaceResult>();
  private vehiclePaths: google.maps.LatLng[];

  autocomplete$ = this.autocompleteSource.asObservable();

  mapInitializer(elm: HTMLElement) {
    this.map = new google.maps.Map(elm);
    this.directionsRenderer.setMap(this.map);
  }

  calculateAndDisplayRoute(delivery: Delivery) {
    const origin = new google.maps.LatLng(STORE_ADDRESS.lat, STORE_ADDRESS.lng);
    const destination = new google.maps.LatLng(
      delivery.latitude,
      delivery.longitude
    );

    this.clearMarkers();

    this.createMarker(origin, STORE_ADDRESS.name, STORE_ADDRESS.address);
    this.createMarker(
      destination,
      delivery.customerName,
      delivery.address,
      delivery
    );

    this.directionsService.route(
      {
        origin,
        destination,
        travelMode:
          delivery.vehicleInfo.type === VehicleType.CAR
            ? google.maps.TravelMode.DRIVING
            : google.maps.TravelMode.BICYCLING,
      },
      (response, status) => {
        this.vehiclePaths = response.routes[0].overview_path;
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionsRenderer.setDirections(response);
          const options = {
            suppressInfoWindows: true,
            suppressMarkers: true,
          };
          this.directionsRenderer.setOptions(options);
          this.initVehicleMarker(delivery);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }

  private createMarker(
    latlng: google.maps.LatLng,
    name: string,
    address: string,
    delivery?: Delivery
  ) {
    let content = `
    <h5>${name}</h5>
    <br/>
    <p>${address}</p>
    `;
    if (delivery) {
      content += `Status: <h6 class="${delivery.eventType}">${delivery.eventLbl}</h6>`;
    }
    const marker = new google.maps.Marker({
      position: latlng,
      title: name,
      map: this.map,
      label: name.charAt(0),
    });
    this.markers.push(marker);

    google.maps.event.addListener(marker, 'click', () => {
      this.infowindow.setContent(content);
      this.infowindow.open(this.map, marker);
    });
  }

  private clearMarkers() {
    this.markers.forEach(m => {
      m.setMap(null);
    });
  }

  private initVehicleMarker(delivery: Delivery) {
    const vehicleLatLng = new google.maps.LatLng(
      STORE_ADDRESS.lat,
      STORE_ADDRESS.lng
    );

    this.vehicleMarker = new google.maps.Marker({
      position: vehicleLatLng,
      map: this.map,
      icon: delivery.vehicleInfo.icon,
    });
    this.markers.push(this.vehicleMarker);

    this.moveVehicle();
  }

  private moveVehicle() {
    if (this.intervalSub) {
      this.intervalSub.unsubscribe();
    }
    const len = this.vehiclePaths.length;
    const source = interval(this.delay);

    this.intervalSub = source.subscribe(i => {
      const path = this.vehiclePaths[i];
      this.vehicleMarker.setPosition({ lat: path.lat(), lng: path.lng() });
      if (len - 1 === i) {
        this.intervalSub.unsubscribe();
      }
    });
  }

  clearMap() {
    this.clearMarkers();
    this.directionsRenderer.setMap(null);
  }

  initAutocomplete(elm: HTMLInputElement) {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    this.autoComplete = new google.maps.places.Autocomplete(elm);

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    this.autoComplete.setFields(['formatted_address', 'geometry']);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    this.autoComplete.addListener('place_changed', () => {
      this.fillInAddress();
    });
  }

  private fillInAddress() {
    // Get the place details from the autocomplete object.
    const place = this.autoComplete.getPlace();

    this.autocompleteSource.next(place);
  }
}
