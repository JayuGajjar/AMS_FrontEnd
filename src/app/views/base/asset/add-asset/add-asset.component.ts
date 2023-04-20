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

  assetForm: FormGroup;
  data: asset;
  submitted = false;
  submitbtn = false;
  assetdata: any = [];
  frlable: string = "";
  title: string = "";
  assetid: number = 0;
  typelistdata: any = [];
  branchlistdata: any = [];
  companylistdata: any = [];
  departmentlistdata: any = [];
  vendorlistdata: any = [];
  role: number = 0;

  constructor(private authservice: AuthService, private FB: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.data = {
      assetid: 0,
      serialno: "",
      branch: 0,
      brand: "",
      type: 0,
      model: "",
      nos: 0,
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
      specification: "",
      vendorid: 0,
      Created_at: "",
    }

    this.assetForm = this.FB.group({
      serialno: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      brand: ['', [Validators.required,
      Validators.pattern('[A-Z]+')]],
      type: ['', [Validators.required]],
      model: ['', [Validators.required]],
      nos: ['', [Validators.required,
      Validators.pattern('[0-9]+')]],
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
      inches: ['0', [Validators.required,
      Validators.pattern('[0-9]+')]],
      portswitch: ['N/A', [Validators.required]],
      specification: ['', [Validators.required]],
      vendorid: ['', [Validators.required]],
      createdat: ['', [Validators.required]],

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
      this.data.assetid = this.assetid;
      this.data.serialno = this.assetForm.value.serialno;
      this.data.branch = this.assetForm.value.branch;
      this.data.brand = this.assetForm.value.brand;
      this.data.type = this.assetForm.value.type;
      this.data.model = this.assetForm.value.model;
      this.data.nos = this.assetForm.value.nos;
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
      this.data.specification = this.assetForm.value.specification;
      this.data.vendorid = this.assetForm.value.vendorid;
      this.data.Created_at = this.assetForm.value.createdat;

      this.authservice.editAsset(this.data).subscribe(response => {

        if (response.IsSuccess) {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.router.navigate(['/base/asset']);
        }
        else {
          Swal.fire(
            'Something went wrong!',
            response.ReturnMessage,
            'error'
          )
        }
      })

    }
    else {
      this.data.assetid = this.assetid;
      this.data.serialno = this.assetForm.value.serialno;
      this.data.branch = this.assetForm.value.branch;
      this.data.brand = this.assetForm.value.brand;
      this.data.type = this.assetForm.value.type;
      this.data.model = this.assetForm.value.model;
      this.data.nos = this.assetForm.value.nos;
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
      this.data.specification = this.assetForm.value.specification;
      this.data.vendorid = this.assetForm.value.vendorid;
      this.data.Created_at = this.assetForm.value.createdat;

      this.authservice.addasset(this.data).subscribe(response => {

        if (response.IsSuccess) {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
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

  }

  onReset() {
    this.submitbtn = false;
    this.submitted = false;
    this.assetForm.patchValue({ serialno: "" });
    this.assetForm.patchValue({ branch: "" });
    this.assetForm.patchValue({ brand: "" });
    this.assetForm.patchValue({ type: "" });
    this.assetForm.patchValue({ model: "" });
    this.assetForm.patchValue({ nos: "" });
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
    this.assetForm.patchValue({ createdat: "" });
  }

  ngOnInit(): void {

    this.role = Number(localStorage.getItem('role'));
    if (this.role == 2) {
      this.router.navigate(['/dashboard']);
    }

    this.getAllTables();

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
          this.assetForm.controls["nos"].setValue(responce.Data[0].Nos);
          this.assetForm.controls["processortype"].setValue(responce.Data[0].Processor_Type);
          this.assetForm.controls["monitortype"].setValue(responce.Data[0].Monitor_Type);
          this.assetForm.controls["rangetype"].setValue(responce.Data[0].Range_Type);
          this.assetForm.controls["batterytype"].setValue(responce.Data[0].Battery_Type);
          this.assetForm.controls["batteryampere"].setValue(responce.Data[0].Battery_Ampere);
          this.assetForm.controls["batterycapacity"].setValue(responce.Data[0].Battery_Capacity);
          this.assetForm.controls["graphicsCard"].setValue(responce.Data[0].GraphicsCard);
          this.assetForm.controls["opticaldrive"].setValue(responce.Data[0].Optional_Drive);
          this.assetForm.controls["hdd"].setValue(responce.Data[0].HDD);
          this.assetForm.controls["ram"].setValue(responce.Data[0].RAM);
          this.assetForm.controls["inches"].setValue(responce.Data[0].Inches);
          this.assetForm.controls["portswitch"].setValue(responce.Data[0].Port_Switch);
          this.assetForm.controls["specification"].setValue(responce.Data[0].Specification);
          this.assetForm.controls["vendorid"].setValue(responce.Data[0].Vendorid);
          this.assetForm.controls["createdat"].setValue(responce.Data[0].Created_at);
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
      }
    })
  }


}
