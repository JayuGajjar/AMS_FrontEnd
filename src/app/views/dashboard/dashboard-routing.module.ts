import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
const titleP = "Asset Managment";

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', title: titleP + ' - Dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
