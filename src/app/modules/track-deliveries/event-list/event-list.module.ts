import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DeliveriesModule } from '../deliveries/deliveries.module';

import { EventListComponent } from './event-list.component';

@NgModule({
  declarations: [EventListComponent],
  imports: [CommonModule, DeliveriesModule],
  exports: [EventListComponent],
})
export class EventListModule {}
