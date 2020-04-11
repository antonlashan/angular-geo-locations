import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EventListModule } from './event-list/event-list.module';
import { TrackDeliveriesRoutingModule } from './track-deliveries-routing.module';
import { TrackDeliveriesComponent } from './track-deliveries.component';
import { ViewModule } from './view/view.module';

@NgModule({
  declarations: [TrackDeliveriesComponent],
  imports: [
    CommonModule,
    TrackDeliveriesRoutingModule,
    EventListModule,
    ViewModule,
  ],
})
export class TrackDeliveriesModule {}
