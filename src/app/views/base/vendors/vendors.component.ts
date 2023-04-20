import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  dateid : any=0;
  role : number=0;

    constructor(private authservice:AuthService,private router:Router) { }
  
    ngOnInit(): void {

      this.role = Number(localStorage.getItem('role'));
      if(this.role==2){
        this.router.navigate(['/dashboard']);
      }

      //debugger
      this.vendorDetails(this.PageNumber,this.pageSize,this.Vendors,this.dateid);
    }
  
    vendorDetails(PageNumber:number,pageSize:number,Vendor:string,dateid:string) {
      //  debugger
      this.authservice.vendorDetails(PageNumber,pageSize,Vendor,dateid).subscribe(responce => {
       
        if(responce.IsSuccess)
        {
          this.totalrecord = responce.Data[0].totalrecord;
          this.vendordata = responce.Data;
        }
        else
        {
          this.vendordata = [];
        }
       
      });
    }
  
    pageChangeEvent(event: number) {
      this.PageNumber = event;
      this.vendorDetails(this.PageNumber, this.pageSize, this.Vendors,this.dateid);
    }
  
  
    changePageSize(){
      // debugger
      this.PageNumber=1;
     this.vendorDetails(this.PageNumber, this.pageSize, this.Vendors,this.dateid);
    }


    //search method
    searchVendor(){
      this.vendorDetails(this.PageNumber, this.pageSize, this.Vendors,this.dateid);
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
            this.vendorDetails(this.PageNumber,this.pageSize, this.Vendors,this.dateid);
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