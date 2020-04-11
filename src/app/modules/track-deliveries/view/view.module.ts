import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MapModule } from '../map/map.module';
import { SummaryModule } from '../summary/summary.module';
import { TimelineModule } from '../timeline/timeline.module';

import { ViewComponent } from './view.component';
import { ViewService } from './view.service';

@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    RouterModule,
    SummaryModule,
    MapModule,
    TimelineModule,
  ],
  exports: [ViewComponent],
  providers: [ViewService],
})
export class ViewModule {}
