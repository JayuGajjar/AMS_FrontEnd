import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-totalundermaintenance',
  templateUrl: './totalundermaintenance.component.html',
  styleUrls: ['./totalundermaintenance.component.css']
})
export class TotalundermaintenanceComponent {


  maintenancedata: any = [];
  role: number = 0;
  pageSize: number = 5;
  PageNumber: any = 1;
  totalrecord: any = 0;
  maintenance: any = "";

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.role = Number(localStorage.getItem('role'));
    if (this.role == 2) {
      this.router.navigate(['/dashboard']);
    }

    //debugger
    this.underMaintenanceDetails(this.PageNumber, this.pageSize, this.maintenance);
  }

  //get method for get the data of branch
  underMaintenanceDetails(PageNumber: number, pageSize: number, maintenance: string) {
    debugger
    this.authservice.underMaintananceDetails(PageNumber, pageSize, maintenance).subscribe(responce => {

      if (responce.IsSuccess) {
        if(responce.Data.length > 0){
          this.totalrecord = responce.Data[0].totalrecord;
          this.maintenancedata = responce.Data;
        }
      }
      else {
        this.maintenancedata = [];
      }

    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.underMaintenanceDetails(this.PageNumber, this.pageSize, this.maintenance);
  }


  changePageSize() {
    // debugger
    this.PageNumber = 1;
    this.underMaintenanceDetails(this.PageNumber, this.pageSize, this.maintenance);
  }


  //search method
  searchMaintenance() {
    // debugger
    this.underMaintenanceDetails(this.PageNumber, this.pageSize, this.maintenance);
  }



}
