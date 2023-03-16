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
    PageNumber:any=1;

    
      constructor(private authservice:AuthService, private FB: FormBuilder) {  }
    
      ngOnInit(): void {
        //debugger
        this.branchDetails(this.PageNumber,this.pageSize);
      }

      //for popup form
      // openForm(){
      //   debugger
      //   this.visible = !this.visible;
      // }

      // handleLiveDemoChange(event : any){
      //   this.visible = event;
      // }

      //post method for branch name
      
    
      //get method for get the data of branch
      branchDetails(PageNumber:number,pageSize:number) {
        // debugger
        this.authservice.branchDetails(PageNumber,pageSize).subscribe(responce => {
         
          if(responce.IsSuccess)
          {
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
        this.branchDetails(this.PageNumber, this.pageSize);
      }
    
    
      changePageSize(){
        // debugger
        this.PageNumber=1;
       this.branchDetails(this.PageNumber, this.pageSize);
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
                    this.branchDetails(this.PageNumber,this.pageSize);
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