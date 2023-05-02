import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { asset } from 'src/app/Interfaces/asset';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent {

  assetdata : any=[];
  pageSize : number=25;
  PageNumber: any=1;
  totalrecord : any=0;
  Assets : any="";
  Assetid : number=0;
  branchid : any=0;
  vendorid : any=0;
  typeid : any=0;
  statusid : any=0;
  dateid : any=0;
  role : number=0;
  typelistdata : any=[];
  branchlistdata : any=[];
  vendorlistdata : any=[];
  loader = true;


  assetForm: FormGroup;
  submitted = false;
  submitbtn = false;
  branch : any;
  description : any;
  frlable: string = "";
  title: string = "";
  assetid: number = 0;
  statuslistdata : any = [];
  companylistdata: any = [];
  departmentlistdata: any = [];

  constructor(private authservice: AuthService, private FB: FormBuilder, private router: Router, private route: ActivatedRoute) { 

    this.assetForm = this.FB.group({

      branch: ['', [Validators.required]],
      description: ['', [Validators.required]],

    })
  }

  ngOnInit(): void {
    //debugger
    this.role = Number(localStorage.getItem('role'));
    if(this.role==2){
      this.router.navigate(['/dashboard']);
    }
    this.assetDetails(this.PageNumber,this.pageSize,this.Assets,this.branchid,this.typeid,this.vendorid,this.statusid,this.dateid);

    this.getAllTables();
  }


  get f() { return this.assetForm.controls; }

  public visible = false;


  toggleModal()
    {
      this.onReset();
      this.visible = !this.visible;
      // this.frlable="Add";
    }

    transferModal(getDatabyId:any) {
      debugger
      this.onReset();
      this.visible = !this.visible;
      this.assetForm.controls["branch"].setValue(getDatabyId.Branch);
      this.assetid = getDatabyId.Assetid;
    }
  
    handleChange(event: any) {
      this.visible = event;
    }


    //transfer asset
    transferAsset(assetid:number,branch:number,description:string){
      this.submitted = true;
      this.submitbtn = true;

      if(this.assetForm.invalid){
        this.submitbtn = false;
        return;
      }

      debugger
      this.assetid;
      this.branch = this.assetForm.value.branch;
      this.description = this.assetForm.value.description;

      this.authservice.transferasset(this.assetid,this.branch,this.description).subscribe(responce => {
        debugger
        if(responce.IsSuccess)
        {
          Swal.fire(
            'Great!',
            responce.ReturnMessage,
            'success'
          )
          this.visible = !this.visible;
          this.assetDetails(this.PageNumber,this.pageSize,this.Assets,this.branchid,this.typeid,this.vendorid,this.statusid,this.dateid);
        }
        else
        {
          {
            Swal.fire(
              'Something went wrong!',
              responce.ReturnMessage,
              'error'
            )
            this.onReset();
            this.visible = !this.visible;
          }
        }
      })
        
    }

    onReset(){
      this.assetForm.patchValue({branch:""});
      this.assetForm.patchValue({description:""});
      this.submitbtn = false;
      this.submitted = false;
    }


  //get method for get the data of branch
  assetDetails(PageNumber:number,pageSize:number,Assets:string,branchid:number,typeid:number,vendorid:number,statusid:number,dateid:number) {
    debugger
    this.authservice.assetDetails(PageNumber,pageSize,Assets,branchid,typeid,vendorid,dateid,statusid).subscribe(responce => {
     
      // localStorage.setItem('assetid',responce.Data.Assetid);
      if(responce.IsSuccess)
      {
        debugger
        this.loader = false;
        this.totalrecord = responce.Data[0].totalrecord;
        this.assetdata = responce.Data;
      }
      else
      {
        this.assetdata = [];
      }
     
    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.assetDetails(this.PageNumber, this.pageSize,this.Assets,this.branchid,this.typeid,this.vendorid,this.statusid,this.dateid);
  }


  changePageSize(){
    // debugger
    this.PageNumber=1;
   this.assetDetails(this.PageNumber, this.pageSize,this.Assets,this.branchid,this.typeid,this.vendorid,this.statusid,this.dateid);
  }


  //search method
  searchAsset(){
    // debugger
    this.assetDetails(this.PageNumber,this.pageSize,this.Assets,this.branchid,this.typeid,this.vendorid,this.statusid,this.dateid);
  }



  //delete method
  deleteAsset(assetlist : any) {
          
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
        this.authservice.deleteAsset(assetlist.Assetid).subscribe(responce => {
        
          if (responce.IsSuccess){
            Swal.fire(
              'Deleted!',
              responce.ReturnMessage,
              'success'
            )
            this.assetDetails(this.PageNumber,this.pageSize,this.Assets,this.branchid,this.typeid,this.vendorid,this.statusid,this.dateid);
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



  getAssetById(Assetid: any) {
    this.authservice.getAssetById(Assetid).subscribe(responce => {
      if (responce.IsSuccess) {

        this.assetdata = [];

        if (responce.Data.length > 0) {
          debugger
          this.assetid = responce.Data[0].Assetid;
          this.assetForm.controls["serialno"].setValue(responce.Data[0].SerialNo);
          this.assetForm.controls["branch"].setValue(responce.Data[0].Branch);
          this.assetForm.controls["brand"].setValue(responce.Data[0].Brand);
          this.assetForm.controls["type"].setValue(responce.Data[0].Type);
          this.assetForm.controls["model"].setValue(responce.Data[0].Model);
          this.assetForm.controls["nos"].setValue(responce.Data[0].Nos);
          this.assetForm.controls["processortype"].setValue(responce.Data[0].Processor_Type);
          this.assetForm.controls["monitortype"].setValue(responce.Data[0].Monitor_Type);
          this.assetForm.controls["rangetype"].setValue(responce.Data[0].Range_Type);
          this.assetForm.controls["batterytype"].setValue(responce.Data[0].Battery_Type);
          this.assetForm.controls["batteryampere"].setValue(responce.Data[0].Battery_Ampere);
          this.assetForm.controls["batterycapacity"].setValue(responce.Data[0].Battery_Capacity);
          this.assetForm.controls["graphicsCard"].setValue(responce.Data[0].GraphicsCard);
          this.assetForm.controls["opticaldrive"].setValue(responce.Data[0].Optical_Drive);
          this.assetForm.controls["hdd"].setValue(responce.Data[0].HDD);
          this.assetForm.controls["ram"].setValue(responce.Data[0].RAM);
          this.assetForm.controls["inches"].setValue(responce.Data[0].Inches);
          this.assetForm.controls["portswitch"].setValue(responce.Data[0].Port_Switch);
          this.assetForm.controls["specification"].setValue(responce.Data[0].Specification);
          this.assetForm.controls["vendorid"].setValue(responce.Data[0].Vendorid);
          this.assetForm.controls["invoicedate"].setValue(responce.Data[0].InvoiceDate);
          this.assetForm.controls["warranty_till"].setValue(responce.Data[0].Warranty_Till);
          this.assetForm.controls["invoice_no"].setValue(responce.Data[0].Invoice_No);
          this.assetForm.controls["location"].setValue(responce.Data[0].Location);
          this.assetForm.controls["uid"].setValue(responce.Data[0].Uid);
          this.assetForm.controls["status"].setValue(responce.Data[0].Status);
          this.assetForm.controls["createdat"].setValue(responce.Data[0].Created_at);
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

        if(responce.Data.table1.length > 0){
          this.statuslistdata = responce.Data.table1;
        }
        else
        {
          this.statuslistdata = [];
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
