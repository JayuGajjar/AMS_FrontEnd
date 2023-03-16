import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-popovers',
  templateUrl: './popovers.component.html',
  styleUrls: ['./popovers.component.css']
})
export class PopoversComponent implements OnInit {
  
  vendordata : any=[];
  pageSize : number=5;
  PageNumber:any=1;
    constructor(private authservice:AuthService) { }
  
    ngOnInit(): void {
      //debugger
      this.vendorDetails(this.PageNumber,this.pageSize);
    }
  
    vendorDetails(PageNumber:number,pageSize:number) {
      // debugger
      this.authservice.vendorDetails(PageNumber,pageSize).subscribe(responce => {
       
        if(responce.IsSuccess)
        {
          this.vendordata = responce.Data;
        }
        else
        {
          alert(responce.ReturnMessage);
        }
       
      });
    }
  
    pageChangeEvent(event: number) {
      this.PageNumber = event;
      this.vendorDetails(this.PageNumber, this.pageSize);
    }
  
  
    changePageSize(){
      // debugger
      this.PageNumber=1;
     this.vendorDetails(this.PageNumber, this.pageSize);
    }

    //delete method
  deleteVendor(vendorlist : any) {
          
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
        this.authservice.deleteVendor(vendorlist.Vendorid).subscribe(responce => {
        
          if (responce.IsSuccess){
            Swal.fire(
              'Deleted!',
              responce.ReturnMessage,
              'success'
            )
            this.vendorDetails(this.PageNumber,this.pageSize);
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
