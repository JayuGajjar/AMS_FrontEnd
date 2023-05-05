import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debug, table } from 'console';
import { asset } from 'src/app/Interfaces/asset';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent {

  assetForm: FormGroup;
  data: asset;
  submitted = false;
  submitbtn = false;
  assetdata: any = [];
  frlable: string = "";
  title: string = "";
  assetid: number = 0;
  typelistdata: any = [];
  statuslistdata: any = [];
  branchlistdata: any = [];
  companylistdata: any = [];
  departmentlistdata: any = [];
  vendorlistdata: any = [];
  locationlistdata: any = [];
  userlistdata: any = [];
  userdata : any;
  userdataid : any;
  role: number = 0;

  constructor(private authservice: AuthService, private FB: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.data = {
      Assetid : 0,
      SerialNo : "",
      Branch : 0,
      Brand : "",
      Type : 0,
      Model : "",
      LastAllocated_To: 0,
      Processor_Type: "",
      Monitor_Type: "",
      Range_Type: "",
      Battery_Type: "",
      Battery_Ampere: "",
      Battery_Capacity: "",
      GraphicsCard: "",
      Optical_Drive: "",
      HDD: "",
      RAM: "",
      Inches: "",
      Port_Switch: "",
      Specification: "",
      Vendorid: 0,
      Status : 0,
      InvoiceDate : "",
      Warranty_Till : "",
      Invoice_No : "",
      Location : 0,
      Uid : "",
      // Description : "",
      Created_at: "",
      Branches : "",
      TypeName : "",
      Vendors : "",
      StatusName : "",
      totalrecord : 0,
      LocationName : "",
      Remarks : "",
    }

    this.assetForm = this.FB.group({
      serialno: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      brand: ['', [Validators.required,
      Validators.pattern('^[a-zA-Z0-9-]+( [a-zA-Z0-9-]+)*$')]],
      type: ['', [Validators.required]],
      model: ['N/A', [Validators.required]],
      allocatedto: [0],
      processortype: ['N/A', [Validators.required]],
      monitortype: ['N/A', [Validators.required]],
      rangetype: ['N/A', [Validators.required]],
      batterytype: ['N/A', [Validators.required]],
      batteryampere: ['N/A', [Validators.required]],
      batterycapacity: ['N/A', [Validators.required]],
      graphicsCard: ['N/A', [Validators.required]],
      opticaldrive: ['N/A', [Validators.required]],
      hdd: ['N/A', [Validators.required]],
      ram: ['N/A', [Validators.required]],
      inches: ['N/A', [Validators.required]],
      portswitch: ['N/A', [Validators.required]],
      specification: ['N/A', [Validators.required]],
      vendorid: ['', [Validators.required]],
      invoicedate: [null, [Validators.pattern("^(?:[0-9]{2})?[0-9]{2}/[0-3]?[0-9]/[0-3]?[0-9]$")]],//, [Validators.required]],
      warranty_till: [null, [Validators.pattern("^(?:[0-9]{2})?[0-9]{2}/[0-3]?[0-9]/[0-3]?[0-9]$")]], //date formate DD/MM/YYYY],//, [Validators.required]],
      invoice_no: ['N/A', [Validators.required]],
      location: ['', [Validators.required]],
      uid: ['', [Validators.required]],
      status: ['', [Validators.required]],
      createdat: ['', [Validators.required]],
      remarks: ['N/A', [Validators.required]],

    })

  }

  get f() { return this.assetForm.controls; }

  addAsset() {
    this.submitted = true;
    this.submitbtn = true;

    if (this.assetForm.invalid) {
      this.submitbtn = false;
      return;
    }

    if (this.assetid > 0) {
      this.data.Assetid = this.assetid;
      this.data.SerialNo = this.assetForm.value.serialno;
      this.data.Branch = this.assetForm.value.branch;
      this.data.Brand = this.assetForm.value.brand;
      this.data.Type = this.assetForm.value.type;
      this.data.Model = this.assetForm.value.model;
      this.data.LastAllocated_To = this.assetForm.value.allocatedto;
      this.data.Processor_Type = this.assetForm.value.processortype;
      this.data.Monitor_Type = this.assetForm.value.monitortype;
      this.data.Range_Type = this.assetForm.value.rangetype;
      this.data.Battery_Type = this.assetForm.value.batterytype;
      this.data.Battery_Ampere = this.assetForm.value.batteryampere;
      this.data.Battery_Capacity = this.assetForm.value.batterycapacity;
      this.data.GraphicsCard = this.assetForm.value.graphicsCard;
      this.data.Optical_Drive = this.assetForm.value.opticaldrive;
      this.data.HDD = this.assetForm.value.hdd;
      this.data.RAM = this.assetForm.value.ram;
      this.data.Inches = this.assetForm.value.inches;
      this.data.Port_Switch = this.assetForm.value.portswitch;
      this.data.Specification = this.assetForm.value.specification;
      this.data.Vendorid = this.assetForm.value.vendorid;
      this.data.InvoiceDate = this.assetForm.value.invoicedate;
      this.data.Warranty_Till = this.assetForm.value.warranty_till;
      this.data.Invoice_No = this.assetForm.value.invoice_no;
      this.data.Location = this.assetForm.value.location;
      this.data.Uid = this.assetForm.value.uid;
      this.data.Status = this.assetForm.value.status;
      this.data.Created_at = this.assetForm.value.createdat;
      this.data.Remarks = this.assetForm.value.remarks;

      this.authservice.editAsset(this.data).subscribe(response => {

        if (response.IsSuccess) {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.submitbtn = false;
          this.router.navigate(['/base/asset']);
        }
        else {
          Swal.fire(
            'Something went wrong!',
            response.ReturnMessage,
            'error'
          )
          this.submitbtn = false;
        }
      })

    }
    else {
      debugger
      this.data.Assetid = this.assetid;
      this.data.SerialNo = this.assetForm.value.serialno;
      this.data.Branch = this.assetForm.value.branch;
      this.data.Brand = this.assetForm.value.brand;
      this.data.Type = this.assetForm.value.type;
      this.data.Model = this.assetForm.value.model;
      this.data.LastAllocated_To = this.assetForm.value.allocatedto;
      this.data.Processor_Type = this.assetForm.value.processortype;
      this.data.Monitor_Type = this.assetForm.value.monitortype;
      this.data.Range_Type = this.assetForm.value.rangetype;
      this.data.Battery_Type = this.assetForm.value.batterytype;
      this.data.Battery_Ampere = this.assetForm.value.batteryampere;
      this.data.Battery_Capacity = this.assetForm.value.batterycapacity;
      this.data.GraphicsCard = this.assetForm.value.graphicsCard;
      this.data.Optical_Drive = this.assetForm.value.opticaldrive;
      this.data.HDD = this.assetForm.value.hdd;
      this.data.RAM = this.assetForm.value.ram;
      this.data.Inches = this.assetForm.value.inches;
      this.data.Port_Switch = this.assetForm.value.portswitch;
      this.data.Specification = this.assetForm.value.specification;
      this.data.Vendorid = this.assetForm.value.vendorid;
      this.data.InvoiceDate = this.assetForm.value.invoicedate;
      this.data.Warranty_Till = this.assetForm.value.warranty_till;
      this.data.Invoice_No = this.assetForm.value.invoice_no;
      this.data.Location = this.assetForm.value.location;
      this.data.Uid = this.assetForm.value.uid;
      this.data.Status = this.assetForm.value.status;
      this.data.Created_at = this.assetForm.value.createdat;
      this.data.Remarks = this.assetForm.value.remarks;

      this.authservice.addasset(this.data).subscribe(response => {
        debugger
        if (response.IsSuccess) {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.submitbtn = false;
          this.router.navigate(['/base/asset']);
        }
        else {
          Swal.fire(
            'Something went wrong!',
            response.ReturnMessage,
            'error'
          )
          this.onReset();
        }
      })
    }
    // this.submitbtn = false;

  }

  onReset() {
    this.submitbtn = false;
    this.submitted = false;
    this.assetForm.patchValue({ serialno: "" });
    this.assetForm.patchValue({ branch: "" });
    this.assetForm.patchValue({ brand: "" });
    this.assetForm.patchValue({ type: "" });
    this.assetForm.patchValue({ model: "" });
    this.assetForm.patchValue({ allocatedto: "" });
    this.assetForm.patchValue({ processortype: "" });
    this.assetForm.patchValue({ monitortype: "" });
    this.assetForm.patchValue({ rangetype: "" });
    this.assetForm.patchValue({ batterytype: "" });
    this.assetForm.patchValue({ batteryampere: "" });
    this.assetForm.patchValue({ batterycapacity: "" });
    this.assetForm.patchValue({ graphicsCard: "" });
    this.assetForm.patchValue({ opticaldrive: "" });
    this.assetForm.patchValue({ hdd: "" });
    this.assetForm.patchValue({ ram: "" });
    this.assetForm.patchValue({ inches: "" });
    this.assetForm.patchValue({ portswitch: "" });
    this.assetForm.patchValue({ specification: "" });
    this.assetForm.patchValue({ vendorid: "" });
    this.assetForm.patchValue({ invoicedate: "" });
    this.assetForm.patchValue({ warranty_till: "" });
    this.assetForm.patchValue({ invoice_no: "" });
    this.assetForm.patchValue({ location: "" });
    this.assetForm.patchValue({ uid: "" });
    this.assetForm.patchValue({ status: "" });
    this.assetForm.patchValue({ createdat: "" });
    this.assetForm.patchValue({ remarks: "" });
  }

  ngOnInit(): void {

    this.role = Number(localStorage.getItem('role'));
    if (this.role == 2) {
      this.router.navigate(['/dashboard']);
    }

    this.getAllTables();
    this.getAllUsers();

    //  debugger
    const ID: number = parseInt(this.route.snapshot.params['id']);
    if (ID > 0) {
      //fill record in
      this.title = "Update";
      this.frlable = "Update";
      this.getAssetById(ID)
    }
    else {
      this.title = "Add"
      this.frlable = "Add";
      this.assetid = 0;
    }
  }

  getAssetById(Assetid: any) {
    this.authservice.getAssetById(Assetid).subscribe(responce => {
      if (responce.IsSuccess) {

        this.assetdata = [];

        if (responce.Data.length > 0) {
          this.assetid = responce.Data[0].Assetid;
          this.assetForm.controls["serialno"].setValue(responce.Data[0].SerialNo);
          this.assetForm.controls["branch"].setValue(responce.Data[0].Branch);
          this.assetForm.controls["brand"].setValue(responce.Data[0].Brand);
          this.assetForm.controls["type"].setValue(responce.Data[0].Type);
          this.assetForm.controls["model"].setValue(responce.Data[0].Model);
          this.assetForm.controls["allocatedto"].setValue(responce.Data[0].LastAllocated_To);
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
          this.assetForm.controls["remarks"].setValue(responce.Data[0].Remarks);
        }
      }
    })
  }


  //get for all tables
  getAllTables() {
    // debugger
    this.authservice.getAllTables().subscribe(responce => {
      // debugger
      if (responce.IsSuccess) {

        if (responce.Data.table.length > 0) {
          this.typelistdata = responce.Data.table;
        }
        else {
          this.typelistdata = [];
        }

        if (responce.Data.table1.length > 0) {
          this.statuslistdata = responce.Data.table1;
        }
        else {
          this.statuslistdata = [];
        }

        if (responce.Data.table2.length > 0) {
          this.branchlistdata = responce.Data.table2;
        }
        else {
          this.branchlistdata = [];
        }

        if (responce.Data.table6.length > 0) {
          this.vendorlistdata = responce.Data.table6;
        }
        else {
          this.vendorlistdata = [];
        }

        if (responce.Data.table8.length > 0) {
          this.locationlistdata = responce.Data.table8;
        }
        else {
          this.locationlistdata = [];
        }
      }
    })
  }


  getAllUsers(){
    this.authservice.getAllUsers().subscribe(responce => {
      debugger
      if(responce.IsSuccess){
        debugger

        if(responce.Data.table.length > 0){

          this.userlistdata = responce.Data.table;
          this.userdata = responce.Data.table.username;
          this.userdataid = responce.Data.table.userid;
        }
        else
        {
          this.userlistdata = [];
        }
      }
    })
  }


}
