import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
const titleP = 'Asset Managment';

const routes: Routes = [
  {
    path: '404', title: titleP + ' - Page404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500', title: titleP + ' - Page500',
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
