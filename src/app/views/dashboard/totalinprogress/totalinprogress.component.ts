import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-totalinprogress',
  templateUrl: './totalinprogress.component.html',
  styleUrls: ['./totalinprogress.component.css']
})
export class TotalinprogressComponent  {


  inprogressdata : any=[];
  name : any;
  userinfo : any;
  assetsinUse : any;
  role : number=0;
  pageSize : number=5;
  PageNumber: any=1;
  totalrecord : any=0;
  InProgress : any="";

  constructor(private authservice:AuthService, private router:Router) { }

  ngOnInit(): void {

    this.role = Number(localStorage.getItem('role'));
    if (this.role == 2) {
      this.router.navigate(['/dashboard']);
    }
    // debugger
    this.inprogressDetails(this.PageNumber,this.pageSize,this.InProgress);
  }

  //get method for get the data of branch
  inprogressDetails(PageNumber:number,pageSize:number,InProgress:string) {
    // debugger
    this.authservice.inprogressDetails(PageNumber,pageSize,InProgress).subscribe(responce => {
     
      if(responce.IsSuccess)
      {
        this.totalrecord = responce.Data[0].totalrecord;
        this.inprogressdata = responce.Data;
      }
      else
      {
        this.inprogressdata = [];
      }
     
    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.inprogressDetails(this.PageNumber, this.pageSize,this.InProgress);
  }


  changePageSize(){
    // debugger
    this.PageNumber=1;
   this.inprogressDetails(this.PageNumber, this.pageSize,this.InProgress);
  }


  //search method
  searchInProgress(){
    // debugger
    this.inprogressDetails(this.PageNumber,this.pageSize,this.InProgress);
  }



}
