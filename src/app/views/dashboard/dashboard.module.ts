import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeModule, ModalModule } from '@coreui/angular';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { TotalinuseComponent } from './totalinuse/totalinuse.component';
import { TotalspareComponent } from './totalspare/totalspare.component';
import { TotalworkingComponent } from './totalworking/totalworking.component';
import { TotalnewRequestComponent } from './totalnew-request/totalnew-request.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TotalinprogressComponent } from './totalinprogress/totalinprogress.component';

@NgModule({
  
  declarations: [
    
    DashboardComponent,
    TotalinuseComponent,
    TotalspareComponent,
    TotalworkingComponent,
    TotalnewRequestComponent,
    TotalinprogressComponent
  ],

  imports: [
    DashboardRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    BadgeModule,
    FormsModule,
    FormModule,
    NgxPaginationModule,
    ModalModule,
  ],
})
export class DashboardModule {
}
