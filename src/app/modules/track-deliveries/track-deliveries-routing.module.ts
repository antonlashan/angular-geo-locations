import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrackDeliveriesComponent } from './track-deliveries.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', component: TrackDeliveriesComponent },
  { path: 'detail-view/:id', component: ViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackDeliveriesRoutingModule {}
