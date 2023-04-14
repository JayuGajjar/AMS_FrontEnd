import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-assetsinfo',
  templateUrl: './assetsinfo.component.html',
  styleUrls: ['./assetsinfo.component.css']
})
export class AssetsinfoComponent {


  assetdata : any=[];
  Assetid : number=0;


  constructor(private authservice:AuthService, private router:Router,private route: ActivatedRoute) { }


  ngOnInit(): void {
    debugger
    const ID: number = parseInt(this.route.snapshot.params['id']);
    if(ID>0){
    //fill record in
    this.getAssetById(ID)
    }
    
  }


  getAssetById(Assetid : any){
    this.Assetid;
    debugger
    this.authservice.getAssetById(Assetid).subscribe(responce => {
      if (responce.IsSuccess)
      {
        this.assetdata = responce.Data;
      }
      else
      {
        this.assetdata = [];
      }
    })
  }


}
