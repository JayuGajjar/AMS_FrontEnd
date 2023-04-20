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

  loginForm: FormGroup;
  submitted = false;
  data: Login;
  submitbtn: boolean = false;

  constructor(private FB: FormBuilder, private router: Router, private authService: AuthService) {

    this.data = {
      email: "",
      password: ""
    }

    this.loginForm = this.FB.group({
      email: ['', [Validators.required,
      Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
      password: ['', [Validators.required,
      Validators.pattern("(?=.*)(?=.*[a-z])(?=.*[!-*,@,?])(?=.*[A-Z]).{8,}")]],
    });
  }

  ngOnInit(): void { }

  get f() { return this.loginForm.controls };

  // loginForm = new FormGroup({
  //   email: new FormControl("",[Validators.required,
  //                             Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
  //   pass: new FormControl("",[Validators.required,
  //                             Validators.pattern("(?=.*)(?=.*[a-z])(?=.*[!-*,@,?])(?=.*[A-Z]).{8,}")]),
  // });

  loginSubmited() {
    // console.log(this.loginForm);
    this.submitted = true;
    this.submitbtn = true;

    if (this.loginForm.invalid) {
      this.submitbtn = false;
      return;
    }

    this.data.email = this.loginForm.value.email;
    this.data.password = this.loginForm.value.password;


    this.authService.loginUser(this.data).subscribe(response => {
      debugger
      // console.log(response);
      // localStorage.setItem('isSuccess',response.isLoggedIn);
      localStorage.setItem('isSuccess', response.IsSuccess);


      if (response.IsSuccess) 
      {
        localStorage.setItem('role', response.Data.Role);
        localStorage.setItem('rolename', response.Data.RoleName);
        localStorage.setItem('username', response.Data.Username);
        localStorage.setItem('userid', response.Data.Userid);
        localStorage.setItem('firstname', response.Data.First_name);
        localStorage.setItem('lastname', response.Data.Last_name);
        localStorage.setItem('email', response.Data.Email);
        localStorage.setItem('department', response.Data.DepartmentName);
        localStorage.setItem('branch', response.Data.BranchName);
        localStorage.setItem('floor', response.Data.Floor);
        localStorage.setItem('company', response.Data.CompanyName);
        localStorage.setItem('data', response.Data);
        this.router.navigate(['/dashboard']);
      }
      else {
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
    this.submitbtn = false;
    this.loginForm.patchValue({ email: '' });
    this.loginForm.patchValue({ password: '' });
  }

}
