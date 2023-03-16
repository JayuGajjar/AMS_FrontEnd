import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-placeholders',
  templateUrl: './placeholders.component.html',
  styleUrls: ['./placeholders.component.css']
})
export class PlaceholdersComponent implements OnInit {
userdata : any=[];
pageSize : number=5;
PageNumber:any=1;
  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
    //debugger
    this.userDetails(this.PageNumber,this.pageSize);
  }

  userDetails(PageNumber:number,pageSize:number) {
    // debugger
    this.authservice.userDetails(PageNumber,pageSize).subscribe(responce => {
     
      if(responce.IsSuccess)
      {
        this.userdata = responce.Data;
      }
      else
      {
        alert(responce.ReturnMessage);
      }
     
    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.userDetails(this.PageNumber, this.pageSize);
  }


  changePageSize(){
    // debugger
    this.PageNumber=1;
   this.userDetails(this.PageNumber, this.pageSize);
  }

  //delete method
  deleteUser(userlist : any) {
          
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
        this.authservice.deleteUser(userlist.Userid).subscribe(responce => {
        
          if (responce.IsSuccess){
            // debugger
            Swal.fire(
              'Deleted!',
              responce.ReturnMessage,
              'success'
            )
            this.userDetails(this.PageNumber,this.pageSize);
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
