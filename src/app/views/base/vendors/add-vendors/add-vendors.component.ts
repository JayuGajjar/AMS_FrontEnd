import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { vendors } from 'src/app/Interfaces/vendors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-vendors',
  templateUrl: './add-vendors.component.html',
  styleUrls: ['./add-vendors.component.css']
})
export class AddVendorsComponent {

    vendorForm : FormGroup;
    data : vendors;
    submitted = false;
    vendordata : any=[];
    frlable:string="";
    title:string="";
    vendorid: number=0;
    role : number=0;

  constructor(private authservice: AuthService, private FB: FormBuilder,private router: Router,private route: ActivatedRoute) 
  { 
    this.data = {
      vendorid : 0,
      name : "",
      invoiceno : "",
      invoicedate : "",
      warranty_till : "",
    }
    
    this.vendorForm = this.FB.group({
      name : ['',[Validators.required, Validators.pattern("[a-zA-Z0-9-_ ][a-zA-Z0-9-_ ]+")]],
      invoiceno : ['',[Validators.required, Validators.pattern("[a-zA-Z0-9-_ ][a-zA-Z0-9-_ ]+")]],
      invoicedate : ['',[Validators.required]], //Validators.pattern("^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$")]], //date formate DD/MM/YYYY
      warranty_till : ['',[Validators.required]], //Validators.pattern("^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$")]], //date formate DD/MM/YYYY

    })
   
  }

  get f() { return this.vendorForm.controls; }

  addVendors(){
    this.submitted = true;

    if(this.vendorForm.invalid)
    {
      return;
    }

    if(this.vendorid>0){
      this.data.vendorid = this.vendorid;
      this.data.name = this.vendorForm.value.name;
      this.data.invoiceno = this.vendorForm.value.invoiceno;
      this.data.invoicedate = this.vendorForm.value.invoicedate;
      this.data.warranty_till = this.vendorForm.value.warranty_till;

      this.authservice.editVendor(this.data).subscribe(response => {
    
        if(response.IsSuccess)
        {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.router.navigate(['/base/vendor']);
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
      this.data.invoiceno = this.vendorForm.value.invoiceno;
      this.data.invoicedate = this.vendorForm.value.invoicedate;
      this.data.warranty_till = this.vendorForm.value.warranty_till;

      this.authservice.addvendors(this.data).subscribe(response => {
    
        if(response.IsSuccess)
        {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.router.navigate(['/base/vendor']);
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
    this.vendorForm.patchValue({name:""});
    this.vendorForm.patchValue({invoiceno:""});
    this.vendorForm.patchValue({invoicedate:""});
    this.vendorForm.patchValue({warranty_till:""});
  }

  ngOnInit(): void {

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

    getVendorById(Vendorid : any){
      this.authservice.getVendorById(Vendorid).subscribe(responce => {
        // debugger
        if (responce.IsSuccess)
        {
          this.vendordata = [];

          if(responce.Data.length > 0){
            this.vendorid=responce.Data[0].Vendorid;
           this.vendorForm.controls["name"].setValue(responce.Data[0].Name);
           this.vendorForm.controls["invoiceno"].setValue(responce.Data[0].InvoiceNo);
           this.vendorForm.controls["invoicedate"].setValue(responce.Data[0].InvoiceDate);
           this.vendorForm.controls["warranty_till"].setValue(responce.Data[0].Warranty_Till);
           }
        }
      })
    }
    
}
