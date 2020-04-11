import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SummaryComponent } from './summary.component';

@NgModule({
  declarations: [SummaryComponent],
  imports: [CommonModule],
  exports: [SummaryComponent],
})
export class SummaryModule {}
