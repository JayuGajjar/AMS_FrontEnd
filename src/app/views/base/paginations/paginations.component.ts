import { Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-paginations',
  templateUrl: './paginations.component.html',
  styleUrls: ['./paginations.component.scss']
})
export class PaginationsComponent implements OnInit {

  constructor() { }
  ngOnInit(): void { }


  popupForm(){
    $("#TrainingTechnologyModal").modal('toggle');
  }

}
