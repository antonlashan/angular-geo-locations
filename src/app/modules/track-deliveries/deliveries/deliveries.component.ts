import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TimelineEvent } from '@app/common';
import { Subscription } from 'rxjs';

import { DeliveriesService } from './deliveries.service';
import { Delivery } from './delivery.model';

@Component({
  selector: 'am-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss'],
})
export class DeliveriesComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  @Input() event: TimelineEvent;
  deliveries: Delivery[];

  constructor(private deliveriesService: DeliveriesService) {}

  ngOnInit() {
    this.subs.add(
      this.deliveriesService.getDeliveries().subscribe(res => {
        this.deliveries = res.filter(d => d.eventType === this.event);
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  trackByFn(index: number, item: Delivery) {
    return item.id;
  }
}
