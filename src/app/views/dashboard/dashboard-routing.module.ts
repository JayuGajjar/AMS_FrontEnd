import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { title } from 'process';
import { AuthGuard } from 'src/app/services/auth.guard';

import { DashboardComponent } from './dashboard.component';
import { TotalinuseComponent } from './totalinuse/totalinuse.component';
const  titleP = 'Asset Managment Admin';

const routes: Routes = [
  {
    path: '',  title: titleP + ' - Dashboard',
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
