import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Registration } from 'src/app/Interfaces/registration';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {


  registerForm: FormGroup;
  submitted = false;
  data: Registration;
  submitbtn: boolean = false;
  branchlistdata: any = [];
  companylistdata: any = [];
  departmentlistdata: any = [];
  loader = true;

  requestdata: any = [];
  pageSize: number = 100;
  PageNumber: any = 1;
  specialrecord: number = 0;
  Requests: any = "";
  userId: any = 0;
  userdata: any = [];
  userid: number = 0;
  Userid: number = 0;
  uniqueid : any;
  serialno : any;

  firstname: string = '';
  lastname: string = '';
  F: string = '';
  L: string = '';

  constructor(private FB: FormBuilder, private router: Router, private authService: AuthService, private route: ActivatedRoute) {

    this.data = {
      userid: 0,
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      department: "",
      branch: "",
      company: "",
      floor: "",
      password: ""
    }

    this.registerForm = this.FB.group({
      firstname: ['', [Validators.required,
                      Validators.pattern('[a-zA-Z]+')]],
      lastname: ['', [Validators.required,
                      Validators.pattern('[a-zA-Z()]+')]],
      username: ['', [Validators.required,
                      Validators.minLength(3),
                      Validators.maxLength(30),
                      Validators.pattern("[a-z0-9_]+")]],
      email: ['', [Validators.required,
                      Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
      department: ['', Validators.required],
      branch: ['', Validators.required],
      company: ['', Validators.required],
      floor: ['', [Validators.required, Validators.pattern("^[0-9a-zA-Z]+")]],
    });
  }

  ngOnInit() {

    let ID: number = parseInt(this.route.snapshot.params['id']);
    if (ID > 0) {
      //fill record in
      debugger
      // this.userid = Number(localStorage.getItem('userid'));
      this.getUserById(ID)
    }
    else {
      this.Userid = Number(localStorage.getItem('userid'));
      ID = this.Userid;
      this.getUserById(ID)
    }

    if (ID > 0) {
      this.userId = ID;
      this.requestDetails(this.PageNumber, this.pageSize, this.Requests, this.userId);
    }
    else {
      this.userId = Number(localStorage.getItem('userid'));
      this.requestDetails(this.PageNumber, this.pageSize, this.Requests, this.userId);
    }
    this.getAllTables();
  }


  // firstname = String(localStorage.getItem('firstname'));
  // lastname = String(localStorage.getItem('lastname'));
  // F = Array.from(this.firstname)[0];
  // L = Array.from(this.lastname)[0];


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

  get f() { return this.registerForm.controls };


  editUser() {

    this.submitted = true;
    // debugger
    if (this.registerForm.invalid) {
      this.submitbtn = false;                            //&& this.registerForm.value.password !== this.registerForm.value.confirmpassword) {
      return
    };


    // debugger
    this.submitbtn = true;
    this.data.userid = this.userid;
    this.data.first_name = this.registerForm.value.firstname;
    this.data.last_name = this.registerForm.value.lastname;
    this.data.username = this.registerForm.value.username;
    this.data.email = this.registerForm.value.email;
    this.data.department = this.registerForm.value.department;
    this.data.branch = this.registerForm.value.branch;
    this.data.company = this.registerForm.value.company;
    this.data.floor = this.registerForm.value.floor;
    this.firstname = this.data.first_name;
    this.lastname = this.data.last_name;
    this.F = Array.from(this.firstname)[0];
    this.L = Array.from(this.lastname)[0];


    this.authService.editUser(this.data).subscribe(response => {

      // localStorage.clear();
      // localStorage.removeItem('username');
      // localStorage.removeItem('firstname');
      // localStorage.removeItem('lastname');
      // localStorage.removeItem('email');
      // localStorage.setItem('username', this.data.username);
      // localStorage.setItem('firstname', this.data.first_name);
      // localStorage.setItem('lastname', this.data.last_name);
      // localStorage.setItem('email', this.data.email);
      // debugger
      if (response.IsSuccess) {
        Swal.fire(
          'Great!',
          response.ReturnMessage,
          'success'
        )
        this.submitbtn = false;
        this.router.navigate(['/base/users']);
      }
      else {
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



  //table of assets
  requestDetails(PageNumber: number, pageSize: number, Requests: string, userId: number) {
    // debugger
    this.authService.requestDetails(PageNumber, pageSize, Requests, userId).subscribe(responce => {

      if (responce.IsSuccess) 
      {
        this.loader = false;
        this.specialrecord = responce.Data[0].specialrecord;
        this.requestdata = responce.Data;
      }
      else {
        this.requestdata = [];
      }

    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.requestDetails(this.PageNumber, this.pageSize, this.Requests, this.userId);
  }


  changePageSize() {
    // debugger
    this.PageNumber = 1;
    this.requestDetails(this.PageNumber, this.pageSize, this.Requests, this.userId);
  }


  //search method
  searchRequest() {
    this.requestDetails(this.PageNumber, this.pageSize, this.Requests, this.userId);
  }


  //get user by id
  getUserById(Userid: number) {
    this.authService.searchUserById(Userid).subscribe(responce => {
      debugger
      if (responce.IsSuccess) {
        this.userdata = responce.Data;

        if (responce.Data.length > 0) {
          debugger
          this.loader = false;
          this.userid = responce.Data[0].Userid;
          this.registerForm.controls["firstname"].setValue(responce.Data[0].First_name);
          this.registerForm.controls["lastname"].setValue(responce.Data[0].Last_name);
          this.registerForm.controls["username"].setValue(responce.Data[0].Username);
          this.registerForm.controls["email"].setValue(responce.Data[0].Email);
          this.registerForm.controls["department"].setValue(responce.Data[0].Department);
          this.registerForm.controls["branch"].setValue(responce.Data[0].Branch);
          this.registerForm.controls["company"].setValue(responce.Data[0].Company);
          this.registerForm.controls["floor"].setValue(responce.Data[0].Floor);
          this.firstname = responce.Data[0].First_name;
          this.lastname = responce.Data[0].Last_name;
          this.F = Array.from(this.firstname)[0];
          this.L = Array.from(this.lastname)[0];
        }

      }
    })
  }



  //get all tables values
  getAllTables() {
    // debugger
    this.authService.getAllTables().subscribe(responce => {
      // debugger
      if (responce.IsSuccess) {

        if (responce.Data.table2.length > 0) {
          this.branchlistdata = responce.Data.table2;
        }
        else {
          this.branchlistdata = [];
        }

        if (responce.Data.table3.length > 0) {
          this.companylistdata = responce.Data.table3;
        }
        else {
          this.companylistdata = [];
        }

        if (responce.Data.table4.length > 0) {
          this.departmentlistdata = responce.Data.table4;
        }
        else {
          this.departmentlistdata = [];
        }
      }
    })
  }




  //status change
  statusChange(id:number,type:number,isworking:boolean,inuse:boolean){
    // debugger
    this.authService.statusChange(id,type,isworking,inuse).subscribe(responce => {
      debugger
      if(responce.IsSuccess)
      {
        Swal.fire(
          'Success!',
          responce.ReturnMessage,
          'success'
          )
          this.requestDetails(this.PageNumber, this.pageSize, this.Requests, this.userId);
        }
        else
        {
          Swal.fire(
            'Something went wrong!',
            responce.ReturnMessage,
            'error'
            )
          }
        })
  }


  //delete method
  deleteRequest(requestlist: any) {

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
        this.authService.deleteRequest(requestlist.Requestid).subscribe(responce => {

          if (responce.IsSuccess) {
            Swal.fire(
              'Deleted!',
              responce.ReturnMessage,
              'success'
            )
            this.requestDetails(this.PageNumber, this.pageSize, this.Requests, this.userId);
          }
          else {
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




  onReset() {
    this.submitted = false;
    this.submitbtn = false;
    // this.registerForm.patchValue({password: ''});
    // this.registerForm.patchValue({confirmPassword: ''})
    this.registerForm = this.FB.group({
      firstname: ['', [Validators.required,
      Validators.pattern('[a-zA-Z]')]],
      lastname: ['', [Validators.required,
      Validators.pattern('[a-zA-Z]')]],
      username: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
      email: ['', [Validators.required,
      Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
      department: ['', Validators.required],
      branch: ['', Validators.required],
      company: ['', Validators.required],
      floor: ['', Validators.required],
    });
  }

}
