import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  role : number=0;
  pageSize : number=5;
  PageNumber: any=1;
  totalrecord : any=0;
  InUse : any="";
  loader = true;

  constructor(private authservice:AuthService, private router:Router) { }

  ngOnInit(): void {

    this.role = Number(localStorage.getItem('role'));
    if (this.role == 2) {
      this.router.navigate(['/dashboard']);
    }
    // debugger
    this.inuseDetails(this.PageNumber,this.pageSize,this.InUse);
  }

  //get method for get the data of branch
  inuseDetails(PageNumber:number,pageSize:number,InUse:string) {
    // debugger
    this.authservice.inuseDetails(PageNumber,pageSize,InUse).subscribe(responce => {
     
      if(responce.IsSuccess)
      {
        this.loader = false;
        this.totalrecord = responce.Data[0].totalrecord;
        this.inusedata = responce.Data;
      }
      else
      {
        this.inusedata = [];
      }
     
    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.inuseDetails(this.PageNumber, this.pageSize,this.InUse);
  }


  changePageSize(){
    // debugger
    this.PageNumber=1;
   this.inuseDetails(this.PageNumber, this.pageSize,this.InUse);
  }


  //search method
  searchInUse(){
    // debugger
    this.inuseDetails(this.PageNumber,this.pageSize,this.InUse);
  }



}
