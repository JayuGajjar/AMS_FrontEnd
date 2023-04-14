import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { branch } from 'src/app/Interfaces/branch';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent {


    branchForm : FormGroup;
    data : branch;
    submitted = false;
    submitbtn = false;
    frlable:string="";
    title:string="";
    branchid:number=0;
    branchdata : any=[];
    pageSize : number=5;
    PageNumber : number=1;
    totalrecord : any=0;
    Branches : any="";
    role : number=0;
    
    constructor(private authservice: AuthService, private FB: FormBuilder,private router: Router,private route: ActivatedRoute) 
    { 
      this.data = {
        branchid : 0,
        name : "",
      }
      
      this.branchForm = this.FB.group({
        name : ['',[Validators.required, Validators.pattern("[a-zA-Z0-9-_][a-zA-Z0-9-_]+")]],
  
      })
     
    }
  
    get f() { return this.branchForm.controls; }
  
    public visible = false;

    toggleModal()
    {
      this.onReset();
      this.branchid = 0;
      this.visible = !this.visible;
      this.frlable="Add";
    }

    branchModal(getDatabyId:any) {
      debugger
      this.onReset();
      this.visible = !this.visible;
      this.frlable="Update";
      this.branchForm.controls["name"].setValue(getDatabyId.Name);
      this.branchid=getDatabyId.Branchid;
    }
  
    handleChange(event: any) {
      this.visible = event;
    }
    
      ngOnInit(): void {
        // debugger

        this.role = Number(localStorage.getItem('role'));
        if(this.role==2){
          this.router.navigate(['/dashboard']);
          }

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

           this.branchDetails(this.PageNumber,this.pageSize,this.Branches);
      }
      
    
      //get method for get the data of branch
      branchDetails(PageNumber:number,pageSize:number,Branches:string) {
        // debugger
        this.authservice.branchDetails(PageNumber,pageSize,Branches).subscribe(responce => {
         
          if(responce.IsSuccess)
          {
            this.totalrecord = responce.Data[0].totalrecord;
            this.branchdata = responce.Data;
          }
          else
          {
            this.branchdata = [];
          }
         
        });
      }

    
      pageChangeEvent(event: number) {
        this.PageNumber = event;
        this.branchDetails(this.PageNumber, this.pageSize,this.Branches);
      }
    
    
      changePageSize(){
        // debugger
        this.PageNumber=1;
       this.branchDetails(this.PageNumber, this.pageSize,this.Branches);
      }


      //search method
      searchBranch(){
        // debugger
        this.branchDetails(this.PageNumber,this.pageSize,this.Branches);
      }


      //delete method
      deleteBranch(branchlist : any) {
          
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
                this.authservice.deleteBranch(branchlist.Branchid).subscribe(responce => {
                debugger
                  if (responce.IsSuccess){
                    Swal.fire(
                      'Deleted!',
                      responce.ReturnMessage,
                      'success'
                    )
                    this.branchDetails(this.PageNumber,this.pageSize,this.Branches);
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



        addBranch(){
          this.submitted = true;
      
          if(this.branchForm.invalid)
          {
            return;
          }
      
          if(this.branchid>0){
            debugger
      
            this.data.branchid = this.branchid;
            this.data.name = this.branchForm.value.name;
      
            this.authservice.editBranch(this.data).subscribe(response => {
              debugger
              if(response.IsSuccess)
              {
                Swal.fire(
                  'Great!',
                  response.ReturnMessage,
                  'success'
                )
                this.visible = !this.visible;
                this.branchDetails(this.PageNumber,this.pageSize,this.Branches);
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
      
            debugger
            this.data.branchid = this.branchid;
            this.data.name = this.branchForm.value.name;
      
            this.authservice.addbranch(this.data).subscribe(response => {
              debugger
          
              if(response.IsSuccess)
              {
                Swal.fire(
                  'Great!',
                  response.ReturnMessage,
                  'success'
                )
                this.visible = !this.visible;
                this.branchDetails(this.PageNumber,this.pageSize,this.Branches);
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
          this.branchForm.patchValue({name:""});
          this.submitbtn = false;
          this.submitted = false;
        }


        getBranchById(Branchid : any){
          this.authservice.getBranchById(Branchid).subscribe(responce => {
            // debugger
            if (responce.IsSuccess)
            {
              this.branchdata = [];
    
              if(responce.Data.length > 0){
                this.branchid=responce.Data[0].Branchid;
               this.branchForm.controls["name"].setValue(responce.Data[0].Name);
               }
            }
          })
        }


}
