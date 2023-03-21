import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collapses',
  templateUrl: './collapses.component.html',
  styleUrls: ['./collapses.component.css']
})
export class CollapsesComponent {

  requestdata : any=[];
  pageSize : number=5;
  PageNumber : any=1;
  Requests : any="";

    constructor(private authservice:AuthService) { }
  
    ngOnInit(): void {
      //debugger
      this.requestDetails(this.PageNumber,this.pageSize,this.Requests);
    }
  
    requestDetails(PageNumber:number,pageSize:number,Requests:string) {
      // debugger
      this.authservice.requestDetails(PageNumber,pageSize,Requests).subscribe(responce => {
       
        if(responce.IsSuccess)
        {
          this.requestdata = responce.Data;
        }
        else
        {
          alert(responce.ReturnMessage);
        }
       
      });
    }
  
    pageChangeEvent(event: number) {
      this.PageNumber = event;
      this.requestDetails(this.PageNumber, this.pageSize, this.Requests);
    }
  
  
    changePageSize(){
      // debugger
      this.PageNumber=1;
     this.requestDetails(this.PageNumber, this.pageSize, this.Requests);
    }


    //search method
    searchRequest(){
      this.requestDetails(this.PageNumber, this.pageSize, this.Requests);
    }

    //delete method
    deleteRequest(requestlist : any) {
          
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {

        if (result.value) {
          this.authservice.deleteRequest(requestlist.Requestid).subscribe(responce => {
          
            if (responce.IsSuccess){
              Swal.fire(
                'Deleted!',
                responce.ReturnMessage,
                'success'
              )
              this.requestDetails(this.PageNumber,this.pageSize, this.Requests);
            }
            else 
            {
              Swal.fire(
                'Something went wrong!',
                responce.ReturnMessage,
                'error'
              )
            }
          });
        }
      })
  }
  
}

