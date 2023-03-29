import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-totalworking',
  templateUrl: './totalworking.component.html',
  styleUrls: ['./totalworking.component.css']
})
export class TotalworkingComponent {



  workingdata : any=[];
  // pageSize : number=5;
  // PageNumber: any=1;
  // Assets : any="";

  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
    //debugger
    this.workingDetails();
  }

  //get method for get the data of branch
  workingDetails() {
    // debugger
    this.authservice.workingDetails().subscribe(responce => {
     
      if(responce.IsSuccess)
      {
        this.workingdata = responce.Data;
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
