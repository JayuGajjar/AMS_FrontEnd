import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-totalreadyforscrap',
  templateUrl: './totalreadyforscrap.component.html',
  styleUrls: ['./totalreadyforscrap.component.css']
})
export class TotalreadyforscrapComponent {

  readyforscrapdata: any = [];
  role: number = 0;
  pageSize: number = 5;
  PageNumber: any = 1;
  totalrecord: any = 0;
  readyforscrap: any = "";
  id : any;
  uniqueid : any;
  type : any;
  isScrap : any;
  vendorlistdata : any=[];

  maintenanceForm : FormGroup;
  submitted : any=false;
  submitbtn : any=false;
  SentForFix : any;
  Vendorid : any;
  Uid : any;
  Description : any;

  constructor(private authservice: AuthService, private router: Router, private FB: FormBuilder) { 

    this.maintenanceForm = this.FB.group({
      uniqueid : ['',[Validators.required]],
      vendorid : ['',[Validators.required]],
      description : ['',[Validators.required]]
    });

  }



  get f() { return this.maintenanceForm.controls; }
  
    public visible = false;

    toggleModal()
    {
      this.onReset();
      this.visible = !this.visible;
    }

    sentForFixModal(getDatabyId:any) {
      debugger
      this.onReset();
      this.visible = !this.visible;
      this.id=getDatabyId.Requestid;
    }


    handleChange(event: any) {
      this.visible = event;
    }



  ngOnInit(): void {

    this.role = Number(localStorage.getItem('role'));
    if (this.role == 2) {
      this.router.navigate(['/dashboard']);
    }

    
  debugger
    this.readyForScrapDetails(this.PageNumber, this.pageSize, this.readyforscrap);
  }

  //get method for get the data of branch
  readyForScrapDetails(PageNumber: number, pageSize: number, readyforscrap: string) {
    debugger
    this.authservice.readyForScrapDetails(PageNumber, pageSize, readyforscrap).subscribe(responce => {
      debugger
      if (responce.IsSuccess) 
      {
        // debugger
        if(responce.Data.length > 0){
          this.readyforscrapdata = responce.Data;
          this.totalrecord = responce.Data[0].totalrecord;
        }
      }
      else {
        this.readyforscrapdata = [];
      }

    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.readyForScrapDetails(this.PageNumber, this.pageSize, this.readyforscrap);
  }


  changePageSize() {
    // debugger
    this.PageNumber = 1;
    this.readyForScrapDetails(this.PageNumber, this.pageSize, this.readyforscrap);
  }


  //search method
  searchReadyForScrap() {
    // debugger
    this.readyForScrapDetails(this.PageNumber, this.pageSize, this.readyforscrap);
  }


  //sent for fix
  sentForFix(){

    this.getAllTables();
    this.submitted = true;
    this.submitbtn = true;

    if(this.maintenanceForm.invalid){
      this.submitbtn = false;
      return;
    }
    
    debugger
    this.id;
    this.type = 5;
    this.SentForFix = true;
    this.Vendorid = this.maintenanceForm.value.vendorid;
    this.Uid = this.maintenanceForm.value.uniqueid;
    this.Description = this.maintenanceForm.value.description;

    debugger
    this.authservice.sentForFix(this.id,this.type,this.SentForFix,this.Vendorid,this.Uid,this.Description).subscribe(responce => {
      debugger
      if(responce.IsSuccess)
        {
          Swal.fire(
            'Great!',
            responce.ReturnMessage,
            'success'
          )
          this.visible = !this.visible;
          this.readyForScrapDetails(this.PageNumber, this.pageSize, this.readyforscrap);
        }
        else
        {
          Swal.fire(
            'Something went wrong!',
            responce.ReturnMessage,
            'error'
          )
          this.visible = !this.visible;
          this.readyForScrapDetails(this.PageNumber, this.pageSize, this.readyforscrap);
        }
    })
  }



  onReset(){
    this.maintenanceForm.patchValue({uniqueid:""});
    this.maintenanceForm.patchValue({vendorid:""});
    this.maintenanceForm.patchValue({description:""});
    this.submitbtn = false;
    this.submitted = false;
  }



  //accept scrap
  acceptScrap(id:number,uniqueid:number,type:number,isScrap:boolean){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Yes, I'm Sure!"
    }).then((result) => {

      if (result.value) {

        debugger
        this.authservice.acceptScrap(id, uniqueid, type, isScrap).subscribe(responce => {
          debugger
          if (responce.IsSuccess) 
          {
            Swal.fire(
              'Success!',
              responce.ReturnMessage,
              'success'
            )
            debugger
            this.readyForScrapDetails(this.PageNumber, this.pageSize, this.readyforscrap);
          }
          else {
            Swal.fire(
              'Something went wrong!',
              responce.ReturnMessage,
              'error'
            )
            this.readyForScrapDetails(this.PageNumber, this.pageSize, this.readyforscrap);
          }
        })
      }
    });
  }


  //get for all tables
  getAllTables() {
    // debugger
    this.authservice.getAllTables().subscribe(responce => {
      // debugger
      if (responce.IsSuccess) {

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
