import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssetComponent } from './asset/asset.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { AddBranchComponent } from './branch/add-branch/add-branch.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import { AddRequestComponent } from './request/add-request/add-request.component';
import { AddVendorsComponent } from './vendors/add-vendors/add-vendors.component';
import { AddScrapComponent } from './scrap/add-scrap/add-scrap.component';
import { AddAssetComponent } from './asset/add-asset/add-asset.component';
import { TotalinuseComponent } from '../dashboard/totalinuse/totalinuse.component';
import { TotalspareComponent } from '../dashboard/totalspare/totalspare.component';
import { TotalworkingComponent } from '../dashboard/totalworking/totalworking.component';
import { BranchComponent } from './branch/branch.component';
import { CompanyComponent } from './company/company.component';
import { DepartmentComponent } from './department/department.component';
import { RequestComponent } from './request/request.component';
import { StatusComponent } from './status/status.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { VendorsComponent } from './vendors/vendors.component';
import { ScrapComponent } from './scrap/scrap.component';
const titleP = "Asset Managment";
const routes: Routes = [
  {
    path: '',
    data: {
      title: '',
    },
    children: [

      //total inuse
      {
        path: 'inuse', title: titleP + ' - InUse', canActivate : [AuthGuard],
        component: TotalinuseComponent,
        data: {
          title: 'InUse', 
        },
      },
      //total Spare
      {
        path: 'spare', title: titleP + ' - Spare', canActivate : [AuthGuard],
        component: TotalspareComponent,
        data: {
          title: 'Spare', 
        },
      },
      //total Working
      {
        path: 'working', title: titleP + ' - Working', canActivate : [AuthGuard],
        component: TotalworkingComponent,
        data: {
          title: 'Working', 
        },
      },

      //for asset
      {
        path: 'asset', title: titleP + ' - Asset', canActivate : [AuthGuard],
        component: AssetComponent,
        data: {
          title: 'Asset',
        },
      },
      {
        path: 'add-asset', title: titleP + ' - Add Asset', canActivate : [AuthGuard],
        component: AddAssetComponent,
        data: {
          title: 'Add Asset', 
        },
      },
      {
        path: 'edit-asset/:id', title: titleP + ' - Edit Asset', canActivate : [AuthGuard], 
        component: AddAssetComponent,
        data: {
          title: 'Edit Asset',
        },
      },


      //for branch
      {
        path: 'branch', title: titleP + ' - Branch', canActivate : [AuthGuard],
        component: BranchComponent,
        data: {
          title: 'Branch',
        },
      },
      {
        path: 'add-branch', title: titleP + ' - Add Branch', canActivate : [AuthGuard],
        component: AddBranchComponent,
        data: {
          title: 'Add Branch', 
        },
      },
      {
        path: 'edit-branch/:id', title: titleP + ' - Edit Branch', canActivate : [AuthGuard], 
        component: AddBranchComponent,
        data: {
          title: 'Edit Branch',
        },
      },


      //for company
      {
        path: 'company', title: titleP + ' - Company', canActivate : [AuthGuard],
        component: CompanyComponent,
        data: {
          title: 'Company',
        },
      },
      {
        path: 'add-company', title: titleP + ' - Add Company', canActivate : [AuthGuard],
        component: AddCompanyComponent,
        data: {
          title: 'Add Company',
        },
      },
      {
        path: 'edit-company/:id', title: titleP + ' - Edit Company', canActivate : [AuthGuard],
        component: AddCompanyComponent,
        data: {
          title: 'Edit Company',
        },
      },


      //for department
      {
        path: 'department', title: titleP + ' - Department', canActivate : [AuthGuard],
        component: DepartmentComponent,
        data: {
          title: 'Department',
        },
      },
      {
        path: 'add-department', title: titleP + ' - Add Department', canActivate : [AuthGuard],
        component: AddDepartmentComponent,
        data: {
          title: 'Add Department',
        },
      },
      {
        path: 'edit-department/:id', title: titleP + ' - Edit Department', canActivate : [AuthGuard],
        component: AddDepartmentComponent,
        data: {
          title: 'Edit Department',
        },
      },



      //for request
      {
        path: 'request', title: titleP + ' - Request', canActivate : [AuthGuard],
        component: RequestComponent,
        data: {
          title: 'Request',
        },
      },
      {
        path: 'add-request', title: titleP + ' - Add Request', canActivate : [AuthGuard],
        component: AddRequestComponent,
        data: {
          title: 'Add Request',
        },
      },
      {
        path: 'edit-request/:id', title: titleP + ' - Edit Request', canActivate : [AuthGuard],
        component: AddRequestComponent,
        data: {
          title: 'Edit Request',
        },
      },



      //for status
      {
        path: 'status', title: titleP + ' - Status', canActivate : [AuthGuard],
        component: StatusComponent,
        data: {
          title: 'Status',
        },
      },


      
      //for user details
      {
        path: 'users', title: titleP + ' - Users', canActivate : [AuthGuard],
        component: UserdetailsComponent,
        data: {
          title: 'Users',
        },
      },



      //for vendors
      {
        path: 'vendor', title: titleP + ' - Vendors', canActivate : [AuthGuard],
        component: VendorsComponent,
        data: {
          title: 'Vendor',
        },
      },
      {
        path: 'add-vendors', title: titleP + ' - Add Vendors', canActivate : [AuthGuard],
        component: AddVendorsComponent,
        data: {
          title: 'Add Vendors',
        },
      },
      {
        path: 'edit-vendors/:id', title: titleP + ' - Edit Vendors', canActivate : [AuthGuard],
        component: AddVendorsComponent,
        data: {
          title: 'Edit Vendors',
        },
      },

      

      //for scrap
      {
        path: 'scrap', title: titleP + ' - Scrap', canActivate : [AuthGuard],
        component: ScrapComponent,
        data: {
          title: 'Scrap',
        },
      },
      {
        path: 'add-scrap', title: titleP + ' - Add Scrap', canActivate : [AuthGuard],
        component: AddScrapComponent,
        data: {
          title: 'Add Scrap',
        },
      },
      {
        path: 'edit-scrap/:id', title: titleP + ' - Edit Scrap', canActivate : [AuthGuard],
        component: AddScrapComponent,
        data: {
          title: 'Edit Scrap',
        },
      },


    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}

