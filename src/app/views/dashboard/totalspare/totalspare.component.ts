import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  role : number=0;
  pageSize : number=5;
  PageNumber: any=1;
  totalrecord : any=0;
  spares : any="";

  constructor(private authservice:AuthService, private router:Router) { }

  ngOnInit(): void {

    this.role = Number(sessionStorage.getItem('role'));
    if(this.role==2){
      this.router.navigate(['/dashboard']);
    }

    //debugger
    this.spareDetails(this.PageNumber,this.pageSize,this.spares);
  }

  //get method for get the data of branch
  spareDetails(PageNumber:number,pageSize:number,spares:string) {
    // debugger
    this.authservice.spareDetails(PageNumber,pageSize,spares).subscribe(responce => {
     
      if(responce.IsSuccess)
      {
        this.totalrecord = responce.Data[0].totalrecord;
        this.sparedata = responce.Data;
      }
      else
      {
        alert(responce.ReturnMessage);
      }
     
    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.spareDetails(this.PageNumber, this.pageSize,this.spares);
  }


  changePageSize(){
    // debugger
    this.PageNumber=1;
   this.spareDetails(this.PageNumber, this.pageSize,this.spares);
  }


  //search method
  searchSpare(){
    // debugger
    this.spareDetails(this.PageNumber,this.pageSize,this.spares);
  }



}
