// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) { }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

//     if (this.isLoggedIn() == true) {
//       return true;
//     }
//     // navigate to login page as user is not authenticated      
//     this.router.navigate(['/login']);
//     return false;
//   }

//   public isLoggedIn(): boolean {
//     let status = false;
//     if (sessionStorage.getItem('isLoggedIn') == "true") {
//       status = true;
//     }
//     else {
//       status = false;
//     }
//     return status;
//   }
// }

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth : AuthService, private router : Router) {

  }
  canActivate(){
    if(sessionStorage.getItem('isSuccess')=="true" && sessionStorage.getItem('role')=="User")
    {
    return true;
    }
    else
    {
      this.router.navigate(['/login']);
      return false;
    }
  }
}


  //   if (this.isLoggedIn()) {
  //     return true;
  //   }
  //   // navigate to login page as user is not authenticated      
  //   this.router.navigate(['/login']);
  //   return false;
  // }

//   // public isLoggedIn(): boolean {
//   //   let status = false;
//   //   if (localStorage.getItem('isLoggedIn') == "true") {
//   //     status = true;
//   //   }
//   //   else {
//   //     status = false;
//   //   }
//   //   return status;
//   // }


//     // if(this.auth.loginUser()){
//     //   return true;
//     // }
//     // else{
//     //   this.router.navigate(['login']);
//     //   return false;
//     // }
//   }
  
// }
