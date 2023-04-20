import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-totalassets',
  templateUrl: './totalassets.component.html',
  styleUrls: ['./totalassets.component.css']
})
export class TotalassetsComponent {


  role : number=0;
  typelistdata : any=[];
  statuslistdata : any=[];
  branchlistdata : any=[];
  quantitylistdata : any=[];
  workinglistdata : any=[];
  totalbranches: number = 0;


  constructor(private authservice:AuthService, private router:Router) { }


  ngOnInit(): void {
    //debugger
    this.role = Number(localStorage.getItem('role'));
    if(this.role==2){
      this.router.navigate(['/dashboard']);
    }
    this.getAllValues();
    
    this.getReport();
  }



  getAllValues() {
    // debugger
    this.authservice.getAllValues().subscribe(responce => {
      // debugger
      if (responce.IsSuccess) {

        if (responce.Data.table.length > 0) {
          this.totalbranches = responce.Data.table[0].totalbranches;
        }
      }
    })
  }


  getReport(){
    this.authservice.getReport().subscribe(responce => {

      debugger
      if(responce.IsSuccess){

        if(responce.Data.table.length > 0){
          this.typelistdata = responce.Data.table;
        }
        else{
          this.typelistdata = [];
        }

        if(responce.Data.table1.length > 0){
          this.statuslistdata = responce.Data.table1;
        }
        else{
          this.statuslistdata = [];
        }

        if(responce.Data.table2.length > 0){
          this.branchlistdata = responce.Data.table2;
        }
        else{
          this.branchlistdata = [];
        }

        if(responce.Data.table3.length > 0){
          this.quantitylistdata = responce.Data.table3;

        }
        else{
          this.quantitylistdata = [];
        }

        if(responce.Data.table4.length > 0){
          this.workinglistdata = responce.Data.table4;

        }
        else{
          this.workinglistdata = [];
        }
      }
    })
  }

}
