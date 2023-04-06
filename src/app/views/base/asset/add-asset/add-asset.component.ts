import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { asset } from 'src/app/Interfaces/asset';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent {

  assetForm : FormGroup;
  data : asset;
  submitted = false;
  assetdata : any=[];
  frlable:string="";
  title:string="";
  assetid: number=0;
  typelistdata : any=[];
  branchlistdata : any=[];
  companylistdata : any=[];
  departmentlistdata : any=[];
  vendorlistdata : any=[];

constructor(private authservice: AuthService, private FB: FormBuilder,private router: Router,private route: ActivatedRoute) 
{ 
  this.data = {
    serialno : "",
    branch : 0,
    brand : "",
    type : 0,
    model : "",
    nos : 0,
    specification : "",
    vendorid : 0,
  }
  
  this.assetForm = this.FB.group({
    serialno : ['',[Validators.required]],
    branch : ['',[Validators.required]],
    brand : ['',[Validators.required,
                  Validators.pattern('[A-Z]+')]],
    type : ['',[Validators.required]],
    model : ['',[Validators.required]],
    nos : ['',[Validators.required,
                Validators.pattern('[0-9]+')]],
    specification : ['',[Validators.required]],
    vendorid : ['',[Validators.required]],

  })
 
}

get f() { return this.assetForm.controls; }

addAsset(){
  this.submitted = true;

  if(this.assetForm.invalid)
  {
    return;
  }

  if(this.assetid>0){
    this.data.serialno = this.assetForm.value.serialno;
    this.data.branch = this.assetForm.value.branch;
    this.data.brand = this.assetForm.value.brand;
    this.data.type = this.assetForm.value.type;
    this.data.model = this.assetForm.value.model;
    this.data.nos = this.assetForm.value.nos;
    this.data.specification = this.assetForm.value.specification;
    this.data.vendorid = this.assetForm.value.vendorid;

    this.authservice.editAsset(this.data,this.assetid).subscribe(response => {
  
      if(response.IsSuccess)
      {
        Swal.fire(
          'Great!',
          response.ReturnMessage,
          'success'
        )
        this.router.navigate(['/base/asset']);
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
    this.data.serialno = this.assetForm.value.serialno;
    this.data.branch = this.assetForm.value.branch;
    this.data.brand = this.assetForm.value.brand;
    this.data.type = this.assetForm.value.type;
    this.data.model = this.assetForm.value.model;
    this.data.nos = this.assetForm.value.nos;
    this.data.specification = this.assetForm.value.specification;
    this.data.vendorid = this.assetForm.value.vendorid;

    this.authservice.addasset(this.data).subscribe(response => {
  
      if(response.IsSuccess)
      {
        Swal.fire(
          'Great!',
          response.ReturnMessage,
          'success'
        )
        this.router.navigate(['/base/asset']);
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
  this.assetForm.patchValue({serialno:""});
  this.assetForm.patchValue({branch:""});
  this.assetForm.patchValue({brand:""});
  this.assetForm.patchValue({type:""});
  this.assetForm.patchValue({model:""});
  this.assetForm.patchValue({nos:""});
  this.assetForm.patchValue({specification:""});
  this.assetForm.patchValue({vendorid:""});
}

ngOnInit(): void {

  this.getAllTables();

//  debugger
  const ID: number = parseInt(this.route.snapshot.params['id']);
  if(ID>0){
    //fill record in
    this.title="Update";
    this.frlable="Update";
    this.getAssetById(ID)
    }
    else
    {
      this.title="Add"
      this.frlable="Add";
      this.assetid=0;
    }
  }

  getAssetById(Assetid : any){
    this.authservice.getAssetById(Assetid).subscribe(responce => {
      if (responce.IsSuccess)
      {
        this.assetdata = [];

        if(responce.Data.length > 0){
          this.assetid=responce.Data[0].Assetid;
         this.assetForm.controls["serialno"].setValue(responce.Data[0].SerialNo);
         this.assetForm.controls["branch"].setValue(responce.Data[0].Branch);
         this.assetForm.controls["brand"].setValue(responce.Data[0].Brand);
         this.assetForm.controls["type"].setValue(responce.Data[0].Type);
         this.assetForm.controls["model"].setValue(responce.Data[0].Model);
         this.assetForm.controls["nos"].setValue(responce.Data[0].Nos);
         this.assetForm.controls["specification"].setValue(responce.Data[0].Specification);
         this.assetForm.controls["vendorid"].setValue(responce.Data[0].Vendorid);
         }
      }
    })
  }


  //get for all tables
  getAllTables(){
    // debugger
    this.authservice.getAllTables().subscribe(responce => {
      // debugger
      if(responce.IsSuccess){
        
        if(responce.Data.table.length > 0){
          this.typelistdata = responce.Data.table;
        }
        else
        {
          this.typelistdata = [];
        }

        if(responce.Data.table2.length > 0){
          this.branchlistdata = responce.Data.table2;
        }
        else
        {
          this.branchlistdata = [];
        }

        if(responce.Data.table6.length > 0){
          this.vendorlistdata = responce.Data.table6;
        }
        else
        {
          this.vendorlistdata = [];
        }
      }
    })
  }


}
