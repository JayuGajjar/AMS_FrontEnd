import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-totalreadyforscrap',
  templateUrl: './totalreadyforscrap.component.html',
  styleUrls: ['./totalreadyforscrap.component.css']
})
export class TotalreadyforscrapComponent {

  readyforscrapdata: any = [];
  role: number = 0;
  pageSize: number = 5;
  PageNumber: any = 1;
  totalrecord: any = 0;
  readyforscrap: any = "";

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.role = Number(localStorage.getItem('role'));
    if (this.role == 2) {
      this.router.navigate(['/dashboard']);
    }

    //debugger
    this.readyForScrapDetails(this.PageNumber, this.pageSize, this.readyforscrap);
  }

  //get method for get the data of branch
  readyForScrapDetails(PageNumber: number, pageSize: number, readyforscrap: string) {
    // debugger
    this.authservice.readyForScrapDetails(PageNumber, pageSize, readyforscrap).subscribe(responce => {

      if (responce.IsSuccess) {
        this.totalrecord = responce.Data[0].totalrecord;
        this.readyforscrapdata = responce.Data;
      }
      else {
        this.readyforscrapdata = [];
      }

    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.readyForScrapDetails(this.PageNumber, this.pageSize, this.readyforscrap);
  }


  changePageSize() {
    // debugger
    this.PageNumber = 1;
    this.readyForScrapDetails(this.PageNumber, this.pageSize, this.readyforscrap);
  }


  //search method
  searchReadyForScrap() {
    // debugger
    this.readyForScrapDetails(this.PageNumber, this.pageSize, this.readyforscrap);
  }



}
