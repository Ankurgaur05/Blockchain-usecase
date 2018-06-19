//
import { Component, OnInit } from '@angular/core';
import { Asset } from '../model/asset.model';
import { CommonService } from '../../common/sharedservices/common.services';
import { Observable } from 'rxjs/Rx';
import { SlicePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { AssetHistory } from '../model/assetHistory.model';
import { ChatService } from '../../common/sharedservices/connect.ws.service';

@Component({
    selector: 'bgc-component',
    templateUrl: './bgc.componentview.html'
})

export class BgcComponent implements OnInit {
    
    //assetDetail =new Asset("", "", "", "", "");
    assetDetails: any [];
  // loan:any;
    
   // emp = new Employee("", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
   
    constructor( private _cs: CommonService,private chatService: ChatService) {
        chatService.messages.subscribe(msg => {			
          console.log(msg);
          this.ngOnInit();
          
        });
      }
    
    ngOnInit(){
 

        return this._cs.GetAllAPP()
        .subscribe(
        results => {

            this.assetDetails = results;
            console.log(this.assetDetails);
            // for (let item of this.assetDetails)
            {

               /* this._cs.fetchEmployer(((this.assetDetails.employer).split("#", 2))[1]).
                    subscribe(
                    result => {
                        //  console.log(result.details.companyName);
                        this.assetDetails.employer = result.details.companyName;
                    }

                    )*/
            }

        }

        )
    } 
    submitAppl(loan){

        return this._cs.submitAppl(loan)
        .subscribe(
        results => {

           // this.assetDetails = results;
            console.log(this.assetDetails);
            this.ngOnInit();
        })
    }


}
