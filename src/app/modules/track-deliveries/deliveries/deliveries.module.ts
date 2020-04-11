import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DeliveryModule } from '../delivery/delivery.module';

import { DeliveriesComponent } from './deliveries.component';
import { DeliveriesService } from './deliveries.service';

@NgModule({
  declarations: [DeliveriesComponent],
  imports: [CommonModule, DeliveryModule],
  exports: [DeliveriesComponent],
  providers: [DeliveriesService],
})
export class DeliveriesModule {}
