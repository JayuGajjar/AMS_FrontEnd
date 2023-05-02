import { Component } from '@angular/core';

import { navItems, navItems2, navItems1, navItems3 } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems = navItems;
  public navItems1 = navItems1;
  public navItems2 = navItems2;
  public navItems3 = navItems3;
  role: number=0;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {}

  ngOnInit(){
    this.role = Number(localStorage.getItem('role'));
  }
}
