import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import * as Highcharts from 'highcharts';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { FormModule } from '@coreui/angular';


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})


export class DashboardComponent implements OnInit {


  totalasset: number = 0;
  totalnew: number = 0;
  totalinUse: number = 0;
  totalSpare: number = 0;
  totalWorking: number = 0;
  totalscrap: number = 0;
  totalrequest: number = 0;
  totalreadyforscrap: number = 0;
  totalundermaintenance: number = 0;
  totalstatus: number = 0;
  totalusers: number = 0;
  totalinprocess: number = 0;
  columnchart: any;
  piechart: any;

  requestdata: any = [];
  pageSize: number = 5;
  PageNumber: any = 1;
  specialrecord: number = 0;
  Requests: any = "";
  userId: any = 0;
  id: any;
  uniqueid: any;
  serialno: any;
  role: number = 0;
  dataPointSelections: any;

  acceptForm : FormGroup;
  submitted : any;
  submitbtn : any;


  constructor(private authService: AuthService, private router: Router, private FB: FormBuilder) 
  {
    this.acceptForm = this.FB.group({
      uniqueid : ['',[Validators.required]],
      serialno : ['',[Validators.required]],
    })
  }


  get f() { return this.acceptForm.controls; }
  
    public visible = false;

    toggleModal()
    {
      this.onReset();
      // this.id = 0;
      this.visible = !this.visible;
    }

    acceptModal(getDatabyId:any) {
      debugger
      this.onReset();
      this.visible = !this.visible;
      this.id = getDatabyId;
    }
  
    handleChange(event: any) {
      this.visible = event;
    }

    onReset(){
      this.submitted = false;
      this.submitbtn = false;
      this.acceptForm.patchValue({uniqueid : ''})
      this.acceptForm.patchValue({serialno : ''})
    }

  ngOnInit(): void {

    this.role = Number(localStorage.getItem('role'));

    this.getAllValues();

    // this.authService.Refreshrequired.subscribe(response=>{
    //   this.getAllValues();
    // })

    // setInterval(() => {
    //   this.getAllValues(); // api call
    // }, 1000);

    this.userId = localStorage.getItem('userid');
    this.requestDetails(this.PageNumber, this.pageSize, this.Requests, this.userId);
  }



  //get for all tables
  getAllValues() {
    // debugger
    this.authService.getAllValues().subscribe(responce => {
      // debugger
      if (responce.IsSuccess) {

        if (responce.Data.table.length > 0) {
          this.totalasset = responce.Data.table[0].totalassets;
          this.totalnew = responce.Data.table[0].totalnew;
          this.totalinUse = responce.Data.table[0].totalinUse;
          this.totalSpare = responce.Data.table[0].totalSpare;
          this.totalWorking = responce.Data.table[0].totalWorking;
          this.totalscrap = responce.Data.table[0].totalscrap;
          this.totalinprocess = responce.Data.table[0].totalinprocess;
          this.totalreadyforscrap = responce.Data.table[0].totalReadyForScrap;
          this.totalundermaintenance = responce.Data.table[0].totaludermaintainence;
          this.totalrequest = responce.Data.table[0].totalrequest;
          this.totalstatus = responce.Data.table[0].totalstatus;
          this.totalusers = responce.Data.table[0].totalusers;
          // this.totalvendors = responce.Data.table[0].totalvendors;
        }


        //Pie Chart
        this.piechart = {
          chart: {
            plotBorderWidth: null,
            plotShadow: false
          },
          title: {
            text: 'Assets Info'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              point: {
                events: {
                  dataPointSelection: (event: any, chartContext: any, config: any) => {
                    if (event) this.dataPointSelections.emit(config.dataPointIndex)
                  },
                  click: function(event:any) {
                    debugger
                    location.href = 'http://localhost:4200/#' + event.point.path;
                    // location.href + this.options.key
                  }
                }
              },

              dataLabels: {
                enabled: true
              },

              showInLegend: true
            }
          },
          series: [{
            type: 'pie',
            name: 'Assets',
            data: [
              {
                name: 'Total InUse',
                y: this.totalinUse,
                color: '#80D651',
                path: "/base/inuse",
              },
              {
                name: 'Total Spare',
                y: this.totalSpare,
                color: '#969696',
                path: "/base/spare"
              },
              {
                name: 'Total Working',
                y: this.totalWorking,
                color: '#003cff',
                path: "/base/working"
              },
              {
                name: 'Total New Requests',
                y: this.totalnew,
                color: '#58a6ff',
                path: "/base/newrequests"
              },
              {
                name: 'Total Ready For Scrap',
                y: this.totalreadyforscrap,
                color: '#ff8945',
                path: "/base/readyforscrap"
              },
              {
                name: 'Total Scrap',
                y: this.totalscrap,
                color: '#d73814',
                path: "/base/scrap"
              },
              {
                name: 'Total InProgress',
                y: this.totalinprocess,
                color: '#FEAF20',
                path: "/base/inprogress"
              },
              {
                name: 'Total Under Maintenance',
                y: this.totalundermaintenance,
                color: '#531300',
                path: "/base/maintenance"
              },
            ]
          }]
        };
        Highcharts.chart('pieChart', this.piechart);
      }
    })
  }



  requestDetails(PageNumber: number, pageSize: number, Requests: string, userId: number) {
    // debugger
    this.authService.requestDetails(PageNumber, pageSize, Requests, userId).subscribe(responce => {

      if (responce.IsSuccess) {
        this.specialrecord = responce.Data[0].specialrecord;
        this.requestdata = responce.Data;
      }
      else {
        this.requestdata = [];
      }

    });
  }

  pageChangeEvent(event: number) {
    this.PageNumber = event;
    this.requestDetails(this.PageNumber, this.pageSize, this.Requests, this.userId);
  }


  changePageSize() {
    // debugger
    this.PageNumber = 1;
    this.requestDetails(this.PageNumber, this.pageSize, this.Requests, this.userId);
  }


  //search method
  searchRequest() {
    this.requestDetails(this.PageNumber, this.pageSize, this.Requests, this.userId);
  }



  //status change
  assetAllotment() {

    this.submitted = true;
    this.submitbtn = true;
    if(this.acceptForm.invalid){
      this.submitbtn = false;
      return;
    }


        this.id = this.id;
        this.uniqueid = this.acceptForm.value.uniqueid;
        this.serialno = this.acceptForm.value.serialno;
        debugger
        this.authService.assetAllotment(this.id, this.uniqueid, this.serialno).subscribe(responce => {
          debugger
          if (responce.IsSuccess) {
            Swal.fire(
              'Success!',
              responce.ReturnMessage,
              'success'
            )
            this.submitbtn = false;
            this.visible = !this.visible;
            this.requestDetails(this.PageNumber, this.pageSize, this.Requests, this.userId);
          }
          else {
            Swal.fire(
              'Something went wrong!',
              responce.ReturnMessage,
              'error'
            )
            this.visible = !this.visible;
            this.onReset();
          }
        })
  }


  //delete method
  deleteRequest(requestlist: any) {

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
        this.authService.deleteRequest(requestlist.Requestid).subscribe(responce => {

          if (responce.IsSuccess) {
            Swal.fire(
              'Deleted!',
              responce.ReturnMessage,
              'success'
            )
            this.requestDetails(this.PageNumber, this.pageSize, this.Requests, this.userId);
          }
          else {
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



  getRequestById(Requestid : any){
    this.authService.getRequestById(Requestid).subscribe(responce => {
      // debugger
      if (responce.IsSuccess)
      {
        this.requestdata = [];

        if(responce.Data.length > 0){
          // debugger
          this.id=responce.Data[0].Requestid;
         }
      }
    })
  }

}