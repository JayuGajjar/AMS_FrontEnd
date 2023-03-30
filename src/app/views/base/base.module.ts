import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// CoreUI Modules
import {
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';

// utils
import { DocsComponentsModule } from '@docs-components/docs-components.module';

// views
import { ModalModule } from '@coreui/angular';

// Components Routing
import { BaseRoutingModule } from './base-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddBranchComponent } from './branch/add-branch/add-branch.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import { AddRequestComponent } from './request/add-request/add-request.component';
import { AddVendorsComponent } from './vendors/add-vendors/add-vendors.component';
import { AddScrapComponent } from './scrap/add-scrap/add-scrap.component';
import { AddAssetComponent } from './asset/add-asset/add-asset.component';
import { AssetComponent } from './asset/asset.component';
import { BranchComponent } from './branch/branch.component';
import { CompanyComponent } from './company/company.component';
import { DepartmentComponent } from './department/department.component';
import { RequestComponent } from './request/request.component';
import { StatusComponent } from './status/status.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { VendorsComponent } from './vendors/vendors.component';
import { ScrapComponent } from './scrap/scrap.component';

@NgModule({
  imports: [
    CommonModule,
    BaseRoutingModule,
    BadgeModule,
    BreadcrumbModule,
    FormModule,
    FormsModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    UtilitiesModule,
    SharedModule,
    ListGroupModule,
    IconModule,
    ListGroupModule,
    PlaceholderModule,
    ProgressModule,
    SpinnerModule,
    TabsModule,
    NavModule,
    TooltipModule,
    CarouselModule,
    FormModule,
    ReactiveFormsModule,
    DropdownModule,
    PaginationModule,
    PopoverModule,
    TableModule,
    DocsComponentsModule,
    NgxPaginationModule,
    NgbModule,
    ModalModule
  ],
  declarations: [
    AddBranchComponent,
    AddCompanyComponent,
    AddDepartmentComponent,
    AddRequestComponent,
    AddVendorsComponent,
    AddScrapComponent,
    AddAssetComponent,
    AssetComponent,
    BranchComponent,
    CompanyComponent,
    DepartmentComponent,
    RequestComponent,
    StatusComponent,
    UserdetailsComponent,
    VendorsComponent,
    ScrapComponent,
  ],
})
export class BaseModule {}
