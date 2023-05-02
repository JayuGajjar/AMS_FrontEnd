import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { vendors } from 'src/app/Interfaces/vendors';
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
  loader = true;

  vendorForm : FormGroup;
  data : vendors;
  submitted = false;
  submitbtn = false;
  // vendordata : any=[];
  frlable:string="";
  title:string="";
  vendorid: number=0;

    constructor(private authservice: AuthService, private FB: FormBuilder,private router: Router,private route: ActivatedRoute) 
    {

      this.data = {
        vendorid : 0,
        name : "",
      }
      
      this.vendorForm = this.FB.group({
        name : ['',[Validators.required, Validators.pattern("[a-zA-Z0-9-_ ][a-zA-Z0-9-_ ]+")]],
        // invoiceno : ['',[Validators.required, Validators.pattern("[a-zA-Z0-9-_ ][a-zA-Z0-9-_ ]+")]],
        // invoicedate : ['',[Validators.required]], //Validators.pattern("^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$")]], //date formate DD/MM/YYYY
        // warranty_till : ['',[Validators.required]], //Validators.pattern("^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$")]], //date formate DD/MM/YYYY
  
      })

    }

  public visible = false;


  toggleModal()
  {
    this.onReset();
    this.vendorid = 0;
    this.visible = !this.visible;
    this.frlable="Add";
  }

  vendorModal(getDatabyId:any) {
    debugger
    this.onReset();
    this.visible = !this.visible;
    this.frlable="Update";
    this.vendorForm.controls["name"].setValue(getDatabyId.Name);
    this.vendorid=getDatabyId.Vendorid;
  }

  handleChange(event: any) {
    this.visible = event;
  }

  
    ngOnInit(): void {

      this.role = Number(localStorage.getItem('role'));
      if(this.role==2){
        this.router.navigate(['/dashboard']);
      }

      //debugger
      this.vendorDetails(this.PageNumber,this.pageSize,this.Vendors,this.dateid);


      this.role = Number(localStorage.getItem('role'));
    if(this.role==2){
      this.router.navigate(['/dashboard']);
    }

  //  debugger
    const ID: number = parseInt(this.route.snapshot.params['id']);
    if(ID>0){
      //fill record in
      this.title="Update";
      this.frlable="Update";
      this.getVendorById(ID)
      }
      else
      {
        this.title="Add"
        this.frlable="Add";
        this.vendorid=0;
      }
    }
  
    vendorDetails(PageNumber:number,pageSize:number,Vendor:string,dateid:string) {
      //  debugger
      this.authservice.vendorDetails(PageNumber,pageSize,Vendor,dateid).subscribe(responce => {
       
        if(responce.IsSuccess)
        {
          this.loader = false;
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



  get f() { return this.vendorForm.controls; }

  addVendors(){
    this.submitted = true;

    if(this.vendorForm.invalid)
    {
      this.submitbtn = false;
      return;
    }

    if(this.vendorid>0){
      this.data.vendorid = this.vendorid;
      this.data.name = this.vendorForm.value.name;

      this.authservice.editVendor(this.data).subscribe(response => {
    
        if(response.IsSuccess)
        {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.visible = !this.visible;
          this.vendorDetails(this.PageNumber, this.pageSize, this.Vendors,this.dateid);
        }
        else
        {
          Swal.fire(
            'Something went wrong!',
            response.ReturnMessage,
            'error'
          )
        }
      })

    }
    else{
      this.data.vendorid = this.vendorid;
      this.data.name = this.vendorForm.value.name;

      this.authservice.addvendors(this.data).subscribe(response => {
    
        if(response.IsSuccess)
        {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.visible = !this.visible;
          this.vendorDetails(this.PageNumber, this.pageSize, this.Vendors,this.dateid);
        }
        else
        {
          Swal.fire(
            'Something went wrong!',
            response.ReturnMessage,
            'error'
          )
          this.onReset();
        }
      })
    }
    
  }

  onReset(){
    this.submitted = false;
    this.submitbtn = false;
    this.vendorForm.patchValue({name:""});
  }

  // ngOnInit(): void {

  //   this.role = Number(localStorage.getItem('role'));
  //   if(this.role==2){
  //     this.router.navigate(['/dashboard']);
  //   }

  // //  debugger
  //   const ID: number = parseInt(this.route.snapshot.params['id']);
  //   if(ID>0){
  //     //fill record in
  //     this.title="Update";
  //     this.frlable="Update";
  //     this.getVendorById(ID)
  //     }
  //     else
  //     {
  //       this.title="Add"
  //       this.frlable="Add";
  //       this.vendorid=0;
  //     }
  //   }

    getVendorById(Vendorid : any){
      this.authservice.getVendorById(Vendorid).subscribe(responce => {
        // debugger
        if (responce.IsSuccess)
        {
          this.vendordata = [];

          if(responce.Data.length > 0){
            this.vendorid=responce.Data[0].Vendorid;
           this.vendorForm.controls["name"].setValue(responce.Data[0].Name);
           }
        }
      })
    }


}