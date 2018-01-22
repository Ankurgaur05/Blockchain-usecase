//
import {Component} from '@angular/core';
import {Asset} from '../model/asset.model';
//import { CommonService } from '../../common/sharedservices/common.services';
import {Observable} from 'rxjs/Rx';

@Component({
   selector:'dashboard-component',
   templateUrl:'./dashboard.view.html' })

export class DashboardComponent {
    assetId: any;
    //loanArray: any;
  
    //loanArray:any[];
//implement controller   
constructor(){
    
}
 appendToContainer(){
    alert("hi");
}



}
