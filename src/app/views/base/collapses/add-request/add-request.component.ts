import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { request } from 'src/app/Interfaces/request'
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent {

    PageNumber: any;
    pageSize: any;
    requestForm : FormGroup;
    data : request;
    submitted = false;
    requestdata : any=[];
    frlable:string="";
    title:string="";
    requestid: number=0;
    assetlistdata : any=[];


  constructor(private authservice: AuthService, private FB: FormBuilder,private router: Router,private route: ActivatedRoute) 
  { 
    this.data = {
      userid : "",
      assetid : "",
      justify : "",
    }
    
    this.requestForm = this.FB.group({
      userid : ['',[Validators.required, Validators.pattern("[0-9]+")]],
      assetid : ['',[Validators.required, Validators.pattern("[0-9]+")]],
      justify : ['',[Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],

    })
   
  }

  get f() { return this.requestForm.controls; }

  addRequest(){
    this.submitted = true;

    if(this.requestForm.invalid)
    {
      return;
    }

    if(this.requestid>0){
      this.data.userid = this.requestForm.value.userid;
      this.data.assetid = this.requestForm.value.assetid;
      this.data.justify = this.requestForm.value.justify;

      this.authservice.editRequest(this.data,this.requestid).subscribe(response => {
    
        // debugger
        if(response.IsSuccess)
        {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.router.navigate(['/base/request']);
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
      this.data.userid = this.requestForm.value.userid;
      this.data.assetid = this.requestForm.value.assetid;
      this.data.justify = this.requestForm.value.justify;

      this.authservice.addrequest(this.data).subscribe(response => {
    
        if(response.IsSuccess)
        {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.router.navigate(['/base/request']);
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
    this.requestForm.patchValue({userid:""});
    this.requestForm.patchValue({assetid:""});
    this.requestForm.patchValue({justify:""});
  }

  ngOnInit(): void {

    this.getAllTables();

  //  debugger
    const ID: number = parseInt(this.route.snapshot.params['id']);
    if(ID>0){
      //fill record in
      this.title="Update";
      this.frlable="Update";
      this.getRequestById(ID)
      }
      else
      {
        this.title="Add"
        this.frlable="Add";
        this.requestid=0;
      }
    }

    getRequestById(Requestid : any){
      this.authservice.getRequestById(Requestid).subscribe(responce => {
        // debugger
        if (responce.IsSuccess)
        {
          this.requestdata = [];

          if(responce.Data.length > 0){
            this.requestid=responce.Data[0].Requestid;
            this.requestForm.controls["userid"].setValue(responce.Data[0].Userid);
            this.requestForm.controls["assetid"].setValue(responce.Data[0].Assetid);
            this.requestForm.controls["justify"].setValue(responce.Data[0].Justify);
           }
        }
      })
    }



    //get mathod for all tables
    getAllTables(){
      // debugger
      this.authservice.getAllTables().subscribe(responce => {
        // debugger
        if(responce.IsSuccess){
          
          if(responce.Data.table6.length > 0){
            this.assetlistdata = responce.Data.table6;
          }
          else
          {
            this.assetlistdata = [];
          }
        }
      })
    }
  
}
