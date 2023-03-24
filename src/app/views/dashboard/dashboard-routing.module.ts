import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';

import { DashboardComponent } from './dashboard.component';
import { TotalinuseComponent } from './totalinuse/totalinuse.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    },
    children: [
      
      //inuse component
      {
        path: 'inuse', canActivate : [AuthGuard],
        component: TotalinuseComponent,
        data: {
          title: 'Add Branch', 
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
