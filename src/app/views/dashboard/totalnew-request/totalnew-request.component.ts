import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-totalnew-request',
  templateUrl: './totalnew-request.component.html',
  styleUrls: ['./totalnew-request.component.css']
})
export class TotalnewRequestComponent {


  newrequestsdata: any = [];
  role: number = 0;
  pageSize: number = 5;
  PageNumber: any = 1;
  totalrecord: any = 0;
  newRequests: any = "";

  Requests: any = "";
  assetid: any = 0;
  statusid: any = 1;
  dateid: any = 0;
  statuslistdata: any = [];
  assetlistdata: any = [];
  typelistdata: any = [];
  requestdata: any = [];
  loader = true;

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.role = Number(localStorage.getItem('role'));
    if (this.role == 2) {
      this.router.navigate(['/dashboard']);
    }

    // debugger
    this.requestDetails(this.PageNumber, this.pageSize, this.Requests, this.assetid, this.statusid, this.dateid);
  }

  //get method for get the data of New request
  requestDetails(PageNumber: number, pageSize: number, Requests: string, assetid: number, statusid: number, dateid: number) {
    debugger
    this.authservice.requestDetailsAdmin(PageNumber, pageSize, Requests, assetid, statusid, dateid).subscribe(responce => {

      if (responce.IsSuccess)
      {
        debugger
        this.loader = false;
        this.totalrecord = responce.Data[0].totalrecord;
        this.requestdata = responce.Data;
      }
      else {
        this.requestdata = [];
      }

    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.requestDetails(this.PageNumber, this.pageSize, this.Requests, this.assetid, this.statusid, this.dateid);
  }


  changePageSize() {
    // debugger
    this.PageNumber = 1;
    this.requestDetails(this.PageNumber, this.pageSize, this.Requests, this.assetid, this.statusid, this.dateid);
  }


  //search method
  searchRequest() {
    this.requestDetails(this.PageNumber, this.pageSize, this.Requests, this.assetid, this.statusid, this.dateid);
  }



  //accept and dlt request
  acptdltRequest(id: number, type: number, accept: boolean) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Yes, I'm Sure!"
    }).then((result) => {

      if (result.value) {

        debugger
        this.authservice.acptdltRequest(id, type, accept).subscribe(responce => {
          debugger
          if (responce.IsSuccess) {
            Swal.fire(
              'Success!',
              responce.ReturnMessage,
              'success'
            )
            this.requestDetails(this.PageNumber, this.pageSize, this.Requests, this.assetid, this.statusid, this.dateid);
          }
          else {
            Swal.fire(
              'Something went wrong!',
              responce.ReturnMessage,
              'error'
            )
          }
          this.requestDetails(this.PageNumber, this.pageSize, this.Requests, this.assetid, this.statusid, this.dateid);
        })
      }
    });
  }



  //get mathod for all tables
  getAllTables() {
    // debugger
    this.authservice.getAllTables().subscribe(responce => {
      // debugger
      if (responce.IsSuccess)

        if (responce.Data.table1.length > 0) {
          this.statuslistdata = responce.Data.table1;
        }
        else {
          this.statuslistdata = [];
        }

      if (responce.Data.table7.length > 0) {
        this.assetlistdata = responce.Data.table7;
      }
      else {
        this.assetlistdata = [];
      }

      {
        if (responce.Data.table7.length > 0) {
          this.typelistdata = responce.Data.table7;
        }
        else {
          this.typelistdata = [];
        }
      }
    })
  }



}

