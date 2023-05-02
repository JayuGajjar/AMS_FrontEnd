import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { type } from 'src/app/Interfaces/type';
import Swal from 'sweetalert2';
import { branch } from 'src/app/Interfaces/branch';

@Component({
  selector: 'app-assettype',
  templateUrl: './assettype.component.html',
  styleUrls: ['./assettype.component.css']
})
export class AssettypeComponent {


  assetTypeForm : FormGroup;
  data : type;
  submitted = false;
  submitbtn = false;
  frlable:string="";
  title:string="";
  typeid:number=0;
  assettypedata : any=[];
  pageSize : number=5;
  PageNumber : number=1;
  totalrecord : any=0;
  AssetType : any="";
  role : number=0;
  loader = true;
  
  constructor(private authservice: AuthService, private FB: FormBuilder,private router: Router,private route: ActivatedRoute) 
  { 
    this.data = {
      typeid : 0,
      name : "",
    }
    
    this.assetTypeForm = this.FB.group({
      name : ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9&]+( [a-zA-Z0-9&]+)*$')]],

    })
   
  }

  get f() { return this.assetTypeForm.controls; }

  public visible = false;

  toggleModal()
  {
    this.onReset();
    this.typeid = 0;
    this.visible = !this.visible;
    this.frlable="Add";
  }

  typeModal(getDatabyId:any) {
    debugger
    this.onReset();
    this.visible = !this.visible;
    this.frlable="Update";
    this.assetTypeForm.controls["name"].setValue(getDatabyId.Name);
    this.typeid=getDatabyId.Typeid;
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
        this.getTypeById(ID)
        }
        else
        {
          this.title="Add"
          this.frlable="Add";
          this.typeid=0;
        }

         this.assetTypeDetails(this.PageNumber,this.pageSize,this.AssetType);
    }
    
  
    //get method for get the data of branch
    assetTypeDetails(PageNumber:number,pageSize:number,AssetType:string) {
      // debugger
      this.authservice.assetTypeDetails(PageNumber,pageSize,AssetType).subscribe(responce => {
       
        if(responce.IsSuccess)
        {
          this.loader = false;
          this.totalrecord = responce.Data[0].totalrecord;
          this.assettypedata = responce.Data;
        }
        else
        {
          this.assettypedata = [];
        }
       
      });
    }

  
    pageChangeEvent(event: number) {
      this.PageNumber = event;
      this.assetTypeDetails(this.PageNumber,this.pageSize,this.AssetType);
    }
  
  
    changePageSize(){
      // debugger
      this.PageNumber=1;
      this.assetTypeDetails(this.PageNumber,this.pageSize,this.AssetType);
    }


    //search method
    searchType(){
      // debugger
      this.assetTypeDetails(this.PageNumber,this.pageSize,this.AssetType);
    }


    //delete method
    deleteType(assettypelist : any) {
        
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
              this.authservice.deleteType(assettypelist.Typeid).subscribe(responce => {
              debugger
                if (responce.IsSuccess){
                  Swal.fire(
                    'Deleted!',
                    responce.ReturnMessage,
                    'success'
                  )
                  this.assetTypeDetails(this.PageNumber,this.pageSize,this.AssetType);
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



      addAssetType(){
        this.submitted = true;
    
        if(this.assetTypeForm.invalid)
        {
          this.submitbtn = false;
          return;
        }
    
        if(this.typeid>0){
          debugger
    
          this.data.typeid = this.typeid;
          this.data.name = this.assetTypeForm.value.name;
    
          this.authservice.editType(this.data).subscribe(response => {
            debugger
            if(response.IsSuccess)
            {
              Swal.fire(
                'Great!',
                response.ReturnMessage,
                'success'
              )
              this.visible = !this.visible;
              this.assetTypeDetails(this.PageNumber,this.pageSize,this.AssetType);
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
          this.data.typeid = this.typeid;
          this.data.name = this.assetTypeForm.value.name;
    
          this.authservice.addassettype(this.data).subscribe(response => {
            debugger
        
            if(response.IsSuccess)
            {
              Swal.fire(
                'Great!',
                response.ReturnMessage,
                'success'
              )
              this.visible = !this.visible;
              this.assetTypeDetails(this.PageNumber,this.pageSize,this.AssetType);
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
        this.assetTypeForm.patchValue({name:""});
        this.submitbtn = false;
        this.submitted = false;
      }


      getTypeById(Typeid : any){
        this.authservice.getTypeById(Typeid).subscribe(responce => {
          // debugger
          if (responce.IsSuccess)
          {
            this.assettypedata = [];
  
            if(responce.Data.length > 0){
              this.typeid=responce.Data[0].Typeid;
             this.assetTypeForm.controls["name"].setValue(responce.Data[0].Name);
             }
          }
        })
      }


}
