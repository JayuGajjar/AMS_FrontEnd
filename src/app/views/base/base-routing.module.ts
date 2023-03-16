import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccordionsComponent } from './accordion/accordions.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CardsComponent } from './cards/cards.component';
import { CarouselsComponent } from './carousels/carousels.component';
import { CollapsesComponent } from './collapses/collapses.component';
import { ListGroupsComponent } from './list-groups/list-groups.component';
import { NavsComponent } from './navs/navs.component';
import { PaginationsComponent } from './paginations/paginations.component';
import { PopoversComponent } from './popovers/popovers.component';
import { ProgressComponent } from './progress/progress.component';
import { SpinnersComponent } from './spinners/spinners.component';
import { TablesComponent } from './tables/tables.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { TabsComponent } from './tabs/tabs.component';
import { PlaceholdersComponent } from './placeholders/placeholders.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { AddBranchComponent } from './breadcrumbs/add-branch/add-branch.component';
import { AddCompanyComponent } from './cards/add-company/add-company.component';
import { AddDepartmentComponent } from './carousels/add-department/add-department.component';
import { AddRequestComponent } from './collapses/add-request/add-request.component';
import { AddVendorsComponent } from './popovers/add-vendors/add-vendors.component';
import { AddScrapComponent } from './progress/add-scrap/add-scrap.component';
import { AddAssetComponent } from './accordion/add-asset/add-asset.component';

const routes: Routes = [
  {
    path: '', 
    data: {
      title: 'Base',
    },
    children: [
      {
        path: '', 
        pathMatch: 'full',
        redirectTo: 'cards',
      },

      //for asset
      {
        path: 'asset', canActivate : [AuthGuard],             //'accordion',
        component: AccordionsComponent,
        data: {
          title: 'Asset',             //'Accordion',
        },
      },
      {
        path: 'add-asset', canActivate : [AuthGuard],
        component: AddAssetComponent,
        data: {
          title: 'Add Asset', 
        },
      },
      {
        path: 'edit-asset/:id', canActivate : [AuthGuard], 
        component: AddAssetComponent,
        data: {
          title: 'Edit Asset',
        },
      },


      //for branch
      {
        path: 'branch', canActivate : [AuthGuard],             //'breadcrumbs',
        component: BreadcrumbsComponent,
        data: {
          title: 'Branch',           //'Breadcrumbs',
        },
      },
      {
        path: 'add-branch', canActivate : [AuthGuard],
        component: AddBranchComponent,
        data: {
          title: 'Add Branch', 
        },
      },
      {
        path: 'edit-branch/:id', canActivate : [AuthGuard], 
        component: AddBranchComponent,
        data: {
          title: 'Edit Branch',
        },
      },


      //for company
      {
        path: 'company', canActivate : [AuthGuard],             //'cards',
        component: CardsComponent,
        data: {
          title: 'Company',             //'Cards',
        },
      },
      {
        path: 'add-company', canActivate : [AuthGuard],
        component: AddCompanyComponent,
        data: {
          title: 'Add Company',
        },
      },
      {
        path: 'edit-company/:id', canActivate : [AuthGuard],
        component: AddCompanyComponent,
        data: {
          title: 'Edit Company',
        },
      },


      //for department
      {
        path: 'department', canActivate : [AuthGuard],             //'carousel',
        component: CarouselsComponent,
        data: {
          title: 'Department',             //'Carousel',
        },
      },
      {
        path: 'add-department', canActivate : [AuthGuard],
        component: AddDepartmentComponent,
        data: {
          title: 'Add Department',
        },
      },
      {
        path: 'edit-department/:id', canActivate : [AuthGuard],
        component: AddDepartmentComponent,
        data: {
          title: 'Edit Department',
        },
      },



      {
        path: 'request', canActivate : [AuthGuard],             //'collapse',
        component: CollapsesComponent,
        data: {
          title: 'Request',             //'Collapse',
        },
      },
      {
        path: 'add-request', canActivate : [AuthGuard],
        component: AddRequestComponent,
        data: {
          title: 'Add Request',
        },
      },
      {
        path: 'edit-request/:id', canActivate : [AuthGuard],
        component: AddRequestComponent,
        data: {
          title: 'Edit Request',
        },
      },


      // {
      //   path: 'role',              //'list-group',
      //   component: ListGroupsComponent,
      //   data: {
      //     title: 'Role',             //'List Group',
      //   },
      // },
      {
        path: 'status', canActivate : [AuthGuard],             //'navs',
        component: NavsComponent,
        data: {
          title: 'Status',             //'Navs & Tabs',
        },
      },


      // {
      //   path: 'user-details',              //'pagination',
      //   component: PaginationsComponent,
      //   data: {
      //     title: 'User Details',             //'Pagination',
      //   },
      // },

      
      {
        path: 'users', canActivate : [AuthGuard],             //'placeholder',
        component: PlaceholdersComponent,
        data: {
          title: 'Users',             //'Placeholder',
        },
      },

      //for vendors
      {
        path: 'vendor', canActivate : [AuthGuard],             //'popovers',
        component: PopoversComponent,
        data: {
          title: 'Vendor',             //'Popovers',
        },
      },
      {
        path: 'add-vendors', canActivate : [AuthGuard],
        component: AddVendorsComponent,
        data: {
          title: 'Add Vendors',
        },
      },
      {
        path: 'edit-vendors/:id', canActivate : [AuthGuard],
        component: AddVendorsComponent,
        data: {
          title: 'Edit Vendors',
        },
      },


      //for scrap
      {
        path: 'scrap', canActivate : [AuthGuard],             //'progress',
        component: ProgressComponent,
        data: {
          title: 'Scrap',             //'Progress',
        },
      },
      {
        path: 'add-scrap', canActivate : [AuthGuard],
        component: AddScrapComponent,
        data: {
          title: 'Add Scrap',
        },
      },
      {
        path: 'edit-scrap/:id', canActivate : [AuthGuard],
        component: AddScrapComponent,
        data: {
          title: 'Edit Scrap',
        },
      },



      // {
      //   path: 'spinners',
      //   component: SpinnersComponent,
      //   data: {
      //     title: 'Spinners',
      //   },
      // },
      // {
      //   path: 'tables',
      //   component: TablesComponent,
      //   data: {
      //     title: 'Tables',
      //   },
      // },
      // {
      //   path: 'tabs',
      //   component: TabsComponent,
      //   data: {
      //     title: 'Tabs',
      //   },
      // },
      // {
      //   path: 'tooltips',
      //   component: TooltipsComponent,
      //   data: {
      //     title: 'Tooltips',
      //   },
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}

