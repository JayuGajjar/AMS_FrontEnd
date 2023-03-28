import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asset',
  templateUrl: './accordions.component.html',
  styleUrls: ['./accordions.component.css']
})
export class AccordionsComponent {

  assetdata : any=[];
  pageSize : number=5;
  PageNumber: any=1;
  Assets : any="";

  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
    //debugger
    this.assetDetails(this.PageNumber,this.pageSize,this.Assets);
  }

  //get method for get the data of branch
  assetDetails(PageNumber:number,pageSize:number,Assets:string) {
    // debugger
    this.authservice.assetDetails(PageNumber,pageSize,Assets).subscribe(responce => {
     
      if(responce.IsSuccess)
      {
        this.assetdata = responce.Data;
      }
      else
      {
        alert(responce.ReturnMessage);
      }
     
    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.assetDetails(this.PageNumber, this.pageSize,this.Assets);
  }


  changePageSize(){
    // debugger
    this.PageNumber=1;
   this.assetDetails(this.PageNumber, this.pageSize,this.Assets);
  }


  //search method
  searchAsset(){
    // debugger
    this.assetDetails(this.PageNumber,this.pageSize,this.Assets);
  }



  //delete method
  deleteAsset(assetlist : any) {
          
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
        this.authservice.deleteAsset(assetlist.Assetid).subscribe(responce => {
        
          if (responce.IsSuccess){
            Swal.fire(
              'Deleted!',
              responce.ReturnMessage,
              'success'
            )
            this.assetDetails(this.PageNumber,this.pageSize,this.Assets);
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