import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-totalworking',
  templateUrl: './totalworking.component.html',
  styleUrls: ['./totalworking.component.css']
})
export class TotalworkingComponent {



  workingdata : any=[];
  role : number=0;
  pageSize : number=5;
  PageNumber: any=1;
  totalrecord : any=0;
  working : any="";

  constructor(private authservice:AuthService,private router:Router) { }

  ngOnInit(): void {

    this.role = Number(sessionStorage.getItem('role'));
    if(this.role==2){
      this.router.navigate(['/dashboard']);
    }

    //debugger
    this.workingDetails(this.PageNumber,this.pageSize,this.working);
  }

  //get method for get the data of branch
  workingDetails(PageNumber:number,pageSize:number,working:string) {
    // debugger
    this.authservice.workingDetails(PageNumber,pageSize,working).subscribe(responce => {
     
      if(responce.IsSuccess)
      {
        this.totalrecord = responce.Data[0].totalrecord;
        this.workingdata = responce.Data;
      }
      else
      {
        alert(responce.ReturnMessage);
      }
     
    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.workingDetails(this.PageNumber, this.pageSize,this.working);
  }


  changePageSize(){
    // debugger
    this.PageNumber=1;
   this.workingDetails(this.PageNumber, this.pageSize,this.working);
  }


  //search method
  searchWorking(){
    // debugger
    this.workingDetails(this.PageNumber,this.pageSize,this.working);
  }



}
