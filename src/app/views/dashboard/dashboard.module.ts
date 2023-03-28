import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from '@coreui/angular';

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

import { WidgetsModule } from '../widgets/widgets.module';
import { TotalinuseComponent } from './totalinuse/totalinuse.component';
import { TotalspareComponent } from './totalspare/totalspare.component';
import { TotalworkingComponent } from './totalworking/totalworking.component';

@NgModule({
  
  declarations: [
    
    DashboardComponent,
    TotalinuseComponent,
    TotalspareComponent,
    TotalworkingComponent
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
    WidgetsModule,
    BadgeModule
  ],
})
export class DashboardModule {
}
