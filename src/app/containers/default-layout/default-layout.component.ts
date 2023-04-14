import { Component } from '@angular/core';

import { navItems } from './_nav';
import { navItems1 } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems = navItems;
  public navItems1 = navItems1;
  role: number=0;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {}

  ngOnInit(){
    this.role = Number(localStorage.getItem('role'));
  }
}
