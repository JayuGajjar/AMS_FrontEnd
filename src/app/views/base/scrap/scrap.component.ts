import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-scrap',
  templateUrl: './scrap.component.html',
  styleUrls: ['./scrap.component.css']
})
export class ScrapComponent {

  scrapdata : any=[];
  pageSize : number=5;
  PageNumber : any=1;
  totalrecord : any=0;
  Scraps : any="";
  role : number=0;

  constructor(private authservice:AuthService, private router:Router) { }

  ngOnInit(): void {
    
    this.role = Number(sessionStorage.getItem('role'));
    if(this.role==2){
      this.router.navigate(['/dashboard']);
    }

    // debugger
    this.scrapDetails(this.PageNumber,this.pageSize,this.Scraps);
  }

  scrapDetails(PageNumber:number,pageSize:number,Scraps:string) {
    // debugger
    this.authservice.scrapDetails(PageNumber,pageSize,Scraps).subscribe(responce => {
     
      if(responce.IsSuccess=true)
      {
        this.totalrecord = responce.Data[0].totalrecord;
        this.scrapdata = responce.Data;
      }
      else
      {
        this.scrapdata = [];
      }
     
    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.scrapDetails(this.PageNumber, this.pageSize, this.Scraps);
  }


  changePageSize(){
    // debugger
    this.PageNumber=1;
   this.scrapDetails(this.PageNumber, this.pageSize, this.Scraps);
  }


  //search method
  searchScrap(){
    this.scrapDetails(this.PageNumber, this.pageSize, this.Scraps);
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
            this.scrapDetails(this.PageNumber,this.pageSize, this.Scraps);
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
