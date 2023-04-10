import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent {
  assetdata : any=[];
  pageSize : number=5;
  PageNumber: any=1;
  totalrecord : any=0;
  Assets : any="";
  role : number=0;

  constructor(private authservice:AuthService, private router:Router) { }

  ngOnInit(): void {
    //debugger
    this.role = Number(sessionStorage.getItem('role'));
    if(this.role==2){
      this.router.navigate(['/dashboard']);
    }
    this.assetDetails(this.PageNumber,this.pageSize,this.Assets);
  }

  //get method for get the data of branch
  assetDetails(PageNumber:number,pageSize:number,Assets:string) {
    // debugger
    this.authservice.assetDetails(PageNumber,pageSize,Assets).subscribe(responce => {
     
      if(responce.IsSuccess)
      {
        this.totalrecord = responce.Data[0].totalrecord;
        this.assetdata = responce.Data;
      }
      else
      {
        this.assetdata = [];
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
