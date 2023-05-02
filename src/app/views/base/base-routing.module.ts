import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssetComponent } from './asset/asset.component';
import { AuthGuard } from 'src/app/services/auth.guard';
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
import { TotalnewRequestComponent } from '../dashboard/totalnew-request/totalnew-request.component';
import { NewRequestComponent } from './new-request/new-request.component';
import { ProfileComponent } from './profile/profile.component';
import { AssetsinfoComponent } from './assetsinfo/assetsinfo.component';
import { TotalassetsComponent } from './totalassets/totalassets.component';
import { AssettypeComponent } from './assettype/assettype.component';
import { TotalinprogressComponent } from '../dashboard/totalinprogress/totalinprogress.component';
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
          title: 'InUse Assets', 
        },
      },
      //total in progress
      {
        path: 'inprogress', title: titleP + ' - InProgress', canActivate : [AuthGuard],
        component: TotalinprogressComponent,
        data: {
          title: 'InProgress Assets', 
        },
      },
      //total new request
      {
        path: 'newrequests', title: titleP + ' - New Requests', canActivate : [AuthGuard],
        component: TotalnewRequestComponent,
        data: {
          title: 'New Request For Assets', 
        },
      },
      //total Spare
      {
        path: 'spare', title: titleP + ' - Spare', canActivate : [AuthGuard],
        component: TotalspareComponent,
        data: {
          title: 'Spare Assets', 
        },
      },
      //total Working
      {
        path: 'working', title: titleP + ' - Working', canActivate : [AuthGuard],
        component: TotalworkingComponent,
        data: {
          title: 'Working Assets', 
        },
      },
      //total Assets
      {
        path: 'summary', title: titleP + ' - Summary', canActivate : [AuthGuard],
        component: TotalassetsComponent,
        data: {
          title: 'Summary of Assets', 
        },
      },

      //for Profile
      {
        path: 'profile', title: titleP + ' - Profile', canActivate : [AuthGuard],
        component: ProfileComponent,
        data: {
          title: 'Profile',
        },
      },
      {
        path: 'profile/:id', title: titleP + ' - User Details', canActivate : [AuthGuard],
        component: ProfileComponent,
        data: {
          title: 'User Info',
        },
      },
      //for asset
      {
        path: 'asset', title: titleP + ' - Asset', canActivate : [AuthGuard],
        component: AssetComponent,
        data: {
          title: 'Assets',
        },
      },
      {
        path: 'assetinfo/:id', title: titleP + ' - Asset Info', canActivate : [AuthGuard],
        component: AssetsinfoComponent,
        data: {
          title: 'Asset Info',
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


      //for asset type
      {
        path: 'assettype', title: titleP + ' - Asset Type', canActivate : [AuthGuard],
        component: AssettypeComponent,
        data: {
          title: 'Asset Types',
        },
      },


      //for branch
      {
        path: 'branch', title: titleP + ' - Branch', canActivate : [AuthGuard],
        component: BranchComponent,
        data: {
          title: 'Branches',
        },
      },


      //for company
      {
        path: 'company', title: titleP + ' - Company', canActivate : [AuthGuard],
        component: CompanyComponent,
        data: {
          title: 'Companies',
        },
      },


      //for department
      {
        path: 'department', title: titleP + ' - Department', canActivate : [AuthGuard],
        component: DepartmentComponent,
        data: {
          title: 'Departments',
        },
      },



      //for request
      // {
      //   path: 'request', title: titleP + ' - Request', canActivate : [AuthGuard],
      //   component: RequestComponent,
      //   data: {
      //     title: 'Requests Status',
      //   },
      // },
      // {
      //   path: 'edit-request/:id', title: titleP + ' - Edit Request', canActivate : [AuthGuard],
      //   component: NewRequestComponent,
      //   data: {
      //     title: 'Edit Requests',
      //   },
      // },
      {
        path: 'new-request', title: titleP + ' - New Request', canActivate : [AuthGuard],
        component: NewRequestComponent,
        data: {
          title: 'New Request for Asset',
        },
      },



      //for status
      {
        path: 'status', title: titleP + ' - Status', canActivate : [AuthGuard],
        component: StatusComponent,
        data: {
          title: 'Assets Status',
        },
      },


      
      //for user details
      {
        path: 'users', title: titleP + ' - AllUsers', canActivate : [AuthGuard],
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
          title: 'Vendors',
        },
      },

      

      //for scrap
      {
        path: 'scrap', title: titleP + ' - Scrap', canActivate : [AuthGuard],
        component: ScrapComponent,
        data: {
          title: 'Scraps',
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

