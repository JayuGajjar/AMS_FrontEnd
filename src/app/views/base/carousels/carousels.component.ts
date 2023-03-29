import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carousels',
  templateUrl: './carousels.component.html',
  styleUrls: ['./carousels.component.css']
})
export class CarouselsComponent {

  depdata : any=[];
  pageSize : number=5;
  PageNumber : any=1;
  totalrecord : any=0;
  Departments : any="";

  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
    //debugger
    this.depDetails(this.PageNumber,this.pageSize,this.Departments);
  }

  depDetails(PageNumber:number,pageSize:number,Departments:string) {
    // debugger
    this.authservice.depDetails(PageNumber,pageSize,Departments).subscribe(responce => {
     
      if(responce.IsSuccess)
      {
        this.totalrecord = responce.Data[0].totalrecord;
        this.depdata = responce.Data;
      }
      else
      {
        alert(responce.ReturnMessage);
      }
     
    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.depDetails(this.PageNumber, this.pageSize, this.Departments);
  }


  changePageSize(){
    // debugger
    this.PageNumber=1;
   this.depDetails(this.PageNumber, this.pageSize, this.Departments);
  }


  //search method
  searchDepartment(){
    this.depDetails(this.PageNumber, this.pageSize, this.Departments);
  }


  //delete method
  deleteDepartment(deplist : any) {
          
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
        this.authservice.deleteDepartment(deplist.Depid).subscribe(responce => {
        
          if (responce.IsSuccess){
            Swal.fire(
              'Deleted!',
              responce.ReturnMessage,
              'success'
            )
            this.depDetails(this.PageNumber,this.pageSize, this.Departments);
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
