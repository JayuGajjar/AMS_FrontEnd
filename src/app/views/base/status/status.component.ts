import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent {

  statusdata : any=[];
  pageSize : number=5;
  PageNumber:any=1;
  totalrecord : any=0;
  Status : any="";
  assetid : any=0;
  statusid : any=0;
  dateid : any=0;
  role : number=0;
  assetlistdata : any=[];
  statuslistdata : any=[];

  constructor(private service:AuthService, private router:Router) { }

  ngOnInit(): void {

    this.role = Number(localStorage.getItem('role'));
    if(this.role==2){
      this.router.navigate(['/dashboard']);
    }


    this.getAllTables();

    //debugger
    this.getFeedbacktype(this.PageNumber,this.pageSize,this.Status,this.assetid,this.statusid,this.dateid);
  }

  getFeedbacktype(PageNumber:number,pageSize:number,Status:string,assetid:number,statusid:number,dateid:number) {
    // debugger
    this.service.statusDetails(PageNumber,pageSize,Status,assetid,statusid,dateid).subscribe(responce => {
     
      if(responce.IsSuccess)
      {
        this.totalrecord = responce.Data[0].totalrecord;
        this.statusdata = responce.Data;
      }
      else
      {
        this.statusdata = [];
      }
     
    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.getFeedbacktype(this.PageNumber, this.pageSize, this.Status,this.assetid,this.statusid,this.dateid);
  }


  changePageSize(){
    // debugger
    this.PageNumber=1;
   this.getFeedbacktype(this.PageNumber, this.pageSize, this.Status,this.assetid,this.statusid,this.dateid);
  }


  //search method
  searchStatus(){
    this.getFeedbacktype(this.PageNumber, this.pageSize, this.Status,this.assetid,this.statusid,this.dateid);
  }



  //get for all tables
  getAllTables(){
    // debugger
    this.service.getAllTables().subscribe(responce => {
      debugger
      if(responce.IsSuccess){
        
        if(responce.Data.table1.length > 0){
          this.statuslistdata = responce.Data.table1;
        }
        else
        {
          this.statuslistdata = [];
        }

        if(responce.Data.table7.length > 0){
          this.assetlistdata = responce.Data.table7;
        }
        else
        {
          this.assetlistdata = [];
        }
      }
    })
  }



}