import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-totalnew-request',
  templateUrl: './totalnew-request.component.html',
  styleUrls: ['./totalnew-request.component.css']
})
export class TotalnewRequestComponent {


  newrequestsdata : any=[];
  // pageSize : number=5;
  // PageNumber: any=1;
  // Assets : any="";

  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
    // debugger
    this.newrequestsDetails();
  }

  //get method for get the data of branch
  newrequestsDetails() {
    // debugger
    this.authservice.newRequestsDetails().subscribe(responce => {
     
      if(responce.IsSuccess)
      {
        this.newrequestsdata = responce.Data;
      }
      else
      {
        alert(responce.ReturnMessage);
      }
     
    });
  }

  // pageChangeEvent(event: number) {
  //   this.PageNumber = event;
  //   this.assetDetails(this.PageNumber, this.pageSize,this.Assets);
  // }


  // changePageSize(){
  //   // debugger
  //   this.PageNumber=1;
  //  this.assetDetails(this.PageNumber, this.pageSize,this.Assets);
  // }


  // //search method
  // searchAsset(){
  //   // debugger
  //   this.assetDetails(this.PageNumber,this.pageSize,this.Assets);
  // }



}

