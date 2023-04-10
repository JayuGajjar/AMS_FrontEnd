import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private router: Router) {
    super();
  }

  ngOnInit(): void {
    setTimeout(()=>{
      sessionStorage.clear();
    },1800000);
   }

  username = String(sessionStorage.getItem('username'));
  firstname = String(sessionStorage.getItem('firstname'));
  lastname = String(sessionStorage.getItem('lastname'));
  F = Array.from(this.firstname)[0];
  L = Array.from(this.lastname)[0];


  logOut(){
    this.ngOnInit();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
