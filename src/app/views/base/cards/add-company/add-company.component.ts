import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { company } from 'src/app/Interfaces/company';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent {

    companyForm : FormGroup;
    data : company;
    submitted = false;
    companydata : any=[];
    frlable:string="";
    title:string="";
    companyid: number=0;

  constructor(private authservice: AuthService, private FB: FormBuilder,private router: Router,private route: ActivatedRoute) 
  { 
    this.data = {
      name : "",
    }
    
    this.companyForm = this.FB.group({
      name : ['',[Validators.required, Validators.pattern("[a-zA-Z0-9-_][a-zA-Z0-9-_]+")]],

    })
   
  }

  get f() { return this.companyForm.controls; }

  addCompany(){
    this.submitted = true;

    if(this.companyForm.invalid)
    {
      return;
    }

    if(this.companyid>0){
      this.data.name = this.companyForm.value.name;

      this.authservice.editCompany(this.data,this.companyid).subscribe(response => {
    
        if(response.IsSuccess)
        {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.router.navigate(['/base/company']);
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
      this.data.name = this.companyForm.value.name;

      this.authservice.addcompany(this.data).subscribe(response => {
    
        if(response.IsSuccess)
        {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.router.navigate(['/base/company']);
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
    this.companyForm.patchValue({name:""});
  }

  ngOnInit(): void {
   //debugger
    const ID: number = parseInt(this.route.snapshot.params['id']);
    if(ID>0){
      //fill record in
      this.title="Update";
      this.frlable="Update";
      this.getCompanyById(ID)
      }
      else
      {
        this.title="Add"
        this.frlable="Add";
        this.companyid=0;
      }
    }

    getCompanyById(Companyid : any){
      this.authservice.getCompanyById(Companyid).subscribe(responce => {
        // debugger
        if (responce.IsSuccess)
        {
          this.companydata = [];

          if(responce.Data.length > 0){
            this.companyid=responce.Data[0].Companyid;
           this.companyForm.controls["name"].setValue(responce.Data[0].Name);
           }
        }
      })
    }

}
