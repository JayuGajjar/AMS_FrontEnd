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
  assetid : any=0;
  branchid : any=0;
  vendorid : any=0;
  assetlistdata : any=[];
  branchlistdata : any=[];
  vendorlistdata : any=[];

  constructor(private authservice:AuthService, private router:Router) { }

  ngOnInit(): void {
    
    this.role = Number(localStorage.getItem('role'));
    if(this.role==2){
      this.router.navigate(['/dashboard']);
    }

    this.getAllTables();

    // debugger
    this.scrapDetails(this.PageNumber,this.pageSize,this.Scraps,this.assetid,this.branchid,this.vendorid);
  }

  scrapDetails(PageNumber:number,pageSize:number,Scraps:string,assetid:number,branchid:number,vendorid:number) {
    debugger
    this.authservice.scrapDetails(PageNumber,pageSize,Scraps,assetid,branchid,vendorid).subscribe(responce => {
     
      if(responce.IsSuccess)
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
    this.scrapDetails(this.PageNumber, this.pageSize, this.Scraps,this.assetid,this.branchid,this.vendorid);
  }


  changePageSize(){
    // debugger
    this.PageNumber=1;
   this.scrapDetails(this.PageNumber, this.pageSize, this.Scraps,this.assetid,this.branchid,this.vendorid);
  }


  //search method
  searchScrap(){
    this.scrapDetails(this.PageNumber, this.pageSize, this.Scraps,this.assetid,this.branchid,this.vendorid);
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
            this.scrapDetails(this.PageNumber,this.pageSize, this.Scraps,this.assetid,this.branchid,this.vendorid);
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



  //get for all tables
  getAllTables(){
    // debugger
    this.authservice.getAllTables().subscribe(responce => {
      // debugger
      if(responce.IsSuccess){
        
        if(responce.Data.table7.length > 0){
          this.assetlistdata = responce.Data.table7;
        }
        else
        {
          this.assetlistdata = [];
        }

        if(responce.Data.table2.length > 0){
          this.branchlistdata = responce.Data.table2;
        }
        else
        {
          this.branchlistdata = [];
        }

        if(responce.Data.table6.length > 0){
          this.vendorlistdata = responce.Data.table6;
        }
        else
        {
          this.vendorlistdata = [];
        }
      }
    })
  }


  
}
