import { Component, Input } from '@angular/core';

import { Delivery } from '../deliveries/delivery.model';

@Component({
  selector: 'am-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent {
  @Input() delivery: Delivery;
}
