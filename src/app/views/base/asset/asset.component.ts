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
  Assetid : number=0;
  branchid : any=0;
  vendorid : any=0;
  typeid : any=0;
  dateid : any=0;
  role : number=0;
  typelistdata : any=[];
  branchlistdata : any=[];
  vendorlistdata : any=[];

  constructor(private authservice:AuthService, private router:Router) { }

  ngOnInit(): void {
    //debugger
    this.role = Number(localStorage.getItem('role'));
    if(this.role==2){
      this.router.navigate(['/dashboard']);
    }
    this.assetDetails(this.PageNumber,this.pageSize,this.Assets,this.branchid,this.typeid,this.vendorid,this.dateid);

    this.getAllTables();
  }

  //get method for get the data of branch
  assetDetails(PageNumber:number,pageSize:number,Assets:string,branchid:number,typeid:number,vendorid:number,dateid:number) {
    debugger
    this.authservice.assetDetails(PageNumber,pageSize,Assets,branchid,typeid,vendorid,dateid).subscribe(responce => {
     
      // localStorage.setItem('assetid',responce.Data.Assetid);
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
    this.assetDetails(this.PageNumber, this.pageSize,this.Assets,this.branchid,this.typeid,this.vendorid,this.dateid);
  }


  changePageSize(){
    // debugger
    this.PageNumber=1;
   this.assetDetails(this.PageNumber, this.pageSize,this.Assets,this.branchid,this.typeid,this.vendorid,this.dateid);
  }


  //search method
  searchAsset(){
    // debugger
    this.assetDetails(this.PageNumber,this.pageSize,this.Assets,this.branchid,this.typeid,this.vendorid,this.dateid);
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
            this.assetDetails(this.PageNumber,this.pageSize,this.Assets,this.branchid,this.typeid,this.vendorid,this.dateid);
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
        
        if(responce.Data.table.length > 0){
          this.typelistdata = responce.Data.table;
        }
        else
        {
          this.typelistdata = [];
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
