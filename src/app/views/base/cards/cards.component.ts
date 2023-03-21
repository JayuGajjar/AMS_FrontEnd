import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  companydata : any=[];
  pageSize : number=5;
  PageNumber:any=1;
  
  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
    //debugger
    this.companyDetails(this.PageNumber,this.pageSize);
  }

  companyDetails(PageNumber:number,pageSize:number) {
    // debugger
    this.authservice.companyDetails(PageNumber,pageSize).subscribe(responce => {
     
      if(responce.IsSuccess)
      {
        this.companydata = responce.Data;
      }
      else
      {
        alert(responce.ReturnMessage);
      }
     
    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.companyDetails(this.PageNumber, this.pageSize);
  }


  changePageSize(){
    // debugger
    this.PageNumber=1;
   this.companyDetails(this.PageNumber, this.pageSize);
  }


  //delete method
  deleteCompany(companylist : any) {
          
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
        this.authservice.deleteCompany(companylist.Companyid).subscribe(responce => {
        
          if (responce.IsSuccess){
            Swal.fire(
              'Deleted!',
              responce.ReturnMessage,
              'success'
            )
            this.companyDetails(this.PageNumber,this.pageSize);
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