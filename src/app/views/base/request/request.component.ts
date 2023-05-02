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
  assetid : any=0;
  statusid : any=0;
  dateid : any=0;
  id : any;
  type: any;
  isworking : any;
  inuse : any;
  role : number=0;
  assetlistdata : any=[];
  statuslistdata : any=[];
  uniqueid : any;
  serialno : any;


    constructor(private authservice:AuthService, private router:Router ,private route:ActivatedRoute) { }
  
    ngOnInit(): void {

      this.role = Number(localStorage.getItem('role'));
      if(this.role==2){
        this.router.navigate(['/dashboard']);
      }

      this.getAllTables();


      // const ID: number = parseInt(this.route.snapshot.params['id']);
      // if(ID>0){
      //   this.statusChange(this.id,this.isworking,this.inuse);
      // }
      //debugger
      this.requestDetails(this.PageNumber,this.pageSize,this.Requests,this.assetid,this.statusid,this.dateid);
    }
  
    requestDetails(PageNumber:number,pageSize:number,Requests:string,assetid:number,statusid:number,dateid:number) {
      // debugger
      this.authservice.requestDetailsAdmin(PageNumber,pageSize,Requests,assetid,statusid,dateid).subscribe(responce => {
       
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
      this.requestDetails(this.PageNumber, this.pageSize, this.Requests,this.assetid,this.statusid,this.dateid);
    }
  
  
    changePageSize(){
      // debugger
      this.PageNumber=1;
     this.requestDetails(this.PageNumber, this.pageSize, this.Requests,this.assetid,this.statusid,this.dateid);
    }


    //search method
    searchRequest(){
      this.requestDetails(this.PageNumber, this.pageSize, this.Requests,this.assetid,this.statusid,this.dateid);
    }
    


    //status change
      statusChange(id:number,type:number,isworking:boolean,inuse:boolean,uniqueid:any,serialno:any){
        // debugger
        this.authservice.statusChange(id,type,isworking,inuse,uniqueid,serialno).subscribe(responce => {
          debugger
          if(responce.IsSuccess)
          {
            Swal.fire(
              'Success!',
              responce.ReturnMessage,
              'success'
              )
              this.requestDetails(this.PageNumber,this.pageSize, this.Requests,this.assetid,this.statusid,this.dateid);
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
              this.requestDetails(this.PageNumber,this.pageSize, this.Requests,this.assetid,this.statusid,this.dateid);
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



  //get for all tables
  getAllTables(){
    // debugger
    this.authservice.getAllTables().subscribe(responce => {
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