import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { scrap } from 'src/app/Interfaces/scrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-scrap',
  templateUrl: './add-scrap.component.html',
  styleUrls: ['./add-scrap.component.css']
})
export class AddScrapComponent {

    scrapForm : FormGroup;
    data : scrap;
    submitted = false;
    scrapdata : any=[];
    frlable:string="";
    title:string="";
    scrapid: number=0;

  constructor(private authservice: AuthService, private FB: FormBuilder,private router: Router,private route: ActivatedRoute) 
  { 
    this.data = {
      asset : "",
      branch : "",
      last_user : "",
      vendor : "",
    }
    
    this.scrapForm = this.FB.group({
      asset : ['',[Validators.required, Validators.pattern("[0-9]+")]],
      branch : ['',[Validators.required, Validators.pattern("[0-9]+")]],
      last_user : ['',[Validators.required, Validators.pattern("[0-9]+")]],
      vendor : ['',[Validators.required, Validators.pattern("[0-9]+")]],

    })
   
  }

  get f() { return this.scrapForm.controls; }

  addScrap(){
    this.submitted = true;

    if(this.scrapForm.invalid)
    {
      return;
    }

    if(this.scrapid>0){
      this.data.asset = this.scrapForm.value.asset;
      this.data.branch = this.scrapForm.value.branch;
      this.data.last_user = this.scrapForm.value.last_user;
      this.data.vendor = this.scrapForm.value.vendor;

      this.authservice.editScrap(this.data,this.scrapid).subscribe(response => {
    
        if(response.IsSuccess)
        {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.router.navigate(['/base/scrap']);
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
      this.data.asset = this.scrapForm.value.asset;
      this.data.branch = this.scrapForm.value.branch;
      this.data.last_user = this.scrapForm.value.last_user;
      this.data.vendor = this.scrapForm.value.vendor;

      this.authservice.addscrap(this.data).subscribe(response => {
    
        if(response.IsSuccess)
        {
          Swal.fire(
            'Great!',
            response.ReturnMessage,
            'success'
          )
          this.router.navigate(['/base/scrap']);
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
    this.scrapForm.patchValue({asset:""});
    this.scrapForm.patchValue({branch:""});
    this.scrapForm.patchValue({last_user:""});
    this.scrapForm.patchValue({vendor:""});
  }

  ngOnInit(): void {
   debugger
    const ID: number = parseInt(this.route.snapshot.params['id']);
    if(ID>0){
      //fill record in
      this.title="Update";
      this.frlable="Update";
      this.getScrapById(ID)
      }
      else
      {
        this.title="Add"
        this.frlable="Add";
        this.scrapid=0;
      }
    }

    getScrapById(Scrapid : any){
      this.authservice.getScrapById(Scrapid).subscribe(responce => {
        // debugger
        if (responce.IsSuccess)
        {
          this.scrapdata = [];

          if(responce.Data.length > 0){
            this.scrapid=responce.Data[0].Scrapid;
           this.scrapForm.controls["asset"].setValue(responce.Data[0].Asset);
           this.scrapForm.controls["branch"].setValue(responce.Data[0].Branch);
           this.scrapForm.controls["last_user"].setValue(responce.Data[0].Last_user);
           this.scrapForm.controls["vendor"].setValue(responce.Data[0].Vendor);
           }
        }
      })
    }
}
