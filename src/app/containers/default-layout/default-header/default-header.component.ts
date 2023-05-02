import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss']
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  totalnew: number = 0;
  user : number=0;
  notificationdata : any=[];
  // visible = false;
  
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private router: Router, private authService:AuthService) {
    super();
  }


  // toggleCollapse(): void {
  //   this.visible = !this.visible;
  // }

  ngOnInit(): void {

    this.user = Number(localStorage.getItem('role'));

    setTimeout(()=>{
      localStorage.clear();
    },1800000);


    setInterval(() => {
      this.getAllValues(); // api call
      this.getAllTables();
    }, 1000);

    this.getAllValues();
    this.getAllTables();
  }

  username = String(localStorage.getItem('username'));
  firstname = String(localStorage.getItem('firstname'));
  lastname = String(localStorage.getItem('lastname'));
  F = Array.from(this.firstname)[0];
  L = Array.from(this.lastname)[0];


  logOut(){
    this.ngOnInit();
    localStorage.clear();
    this.router.navigate(['/login']);
  }


  //get for all tables
  getAllValues() {
    // debugger
    this.authService.getAllValues().subscribe(responce => {
      // debugger
      if (responce.IsSuccess) {

        if (responce.Data.table.length > 0) {
          this.totalnew = responce.Data.table[0].totalnew;
        }
      }
    });
  }


  getAllTables() {
    // debugger
    this.authService.getAllTables().subscribe(responce => {
      // debugger
      if (responce.IsSuccess) {

        if (responce.Data.table9.length > 0) {
          this.notificationdata = responce.Data.table9;
        }
        else{
          this.notificationdata = [];
        }
      }
    });
  }

}
