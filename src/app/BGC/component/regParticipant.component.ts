//
import { Component } from '@angular/core';
import { Employee } from '../model/emp.model';
//import { CommonService } from '../../common/sharedservices/common.services';
import { Observable } from 'rxjs/Rx';
import { CommonService } from '../../common/sharedservices/common.services';

@Component({
    selector: 'regparticipant-component',
    templateUrl: './regParticipant.componentview.html'
})

export class AddParticipantComponent  {
    resp: string;
    response: any;
    emp = new Employee("", "", "", "", "", "", "", "", "", "", "", "", "", "", "");

    constructor(
        private _cs: CommonService
    ) {

    }
 
    addCustomer() {
        this.resp='A';
        this._cs.addCustomer(this.emp)
            .subscribe(
            results => {
                this.response = results;
                console.log(this.response);
                this.resp='D';
            }
            )
    }

    submitAppl(){
        this.resp='AP';
        this._cs.submitApplication(this.emp)
        .subscribe(
        results => {
            this.response = results;
            console.log(this.response);
            this.resp='D';

        }
        )

    }
}
