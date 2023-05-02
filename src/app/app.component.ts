import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'AceInfoway AssetManagement';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });

    // this.ngOnDestroy();

    setTimeout(()=>{
      localStorage.clear();
    },1800000);
    

    if(Number(localStorage.getItem('userid'))>0){
      this.router.navigate(['/dashboard']);
      setTimeout(()=>{
        localStorage.clear();
      },1800000);
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  // ngOnDestroy(): void { 
  //   localStorage.clear();
  //  }
  // logOut(){
  //   this.ngOnInit();
  //   localStorage.clear();
  //   this.router.navigate(['/login']);
  // }

}
