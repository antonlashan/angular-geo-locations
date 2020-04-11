import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeliveryComponent } from './delivery.component';

@NgModule({
  declarations: [DeliveryComponent],
  imports: [CommonModule, RouterModule],
  exports: [DeliveryComponent],
})
export class DeliveryModule {}
