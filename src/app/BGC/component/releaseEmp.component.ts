
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Location } from '@angular/common';
import { CommonService } from '../../common/sharedservices/common.services';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'releaseemployee-component',
    templateUrl: './releseEmp.componentview.html'
})

export class ReleaseEmpComponent implements OnInit {
    existingEmployStatus: string;
    existingEmployer: string;

    resp: string;
    response: any;
  


    constructor(
        private route: ActivatedRoute,
        private _cs: CommonService,
        private location: Location
    ) { }


    ngOnInit() {
        this.existingEmployer = this.route.snapshot.paramMap.get('employer');
        this.existingEmployStatus = this.route.snapshot.paramMap.get('status');

    }
/*
    procEmployee() {
        if (this.existingEmployer == this.emp.adhaar && this.existingEmployStatus == 'RELEASED' || this.existingEmployStatus == "") {
            this.resp = "Employee is already " + this.existingEmployStatus + " at/from " + this.existingEmployer;
        } else {

            return this._cs.empTransact(this.emp)
                .subscribe(
                results => {
                    this.response = results;
                    if (this.response.employee == "resource:org.bgc.base.Employee#" + this.emp.adhaar) {
                        this.resp = "Done Successfully";
                    } else
                        this.resp = "Failed";
                }

                )
        }
    }*/
}
