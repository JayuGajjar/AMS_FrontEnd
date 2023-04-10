import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-totalnew-request',
  templateUrl: './totalnew-request.component.html',
  styleUrls: ['./totalnew-request.component.css']
})
export class TotalnewRequestComponent {


  newrequestsdata : any=[];
  role : number=0;
  pageSize : number=5;
  PageNumber: any=1;
  totalrecord : any=0;
  newRequests : any="";

  constructor(private authservice:AuthService, private router:Router) { }

  ngOnInit(): void {

    this.role = Number(sessionStorage.getItem('role'));
    if(this.role==2){
      this.router.navigate(['/dashboard']);
    }

    // debugger
    this.newrequestsDetails(this.PageNumber,this.pageSize,this.newRequests);
  }

  //get method for get the data of branch
  newrequestsDetails(PageNumber:number,pageSize:number,newRequests:string) {
    // debugger
    this.authservice.newRequestsDetails(PageNumber,pageSize,newRequests).subscribe(responce => {
     
      if(responce.IsSuccess)
      {
        this.totalrecord = responce.Data[0].totalrecord;
        this.newrequestsdata = responce.Data;
      }
      else
      {
        alert(responce.ReturnMessage);
      }
     
    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.newrequestsDetails(this.PageNumber, this.pageSize,this.newRequests);
  }


  changePageSize(){
    // debugger
    this.PageNumber=1;
   this.newrequestsDetails(this.PageNumber, this.pageSize,this.newRequests);
  }


  //search method
  searchNewRequest(){
    // debugger
    this.newrequestsDetails(this.PageNumber,this.pageSize,this.newRequests);
  }



}

