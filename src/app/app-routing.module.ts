import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        m => m.DashboardModule
      ),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/error/error.module').then(m => m.ErrorModule),
  },
  {
    path: 'track-deliveries',
    loadChildren: () =>
      import('./modules/track-deliveries/track-deliveries.module').then(
        m => m.TrackDeliveriesModule
      ),
  },
  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
