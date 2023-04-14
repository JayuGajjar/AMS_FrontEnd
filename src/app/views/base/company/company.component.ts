import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { company } from 'src/app/Interfaces/company';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  companyForm : FormGroup;
  data : company;
  frlable:string="";
  title:string="";
  submitted = false;
  submitbtn = false;
  companyid: number=0;
  companydata : any=[];
  pageSize : number=5;
  PageNumber:any=1;
  totalrecord : any=0;
  Companies : any="";
  role : number=0;

  constructor(private authservice: AuthService, private FB: FormBuilder,private router: Router,private route: ActivatedRoute) 
  { 
    this.data = {
      companyid : 0,
      name : "",
    }
    
    this.companyForm = this.FB.group({
      name : ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$')]],

    })
   
  }

  get f() { return this.companyForm.controls; }

  public visible = false;
  
  toggleModal()
  {
    this.onReset();
    this.companyid = 0;
    this.visible = !this.visible;
    this.frlable="Add";
  }
  companyModal(getDatabyId:any) {
    this.onReset();
    this.visible = !this.visible;
    this.frlable="Update";
    this.companyForm.controls["name"].setValue(getDatabyId.Name);
    this.companyid=getDatabyId.Companyid;
  }

  handleChange(event: any) {
    this.visible = event;
  }

  ngOnInit(): void {

    this.role = Number(localStorage.getItem('role'));
    if(this.role==2){
      this.router.navigate(['/dashboard']);
    }

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
    //debugger
    this.companyDetails(this.PageNumber,this.pageSize,this.Companies);
  }

  companyDetails(PageNumber:number,pageSize:number,Companies:string) {
    // debugger
    this.authservice.companyDetails(PageNumber,pageSize,Companies).subscribe(responce => {
     
      if(responce.IsSuccess)
      {
        this.totalrecord = responce.Data[0].totalrecord;
        this.companydata = responce.Data;
      }
      else
      {
        this.companydata = [];
      }
     
    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.companyDetails(this.PageNumber, this.pageSize, this.Companies);
  }


  changePageSize(){
    // debugger
    this.PageNumber=1;
   this.companyDetails(this.PageNumber, this.pageSize, this.Companies);
  }


  //search method
  searchCompany(){
    this.companyDetails(this.PageNumber, this.pageSize, this.Companies);
  }


  //delete method
  deleteCompany(companylist : any) {
          
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
        this.authservice.deleteCompany(companylist.Companyid).subscribe(responce => {
        
          if (responce.IsSuccess){
            Swal.fire(
              'Deleted!',
              responce.ReturnMessage,
              'success'
            )
            this.companyDetails(this.PageNumber,this.pageSize, this.Companies);
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






  addCompany(){
    this.submitted = true;

    if(this.companyForm.invalid)
    {
      return;
    }

    if(this.companyid>0){
      debugger
      this.data.companyid = this.companyid;
      this.data.name = this.companyForm.value.name;

      this.authservice.editCompany(this.data).subscribe(response => {
        debugger
        if(response.IsSuccess)
        {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.visible = !this.visible;
          this.companyDetails(this.PageNumber,this.pageSize, this.Companies);
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

      this.data.companyid = this.companyid;
      this.data.name = this.companyForm.value.name;

      this.authservice.addcompany(this.data).subscribe(response => {
        debugger
        if(response.IsSuccess)
        {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.visible = !this.visible;
          this.companyDetails(this.PageNumber,this.pageSize, this.Companies);
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
    this.submitbtn = false;
    this.submitted = false;
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