import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// CoreUI Modules
import {
  AccordionModule,
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
import { AccordionsComponent } from './accordion/accordions.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CardsComponent } from './cards/cards.component';
import { CarouselsComponent } from './carousels/carousels.component';
import { CollapsesComponent } from './collapses/collapses.component';
import { ListGroupsComponent } from './list-groups/list-groups.component';
import { NavsComponent } from './navs/navs.component';
import { PaginationsComponent } from './paginations/paginations.component';
import { PlaceholdersComponent } from './placeholders/placeholders.component';
import { PopoversComponent } from './popovers/popovers.component';
import { ProgressComponent } from './progress/progress.component';
import { SpinnersComponent } from './spinners/spinners.component';
import { TablesComponent } from './tables/tables.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { TabsComponent } from './tabs/tabs.component';
import { ModalModule } from '@coreui/angular';

// Components Routing
import { BaseRoutingModule } from './base-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddBranchComponent } from './breadcrumbs/add-branch/add-branch.component';
import { AddCompanyComponent } from './cards/add-company/add-company.component';
import { AddDepartmentComponent } from './carousels/add-department/add-department.component';
import { AddRequestComponent } from './collapses/add-request/add-request.component';
import { AddVendorsComponent } from './popovers/add-vendors/add-vendors.component';
import { AddScrapComponent } from './progress/add-scrap/add-scrap.component';
import { AddAssetComponent } from './accordion/add-asset/add-asset.component';

@NgModule({
  imports: [
    CommonModule,
    BaseRoutingModule,
    AccordionModule,
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
    AccordionsComponent,
    BreadcrumbsComponent,
    CardsComponent,
    CarouselsComponent,
    CollapsesComponent,
    ListGroupsComponent,
    NavsComponent,
    PaginationsComponent,
    PopoversComponent,
    ProgressComponent,
    SpinnersComponent,
    TablesComponent,
    TooltipsComponent,
    TabsComponent,
    PlaceholdersComponent,
    AddBranchComponent,
    AddCompanyComponent,
    AddDepartmentComponent,
    AddRequestComponent,
    AddVendorsComponent,
    AddScrapComponent,
    AddAssetComponent,
  ],
})
export class BaseModule {}
