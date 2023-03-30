import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { department } from 'src/app/Interfaces/department';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent {

    departmentForm : FormGroup;
    data : department;
    submitted = false;
    departmentdata : any=[];
    frlable:string="";
    title:string="";
    departmentid: number=0;

  constructor(private authservice: AuthService, private FB: FormBuilder,private router: Router,private route: ActivatedRoute) 
  { 
    this.data = {
      name : "",
    }
    
    this.departmentForm = this.FB.group({
      name : ['',[Validators.required, Validators.pattern("[a-zA-Z]+")]],

    })
   
  }

  get f() { return this.departmentForm.controls; }

  addDepartment(){
    this.submitted = true;

    if(this.departmentForm.invalid)
    {
      return;
    }

    if(this.departmentid>0){
      // debugger
      this.data.name = this.departmentForm.value.name;

      this.authservice.editDepartment(this.data,this.departmentid).subscribe(response => {
    
        if(response.IsSuccess)
        {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.router.navigate(['/base/department']);
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
      this.data.name = this.departmentForm.value.name;

      this.authservice.adddepartment(this.data).subscribe(response => {
    
        if(response.IsSuccess)
        {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.router.navigate(['/base/department']);
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
    this.departmentForm.patchValue({name:""});
  }

  ngOnInit(): void {
   debugger
    const ID: number = parseInt(this.route.snapshot.params['id']);
    if(ID>0){
      //fill record inthis.title="Update";
      this.title="Update";
      this.frlable="Update";
      this.getDepartmentById(ID)
      }
      else
      {
        this.title="Add"
        this.frlable="Add";
        this.departmentid=0;
      }
    }

    getDepartmentById(Depid : any){
      this.authservice.getDepartmentById(Depid).subscribe(responce => {
        // debugger
        if (responce.IsSuccess)
        {
          this.departmentdata = [];

          if(responce.Data.length > 0){
            this.departmentid=responce.Data[0].Depid;
           this.departmentForm.controls["name"].setValue(responce.Data[0].Name);
           }
        }
      })
    }

}
