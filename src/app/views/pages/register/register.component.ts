import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Registration } from 'src/app/Interfaces/registration';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm : FormGroup;
  submitted = false;
  data: Registration;
  submitbtn:boolean=false;
  branchlistdata : any=[];
  companylistdata : any=[];
  departmentlistdata : any=[];

  constructor(private FB: FormBuilder,private router: Router,private authService: AuthService) 
  { 

    this.data = {
      userid : 0,
      first_name : "",
      last_name : "",
      username : "",
      email : "",
      department : "",
      branch : "",
      company : "",
      floor : 0,
      password : ""
      }

      this.registerForm = this.FB.group({
        firstname : ['',[Validators.required,
                        Validators.pattern('[a-zA-Z]+')]],
        lastname : ['',[Validators.required,
                        Validators.pattern('[a-zA-Z]+')]],
        username : ['',[Validators.required, 
                        Validators.minLength(3), 
                        Validators.maxLength(20), 
                        Validators.pattern("[a-zA-Z_]+")]],
        email : ['',[Validators.required, 
                    Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
        department : ['',Validators.required],
        branch : ['',Validators.required],
        company : ['',Validators.required],
        floor : ['',[Validators.required, Validators.max(30)]],
        password : ['',[Validators.required,
                        Validators.pattern("(?=.*)(?=.*[a-z])(?=.*[!-*,@,?])(?=.*[A-Z]).{8,}")]],
        confirmpassword : ['',[Validators.required,
                              Validators.pattern("(?=.*)(?=.*[a-z])(?=.*[!-*,@,?])(?=.*[A-Z]).{8,}")]]
      });
  }

  ngOnInit() { 

    this.getAllTables();
  }

  // registerForm : new FormGroup({
  //   username: new FormControl("",
  //                             [Validators.required,
  //                             Validators.minLength(3),
  //                             Validators.maxLength(20),
  //                             Validators.pattern("[a-zA-Z][a-zA-Z ]+")]),
  //   email: new FormControl("",[Validators.required,
  //                             Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
  //   pass: new FormControl("",[Validators.required,
  //                             Validators.pattern("(?=.*)(?=.*[a-z])(?=.*[!-*,@,?])(?=.*[A-Z]).{8,}")]),
  //   confirmpass: new FormControl("",[Validators.required,
  //                                     Validators.pattern("(?=.*)(?=.*[a-z])(?=.*[!-*,@,?])(?=.*[A-Z]).{8,}")])
  // }); 
  
  get f() {return this.registerForm.controls};

  registerSubmited(){
    
    this.submitted=true;
    // debugger
    if(this.registerForm.invalid) {                               //&& this.registerForm.value.password !== this.registerForm.value.confirmpassword) {
      return
    };


    // debugger
    this.submitbtn=true;
    this.data.first_name=this.registerForm.value.firstname;
    this.data.last_name=this.registerForm.value.lastname;
    this.data.username=this.registerForm.value.username;
    this.data.email=this.registerForm.value.email;
    this.data.department=this.registerForm.value.department;
    this.data.branch=this.registerForm.value.branch;
    this.data.company=this.registerForm.value.company;
    this.data.floor=this.registerForm.value.floor;
    this.data.password=this.registerForm.value.password;


    this.authService.registerUser(this.data).subscribe(response => {
      // debugger
      if(response.IsSuccess)
      {
        Swal.fire(
          'Great!',
          response.ReturnMessage,
          'success'
        )
        this.router.navigate(['/login']);
      }
      else
      {
        // debugger
        Swal.fire(
          'Something went wrong!',
          response.ReturnMessage,
          'error'
        )
        this.onReset();
      }
    })
  } 



  getAllTables(){
    // debugger
    this.authService.getAllTables().subscribe(responce => {
      // debugger
      if(responce.IsSuccess){
        
        if(responce.Data.table2.length > 0){
          this.branchlistdata = responce.Data.table2;
        }
        else
        {
          this.branchlistdata = [];
        }

        if(responce.Data.table3.length > 0){
          this.companylistdata = responce.Data.table3;
        }
        else
        {
          this.companylistdata = [];
        }

        if(responce.Data.table4.length > 0){
          this.departmentlistdata = responce.Data.table4;
        }
        else
        {
          this.departmentlistdata = [];
        }
      }
    })
  }


  

  onReset() {
    this.submitted = false;
    // this.registerForm.patchValue({password: ''});
    // this.registerForm.patchValue({confirmPassword: ''})
    this.registerForm = this.FB.group({
      firstname : ['',[Validators.required,
                      Validators.pattern('[a-zA-Z]')]],
      lastname : ['',[Validators.required,
                      Validators.pattern('[a-zA-Z]')]],
      username : ['',[Validators.required, 
                      Validators.minLength(3), 
                      Validators.maxLength(20), 
                      Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
      email : ['',[Validators.required, 
                  Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
      department : ['',Validators.required],
      branch : ['',Validators.required],
      company : ['',Validators.required],
      floor : ['',Validators.required],
      password : ['',[Validators.required,
                      Validators.pattern("(?=.*)(?=.*[a-z])(?=.*[!-*,@,?])(?=.*[A-Z]).{8,}")]],
      confirmpassword : ['',[Validators.required,
                            Validators.pattern("(?=.*)(?=.*[a-z])(?=.*[!-*,@,?])(?=.*[A-Z]).{8,}")]]
    });
  }


}



    // if(this.Pass.value == this.ConfirmPass.value){
     
    //   this.repeatPass = 'none'
    //   const  abc = this.registerForm.value;
    //   const xyz = JSON.stringify(abc);
      // console.log(xyz);

      // const xyz = JSON.parse(abc)
      

      // this.authService.registerUser(xyz).subscribe(res => {
      //   console.log(res);
      //   // res = JSON.stringify(res)
      // })
    // }
    // else{
    //   this.repeatPass= 'inline'
    // }
  //}

//   get UserName():  FormControl{
//     return this.registerForm.get("username") as FormControl;
//   }

//   get Email():  FormControl{
//     return this.registerForm.get("email") as FormControl;
//   }

//   get Pass():  FormControl{
//     return this.registerForm.get("pass") as FormControl;
//   }

//   get ConfirmPass():  FormControl{
//     return this.registerForm.get("confirmpass") as FormControl;
//   }


// }  ngOnInit(): void {
//     throw new Error('Method not implemented.');
//   }

// }