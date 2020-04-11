import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Delivery } from '../deliveries/delivery.model';

import { MapService } from './map.service';

@Component({
  selector: 'am-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit, DoCheck, OnDestroy {
  @Input() delivery: Delivery;
  @ViewChild('mapContainer', { static: true }) gmap: ElementRef;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.mapService.mapInitializer(this.gmap.nativeElement);
  }

  ngDoCheck() {
    this.mapService.calculateAndDisplayRoute(this.delivery);
  }

  ngOnDestroy() {
    this.mapService.clearMap();
  }
}
