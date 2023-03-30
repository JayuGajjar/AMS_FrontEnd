import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { branch } from 'src/app/Interfaces/branch';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {

    branchFrom : FormGroup;
    data : branch;
    submitted = false;
    branchdata : any=[];
    frlable:string="";
    title:string="";
    branchid:number=0;

  constructor(private authservice: AuthService, private FB: FormBuilder,private router: Router,private route: ActivatedRoute) 
  { 
    this.data = {
      name : "",
    }
    
    this.branchFrom = this.FB.group({
      name : ['',[Validators.required, Validators.pattern("[a-zA-Z-_]+")]],
    })
   
  }

  get f() {return this.branchFrom.controls};


  addBranch(){
    this.submitted = true;

    if(this.branchFrom.invalid)
    {
      return;
    }

    if(this.branchid>0){

      this.data.name = this.branchFrom.value.name;

      this.authservice.editBranch(this.data,this.branchid).subscribe(response => {
    
        if(response.IsSuccess)
        {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.router.navigate(['/base/branch']);
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

      this.data.name = this.branchFrom.value.name;

      this.authservice.addbranch(this.data).subscribe(response => {
    
        if(response.IsSuccess)
        {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.router.navigate(['/base/branch']);
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
    this.branchFrom.patchValue({name:""});
  }

  ngOnInit(): void {
    // debugger
    const ID: number = parseInt(this.route.snapshot.params['id']);
    if(ID>0){
      //fill record in
      this.title="Update";
      this.frlable="Update";
      this.getBranchById(ID)
      }
      else
      {
        this.title="Add"
        this.frlable="Add";
        this.branchid=0;
      }
    }

    
    getBranchById(Branchid : any){
      this.authservice.getBranchById(Branchid).subscribe(responce => {
        // debugger
        if (responce.IsSuccess)
        {
          this.branchdata = [];

          if(responce.Data.length > 0){
            this.branchid=responce.Data[0].Branchid;
           this.branchFrom.controls["name"].setValue(responce.Data[0].Name);
           }
        }
      })
    }
  }



