import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MapComponent } from './map.component';
import { MapService } from './map.service';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule],
  exports: [MapComponent],
  providers: [MapService],
})
export class MapModule {}
