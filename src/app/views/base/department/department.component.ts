import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { department } from 'src/app/Interfaces/department';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {

  departmentForm : FormGroup;
  data : department;
  submitted = false;
  submitbtn = false;
  departmentdata : any=[];
  frlable:string="";
  title:string="";
  departmentid: number=0;
  depdata : any=[];
  pageSize : number=5;
  PageNumber : any=1;
  totalrecord : any=0;
  Departments : any="";
  role : number=0;

  constructor(private authservice: AuthService, private FB: FormBuilder,private router: Router,private route: ActivatedRoute) 
  { 
    this.data = {
      Depid : 0,
      name : "",
    }
    
    this.departmentForm = this.FB.group({
      name : ['',[Validators.required, Validators.pattern("[a-zA-Z]+")]],

    })
   
  }


  get f() { return this.departmentForm.controls; }

  public visible = false;
  
  toggleModal()
  {
    this.onReset();
    this.departmentid = 0;
    this.visible = !this.visible;
    this.frlable="Add";
  }

  companyModal(getDatabyId:any) {
    this.onReset();
    this.visible = !this.visible;
    this.frlable="Update";
    this.departmentForm.controls["name"].setValue(getDatabyId.Name);
    this.departmentid=getDatabyId.Depid;
  }

  handleChange(event: any) {
    this.visible = event;
  }


  ngOnInit(): void {

    this.role = Number(localStorage.getItem('role'));
    if(this.role==2){
      this.router.navigate(['/dashboard']);
    }

    //debugger
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
    this.depDetails(this.PageNumber,this.pageSize,this.Departments);
  }

  depDetails(PageNumber:number,pageSize:number,Departments:string) {
    // debugger
    this.authservice.depDetails(PageNumber,pageSize,Departments).subscribe(responce => {
     
      if(responce.IsSuccess)
      {
        this.totalrecord = responce.Data[0].totalrecord;
        this.depdata = responce.Data;
      }
      else
      {
        this.depdata = [];
      }
     
    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.depDetails(this.PageNumber, this.pageSize, this.Departments);
  }


  changePageSize(){
    // debugger
    this.PageNumber=1;
   this.depDetails(this.PageNumber, this.pageSize, this.Departments);
  }


  //search method
  searchDepartment(){
    this.depDetails(this.PageNumber, this.pageSize, this.Departments);
  }


  //delete method
  deleteDepartment(deplist : any) {
          
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
        this.authservice.deleteDepartment(deplist.Depid).subscribe(responce => {
        
          if (responce.IsSuccess){
            Swal.fire(
              'Deleted!',
              responce.ReturnMessage,
              'success'
            )
            this.depDetails(this.PageNumber,this.pageSize, this.Departments);
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



  addDepartment(){
    this.submitted = true;

    if(this.departmentForm.invalid)
    {
      this.submitbtn = false;
      return;
    }

    if(this.departmentid>0){
      debugger
      this.data.Depid = this.departmentid;
      this.data.name = this.departmentForm.value.name;

      this.authservice.editDepartment(this.data).subscribe(response => {
        debugger
        if(response.IsSuccess)
        {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.visible = !this.visible;
          this.depDetails(this.PageNumber,this.pageSize, this.Departments);
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

      this.data.Depid = this.departmentid;
      this.data.name = this.departmentForm.value.name;

      this.authservice.adddepartment(this.data).subscribe(response => {
        debugger
        if(response.IsSuccess)
        {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.visible = !this.visible;
          this.depDetails(this.PageNumber,this.pageSize, this.Departments);
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
    this.submitbtn = false;
    this.submitted = false;
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
