import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { VehicleType, VEHICLE_TYPES } from '@app/common';
import { Subscription } from 'rxjs';

import { Delivery } from '../deliveries/delivery.model';
import { MapService } from '../map/map.service';

@Component({
  selector: 'am-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent implements AfterViewInit, OnDestroy {
  private subs = new Subscription();

  @Input() delivery: Delivery;
  @Output() changeDelivery: EventEmitter<Delivery> = new EventEmitter();
  @ViewChild('autocomplete', { static: false }) autocomplete: ElementRef;

  vehicleTypes = VEHICLE_TYPES;

  constructor(private mapService: MapService, private cdr: ChangeDetectorRef) {
    this.subs.add(
      this.mapService.autocomplete$.subscribe(data => {
        const loc = data.geometry.location;

        this.delivery.address = data.formatted_address;
        this.delivery.latitude = loc.lat();
        this.delivery.longitude = loc.lng();

        this.changeDelivery.emit(this.delivery);
        this.cdr.detectChanges();
      })
    );
  }

  ngAfterViewInit() {
    this.mapService.initAutocomplete(this.autocomplete.nativeElement);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onVehicleTypeChange(e: VehicleType) {
    this.delivery.vehicleInfo.type = e;
    this.changeDelivery.emit(this.delivery);

    this.cdr.detectChanges();
  }
}
