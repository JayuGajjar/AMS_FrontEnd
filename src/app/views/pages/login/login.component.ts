import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/Interfaces/login';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm : FormGroup;
  submitted = false;
  data : Login;
  submitbtn:boolean=false;

  constructor(private FB: FormBuilder,private router: Router,private authService: AuthService) { 

    this.data = {
      email : "",
      password : ""
      }

      this.loginForm = this.FB.group({
        email : ['',[Validators.required,
                      Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
        password : ['',[Validators.required,
                        Validators.pattern("(?=.*)(?=.*[a-z])(?=.*[!-*,@,?])(?=.*[A-Z]).{8,}")]],
      });
  }

  ngOnInit(): void{}

  get f() {return this.loginForm.controls};

  // loginForm = new FormGroup({
  //   email: new FormControl("",[Validators.required,
  //                             Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
  //   pass: new FormControl("",[Validators.required,
  //                             Validators.pattern("(?=.*)(?=.*[a-z])(?=.*[!-*,@,?])(?=.*[A-Z]).{8,}")]),
  // });

  loginSubmited(){
    // console.log(this.loginForm);
    this.submitted = true;

    if(this.loginForm.invalid){
      return;
    }

    this.data.email=this.loginForm.value.email;
    this.data.password=this.loginForm.value.password;
    

    this.authService.loginUser(this.data).subscribe(response => {
      // console.log(response);
      // localStorage.setItem('isSuccess',response.isLoggedIn);
      // sessionStorage.setItem('isSuccess',response.isLoggedIn);
      localStorage.setItem('isSuccess',response.IsSuccess);
      sessionStorage.setItem('isSuccess',response.IsSuccess);
      sessionStorage.setItem('role',response.Data.Role);

      if(response.IsSuccess)
      {
        Swal.fire(
          'Great!',
          response.ReturnMessage,
          'success'
        )
        this.router.navigate(['/dashboard']);
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
  onReset() {
    this.submitted = false;
    this.loginForm.patchValue({email: ''});
    this.loginForm.patchValue({password: ''});
  }

}
