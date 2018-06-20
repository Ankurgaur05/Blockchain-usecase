//
import { Component } from '@angular/core';
import { Participant } from '../model/emp.model';
//import { CommonService } from '../../common/sharedservices/common.services';
import { Observable } from 'rxjs/Rx';
import { CommonService } from '../../common/sharedservices/common.services';

@Component({
    selector: 'regparticipant-component',
    templateUrl: './regParticipant.componentview.html'
})

export class AddParticipantComponent {
    resp: string;
    response: any;
    fcn:string;
  
    prt = new Participant("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");

    constructor(
        private _cs: CommonService
    ) {}

    regParticipant() {    
        let args: string[] = [];
        if(this.prt.por=='LNDR'){
            this.fcn='registerLender';
            args.push(this.prt.uid);args.push(this.prt.fName+' '+this.prt.lName);
            args.push(this.prt.dob);args.push(this.prt.maritialStatus);
            args.push(this.prt.accountNumber);args.push(this.prt.accountBal);
            args.push(this.prt.zipCode);args.push(this.prt.addrLine);
            args.push(this.prt.city);args.push(this.prt.province);
            args.push(this.prt.phone);args.push(this.prt.countryCode);
        }
        else{
            this.fcn='registerBorrower';
            args.push(this.prt.uid);args.push(this.prt.fName+' '+this.prt.lName);
            args.push(this.prt.dob);args.push(this.prt.maritialStatus);
            args.push(this.prt.countryCode);args.push(this.prt.zipCode);
            args.push(this.prt.addrLine);
            args.push(this.prt.city);args.push(this.prt.province);
            args.push(this.prt.phone);
        }
        this._cs.addParticipant(this.fcn,args)
            .subscribe(
            results => {
                this.response = results;
                console.log(this.response);
                if(this.response.status=200){
                    console.log("OKKKKKKKKKKKKKKKKKKKKKKKKKKk");
                    alert (this.prt.uid +' registered successfully');
                }
            }
            )
    }

    submitAppl() {
        this.resp = 'AP';
        this._cs.submitApplication(this.prt)
            .subscribe(
            results => {
                this.response = results;
                console.log(this.response);
                this.resp = 'D';

            }
            )

    }
}
