import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-totalworking',
  templateUrl: './totalworking.component.html',
  styleUrls: ['./totalworking.component.css']
})
export class TotalworkingComponent {



  userinfo : any;
  branch : any;
  laptop : any;
  cpu : any;
  headphones : any;
  spareAssets : any;
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
        if(responce.Data.table.length > 0)
        {
          this.userinfo = responce.Data.table[0].userinfo;
          this.branch = responce.Data.table[0].branch;
          this.laptop = responce.Data.table[0].laptop;
          this.cpu = responce.Data.table[0].cpu;
          this.headphones = responce.Data.table[0].headphones;
          this.spareAssets = responce.Data.table[0].spareAssets;
        }
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
