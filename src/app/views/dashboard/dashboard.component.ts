import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import * as Highcharts from 'highcharts';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';


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
  totalstatus: number = 0;
  totalusers: number = 0;
  columnchart: any;
  piechart: any;

  requestdata: any = [];
  pageSize: number = 5;
  PageNumber: any = 1;
  specialrecord: number = 0;
  Requests: any = "";
  userId: any = 0;
  id: any;
  type: any;
  isworking: any;
  inuse: any;
  role: number = 0;
  dataPointSelections: any;


  constructor(private authService: AuthService, private router: Router) { }



  ngOnInit(): void {

    this.role = Number(localStorage.getItem('role'));

    this.getAllValues();

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
          // this.totalbranches = responce.Data.table[0].totalbranches;
          // this.totalcompanies = responce.Data.table[0].totalcompanies;
          // this.totaldepartments = responce.Data.table[0].totaldepartments;
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
            text: 'Assets Pie Chart'
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
                  }
                  // click: function() {
                  //   // location.href = 'http://localhost:4200/#'
                  //   // location.href + this.options.key
                  // }
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
                event: "/base/inuse",
              },
              {
                name: 'Total Spare',
                y: this.totalSpare,
                color: '#969696',
                key: "/base/spare"
              },
              {
                name: 'Total Working',
                y: this.totalWorking,
                color: '#003cff',
                key: "/base/working"
              },
              {
                name: 'Total New Requests',
                y: this.totalnew,
                color: '#58a6ff',
                key: "/base/newrequests"
              },
              {
                name: 'Total Scrap',
                y: this.totalscrap,
                color: '#d73814',
                key: "/base/scrap"
              },
              {
                name: 'Total Asset',
                y: this.totalasset,
                color: '#63004a',
                key: "/base/asset"
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
  statusChange(id: number, type: number, isworking: boolean, inuse: boolean) {
    // debugger
    this.authService.statusChange(id, type, isworking, inuse).subscribe(responce => {
      debugger
      if (responce.IsSuccess) {
        Swal.fire(
          'Success!',
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

}