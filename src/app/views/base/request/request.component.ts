import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {

  requestdata : any=[];
  pageSize : number=5;
  PageNumber : any=1;
  totalrecord : number=0;
  Requests : any="";
  id : any;
  type: any;
  isworking : any;
  inuse : any;
  role : number=0;


    constructor(private authservice:AuthService, private router:Router ,private route:ActivatedRoute) { }
  
    ngOnInit(): void {

      this.role = Number(sessionStorage.getItem('role'));
      if(this.role==2){
        this.router.navigate(['/dashboard']);
      }


      // const ID: number = parseInt(this.route.snapshot.params['id']);
      // if(ID>0){
      //   this.statusChange(this.id,this.isworking,this.inuse);
      // }
      //debugger
      this.requestDetails(this.PageNumber,this.pageSize,this.Requests);
    }
  
    requestDetails(PageNumber:number,pageSize:number,Requests:string) {
      // debugger
      this.authservice.requestDetailsAdmin(PageNumber,pageSize,Requests).subscribe(responce => {
       
        if(responce.IsSuccess)
        {
          this.totalrecord=responce.Data[0].totalrecord;
          this.requestdata = responce.Data;
        }
        else
        {
          this.requestdata = [];
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
    


    //status change
      statusChange(id:number,type:number,isworking:boolean,inuse:boolean){
        // debugger
        this.authservice.statusChange(id,type,isworking,inuse).subscribe(responce => {
          debugger
          if(responce.IsSuccess)
          {
            Swal.fire(
              'Success!',
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
            })
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