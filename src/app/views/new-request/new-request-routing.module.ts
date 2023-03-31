import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const titleP = "Asset Managment";

import { NewRequestComponent } from './new-request.component';

const routes: Routes = [
  {
    path: 'new-request', title: titleP + ' - New Request',
    component: NewRequestComponent,
    data: {
      title: 'New Request'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRequestRoutingModule {
}