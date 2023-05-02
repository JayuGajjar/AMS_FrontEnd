import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { role } from 'src/app/Interfaces/role';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent {

  userdata : any=[];
  pageSize : number=5;
  PageNumber : any=1;
  totalrecord : any=0;
  Users : any="";
  roleForm : FormGroup;
  data : role;
  submitted = false;
  submitbtn = false;
  role : number=0;
  userid : number=0;
  rolelistdata : any=[];
  loader = true;
  
    constructor(private authservice:AuthService,private router:Router ,private FB: FormBuilder,private route: ActivatedRoute) {

      this.data = {
        role : 0,
      }

      this.roleForm = this.FB.group({
        role : ['',[Validators.required]],
      })

     }


    get f() { return this.roleForm.controls; }

    public visible = false;

    toggleModal()
    {debugger
      this.onReset();
      this.visible = !this.visible;
    }

    usreModel(getDatabyId:any) {
      
      this.onReset();
      this.visible = !this.visible;
      this.roleForm.controls["role"].setValue(getDatabyId.Role);
      this.userid=getDatabyId.Userid;
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
          //fill record in
          this.getUserById(ID)
          }
          else
          {
            this.userid=0;
          }

      this.getAllTables();
      this.userDetails(this.PageNumber,this.pageSize,this.Users);
    }
  
    userDetails(PageNumber:number,pageSize:number,Users:string) {
      // debugger
      this.authservice.userDetails(PageNumber,pageSize,Users).subscribe(responce => {
       
        if(responce.IsSuccess)
        {
          this.loader = false;
          this.totalrecord = responce.Data[0].totalrecord;
          this.userdata = responce.Data;
        }
        else
        {
          this.userdata = [];
        }
       
      });
    }
  
    pageChangeEvent(event: number) {
      this.PageNumber = event;
      this.userDetails(this.PageNumber, this.pageSize, this.Users);
    }
  
  
    changePageSize(){
      // debugger
      this.PageNumber=1;
     this.userDetails(this.PageNumber, this.pageSize, this.Users);
    }
  
  
    //serach method
    searchUser(){
      this.userDetails(this.PageNumber, this.pageSize, this.Users);
    }
  
    //delete method
    deleteUser(userlist : any) {
            
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
          this.authservice.deleteUser(userlist.Userid).subscribe(responce => {
          
            if (responce.IsSuccess){
              // debugger
              Swal.fire(
                'Deleted!',
                responce.ReturnMessage,
                'success'
              )
              this.userDetails(this.PageNumber,this.pageSize,this.Users);
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



    //get all tables
    getAllTables(){
      // debugger
      this.authservice.getAllTables().subscribe(responce => {
        // debugger
        if(responce.IsSuccess)
        {
          if(responce.Data.table5.length > 0){
            this.rolelistdata = responce.Data.table5;
          }
          else
          {
            this.rolelistdata = [];
          }
        }
      })
    }



    changeRole(){
      debugger

      this.role = this.roleForm.value.role;

      this.authservice.changeRole(this.userid,this.role).subscribe(response => {
        debugger
        if(response.IsSuccess)
        {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.visible = !this.visible;
          this.userDetails(this.PageNumber, this.pageSize, this.Users);
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


    onReset(){
      this.roleForm.patchValue({role:""});
      this.submitbtn = false;
      this.submitted = false;
    }


    getUserById(Userid:number){
        this.authservice.getBranchById(Userid).subscribe(responce => {
          // debugger
          if (responce.IsSuccess)
          {
            this.userdata = [];
  
            if(responce.Data.length > 0){
              this.userid=responce.Data[0].Userid;
             this.roleForm.controls["role"].setValue(responce.Data[0].RoleName);
             }
          }
        })
      }

  }