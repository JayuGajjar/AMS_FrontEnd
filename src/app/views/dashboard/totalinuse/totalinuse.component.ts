import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-totalinuse',
  templateUrl: './totalinuse.component.html',
  styleUrls: ['./totalinuse.component.css']
})
export class TotalinuseComponent {


  inusedata : any=[];
  name : any;
  userinfo : any;
  assetsinUse : any;
  // pageSize : number=5;
  // PageNumber: any=1;
  // Assets : any="";

  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
    debugger
    this.inuseDetails();
  }

  //get method for get the data of branch
  inuseDetails() {
    debugger
    this.authservice.inuseDetails().subscribe(responce => {
     
      if(responce.IsSuccess)
      {
        if(responce.Data.table.length > 0)
        {
          this.name = responce.Data.table[0].name;
          this.userinfo = responce.Data.table[0].userinfo;
          this.assetsinUse = responce.Data.table[0].assetsinUse;
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
