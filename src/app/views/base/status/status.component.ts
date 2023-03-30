import { Component } from '@angular/core';
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

  constructor(private service:AuthService) { }

  ngOnInit(): void {
    //debugger
    this.getFeedbacktype(this.PageNumber,this.pageSize,this.Status);
  }

  getFeedbacktype(PageNumber:number,pageSize:number,Status:string) {
    // debugger
    this.service.statusDetails(PageNumber,pageSize,Status).subscribe(responce => {
     
      if(responce.IsSuccess)
      {
        this.totalrecord = responce.Data[0].totalrecord;
        this.statusdata = responce.Data;
      }
      else
      {
        alert(responce.ReturnMessage);
      }
     
    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.getFeedbacktype(this.PageNumber, this.pageSize, this.Status);
  }


  changePageSize(){
    // debugger
    this.PageNumber=1;
   this.getFeedbacktype(this.PageNumber, this.pageSize, this.Status);
  }


  //search method
  searchStatus(){
    this.getFeedbacktype(this.PageNumber, this.pageSize, this.Status);
  }
}