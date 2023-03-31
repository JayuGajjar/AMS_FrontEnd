import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { AuthGuard } from './services/auth.guard';
const titleP = "Asset Managment Admin";

const routes: Routes = [
  {
    path: '', title: titleP + ' - Login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: ''
    },  
    children: [
      {
        path: 'dashboard', title: titleP + ' - Dashboard',  canActivate : [AuthGuard], //new
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'base',  title: titleP + ' - Base', canActivate : [AuthGuard],
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'icons', canActivate : [AuthGuard],
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'pages',  title: titleP + ' - Pages', canActivate : [AuthGuard],
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',  title: titleP + ' - Page 404', 
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500', title: titleP + ' - Page 500', 
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login', title: titleP + ' - Login', 
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register', title: titleP + ' - Register', 
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
