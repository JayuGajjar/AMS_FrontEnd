import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})

export class ProgressComponent {

  scrapdata : any=[];
  pageSize : number=5;
  PageNumber:any=1;

  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
    //debugger
    this.scrapDetails(this.PageNumber,this.pageSize);
  }

  scrapDetails(PageNumber:number,pageSize:number) {
    // debugger
    this.authservice.scrapDetails(PageNumber,pageSize).subscribe(responce => {
     
      if(responce.IsSuccess=true)
      {
        this.scrapdata = responce.Data;
      }
      else
      {
        alert(responce.ReturnMessage);
      }
     
    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.scrapDetails(this.PageNumber, this.pageSize);
  }


  changePageSize(){
    // debugger
    this.PageNumber=1;
   this.scrapDetails(this.PageNumber, this.pageSize);
  }

  //delete method
  deleteScrap(scraplist : any) {
          
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
        this.authservice.deleteScrap(scraplist.Scrapid).subscribe(responce => {
        
          if (responce.IsSuccess){
            Swal.fire(
              'Deleted!',
              responce.ReturnMessage,
              'success'
            )
            this.scrapDetails(this.PageNumber,this.pageSize);
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


