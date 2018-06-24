//
import { Component, OnInit } from '@angular/core';
import { Asset } from '../model/asset.model';
import { Observable } from 'rxjs/Rx';
import { CommonService } from '../../common/sharedservices/common.services';
import { ChatService } from '../../common/sharedservices/connect.ws.service';

@Component({
    selector: 'dashboard-component',
    templateUrl: './dashboard.view.html'
})

export class DashboardComponent implements OnInit{
    
    assetDetail =new Asset("", "", "", "", "","","","");
    assetDetails: any [];
  // loan:any;
    
   // emp = new Employee("", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
   
    constructor( private _cs: CommonService,private chatService: ChatService) {
        chatService.messages.subscribe(msg => {			
          console.log(msg);
        //  this.ngOnInit();
          
        });
      }
    
    ngOnInit(){
 

        return this._cs.fetchAllApplications('APPLIED')
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
