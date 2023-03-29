import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { branch } from 'src/app/Interfaces/branch'
import Swal from 'sweetalert2';
declare const $: any;

@Component({
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

    branchdata : any=[];
    pageSize : number=5;
    PageNumber : number=1;
    totalrecord : any=0;
    Branches : any="";
    
      constructor(private authservice:AuthService, private FB: FormBuilder) {  }
    
      ngOnInit(): void {
        // debugger
        this.branchDetails(this.PageNumber,this.pageSize,this.Branches);
      }

      //for popup form
      // openForm(){
      //   debugger
      //   this.visible = !this.visible;
      // }

      // handleLiveDemoChange(event : any){
      //   this.visible = event;
      // }
      
    
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
            alert(responce.ReturnMessage);
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

        
}