import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})


export class DashboardComponent implements OnInit {


  totalasset : number=0;
  totalnew : number=0;
  totalinUse : number=0;
  totalSpare : number=0;
  totalWorking : number=0;
  totalscrap : number=0;
  totalbranches : number=0;
  totalcompanies : number=0;
  totaldepartments : number=0;
  totalrequest : number=0;
  totalstatus : number=0;
  totalusers : number=0;
  totalvendors : number=0;


  constructor(private authService: AuthService) { }



  ngOnInit(): void {

    this.getAllValues();
  }



  //get for all tables
  getAllValues(){
    // debugger
    this.authService.getAllValues().subscribe(responce => {
      // debugger
      if(responce.IsSuccess){
        
        if(responce.Data.table.length > 0){
          this.totalasset = responce.Data.table[0].totalassets;
          this.totalnew = responce.Data.table[0].totalnew;
          this.totalinUse = responce.Data.table[0].totalinUse;
          this.totalSpare = responce.Data.table[0].totalSpare;
          this.totalWorking = responce.Data.table[0].totalWorking;
          this.totalscrap = responce.Data.table[0].totalscrap;
          this.totalbranches = responce.Data.table[0].totalbranches;
          this.totalcompanies = responce.Data.table[0].totalcompanies;
          this.totaldepartments = responce.Data.table[0].totaldepartments;
          this.totalrequest = responce.Data.table[0].totalrequest;
          this.totalstatus = responce.Data.table[0].totalstatus;
          this.totalusers = responce.Data.table[0].totalusers;
          this.totalvendors = responce.Data.table[0].totalvendors;
        }
        else
        {
          this.totalasset = 0;
        }
      }
    })
  }


}

  // public users: IUser[] = [
  //   {
  //     name: 'Yiorgos Avraamu',
  //     state: 'New',
  //     registered: 'Jan 1, 2021',
  //     country: 'Us',
  //     usage: 50,
  //     period: 'Jun 11, 2021 - Jul 10, 2021',
  //     payment: 'Mastercard',
  //     activity: '10 sec ago',
  //     avatar: './assets/img/avatars/1.jpg',
  //     status: 'success',
  //     color: 'success'
  //   },
  //   {
  //     name: 'Avram Tarasios',
  //     state: 'Recurring ',
  //     registered: 'Jan 1, 2021',
  //     country: 'Br',
  //     usage: 10,
  //     period: 'Jun 11, 2021 - Jul 10, 2021',
  //     payment: 'Visa',
  //     activity: '5 minutes ago',
  //     avatar: './assets/img/avatars/2.jpg',
  //     status: 'danger',
  //     color: 'info'
  //   },
  //   {
  //     name: 'Quintin Ed',
  //     state: 'New',
  //     registered: 'Jan 1, 2021',
  //     country: 'In',
  //     usage: 74,
  //     period: 'Jun 11, 2021 - Jul 10, 2021',
  //     payment: 'Stripe',
  //     activity: '1 hour ago',
  //     avatar: './assets/img/avatars/3.jpg',
  //     status: 'warning',
  //     color: 'warning'
  //   },
  //   {
  //     name: 'Enéas Kwadwo',
  //     state: 'Sleep',
  //     registered: 'Jan 1, 2021',
  //     country: 'Fr',
  //     usage: 98,
  //     period: 'Jun 11, 2021 - Jul 10, 2021',
  //     payment: 'Paypal',
  //     activity: 'Last month',
  //     avatar: './assets/img/avatars/4.jpg',
  //     status: 'secondary',
  //     color: 'danger'
  //   },
  //   {
  //     name: 'Agapetus Tadeáš',
  //     state: 'New',
  //     registered: 'Jan 1, 2021',
  //     country: 'Es',
  //     usage: 22,
  //     period: 'Jun 11, 2021 - Jul 10, 2021',
  //     payment: 'ApplePay',
  //     activity: 'Last week',
  //     avatar: './assets/img/avatars/5.jpg',
  //     status: 'success',
  //     color: 'primary'
  //   },
  //   {
  //     name: 'Friderik Dávid',
  //     state: 'New',
  //     registered: 'Jan 1, 2021',
  //     country: 'Pl',
  //     usage: 43,
  //     period: 'Jun 11, 2021 - Jul 10, 2021',
  //     payment: 'Amex',
  //     activity: 'Yesterday',
  //     avatar: './assets/img/avatars/6.jpg',
  //     status: 'info',
  //     color: 'dark'
  //   }
  // ];
  // public mainChart: IChartProps = {};
  // public chart: Array<IChartProps> = [];
  // public trafficRadioGroup = new UntypedFormGroup({
  //   trafficRadio: new UntypedFormControl('Month')
  // });

  // ngOnInit(): void {
  //   this.initCharts();
  // }

  // initCharts(): void {
  //   this.mainChart = this.chartsData.mainChart;
  // }

  // setTrafficPeriod(value: string): void {
  //   this.trafficRadioGroup.setValue({ trafficRadio: value });
  //   this.chartsData.initMainChart(value);
  //   this.initCharts();
  // }
