import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent {
  
  vendordata : any=[];
  pageSize : number=5;
  PageNumber:any=1;
  totalrecord : any=0;
  Vendors : any="";

    constructor(private authservice:AuthService) { }
  
    ngOnInit(): void {
      //debugger
      this.vendorDetails(this.PageNumber,this.pageSize,this.Vendors);
    }
  
    vendorDetails(PageNumber:number,pageSize:number,Vendor:string) {
      //  debugger
      this.authservice.vendorDetails(PageNumber,pageSize,Vendor).subscribe(responce => {
       
        if(responce.IsSuccess)
        {
          this.totalrecord = responce.Data[0].totalrecord;
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
      this.vendorDetails(this.PageNumber, this.pageSize, this.Vendors);
    }
  
  
    changePageSize(){
      // debugger
      this.PageNumber=1;
     this.vendorDetails(this.PageNumber, this.pageSize, this.Vendors);
    }


    //search method
    searchVendor(){
      this.vendorDetails(this.PageNumber, this.pageSize, this.Vendors);
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
            this.vendorDetails(this.PageNumber,this.pageSize, this.Vendors);
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