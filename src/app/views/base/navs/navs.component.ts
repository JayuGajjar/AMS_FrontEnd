import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navs',
  templateUrl: './navs.component.html',
  styleUrls: ['./navs.component.css']
})

export class NavsComponent {

  statusdata : any=[];
  pageSize : number=5;
  PageNumber:any=1;

  constructor(private service:AuthService) { }

  ngOnInit(): void {
    //debugger
    this.getFeedbacktype(this.PageNumber,this.pageSize);
  }

  getFeedbacktype(PageNumber:number,pageSize:number) {
    // debugger
    this.service.statusDetails(PageNumber,pageSize).subscribe(responce => {
     
      if(responce.IsSuccess)
      {
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
    this.getFeedbacktype(this.PageNumber, this.pageSize);
  }


  changePageSize(){
    // debugger
    this.PageNumber=1;
   this.getFeedbacktype(this.PageNumber, this.pageSize);
  }
}

