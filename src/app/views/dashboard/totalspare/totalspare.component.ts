import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-totalspare',
  templateUrl: './totalspare.component.html',
  styleUrls: ['./totalspare.component.css']
})
export class TotalspareComponent {



  sparedata : any=[];
  userinfo: any;
  branch: any;
  type: any;
  spareAssets: any;
  status: any;
  // pageSize : number=5;
  // PageNumber: any=1;
  // Assets : any="";

  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
    //debugger
    this.spareDetails();
  }

  //get method for get the data of branch
  spareDetails() {
    // debugger
    this.authservice.spareDetails().subscribe(responce => {
     
      if(responce.IsSuccess)
      {
        this.sparedata = responce.Data;
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
