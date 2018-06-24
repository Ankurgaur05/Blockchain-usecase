import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common/sharedservices/common.services';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'viewparticipant-component',
    templateUrl: './viewParticipant.componentview.html'
})

export class ViewComponent implements OnInit {
    uid: string;
    por: string;
    status: string;
    enableAppSec: boolean;
    enableCustSec: boolean;
    enableMatchSec:boolean;
    _body: any;
    _bodyAsset: any;
    _bodyProposal:any [];
    response: any;

    constructor(
        private route: ActivatedRoute,
        private _cs: CommonService,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.uid = this.route.snapshot.paramMap.get('uid');
        this.search(this.uid);
    }
    search(uid) {
        let args: string[] = [];
        args.push(this.uid);
        var fcn = "queryAssetData";
        this._cs.search(fcn, args)
            .subscribe(
                results => {
                    this.response = results;
                    console.log(this.response);
                    if (this.response.status == 200) {
                        this.status = this.response.status;
                        this._body = JSON.parse(this.response._body);
                        this.por = this._body.docType;
                        this.enableCustSec=true;

                    } else {
                        alert('Error occurred while registering');
                    }
                }
            )
    }
    searchAssetData() {
      
        let args: string[] = [];
        args.push(this.uid);
        if(this.por=="BRWR"){
            args.push('BORROWER'); 
        }else if(this.por=="LNDR"){
            args.push('LENDER'); 
        }else if(this.por=="CONTRACT"){
            args.push('CONTRACT'); 
        }
        var fcn = "queryAssetForParticipant";
        this._cs.search(fcn, args)
            .subscribe(
                results => {
                    this.response = results;
                    console.log(this.response);
                    if (this.response.status == 200) {
                        this.enableAppSec=true;
                        this.status = this.response.status;
                        this._bodyAsset = JSON.parse(this.response._body);
                        console.log(111111111111111);
                        console.log(this._bodyAsset);
                    } else {
                        alert('Error occurred while registering');
                    }
                }
            )
    }
    executeQuery() {
        let args: string[] = [];
        var jsonReq={};
        var jsonCond={};
        jsonCond.$gte=this._bodyAsset.loanAmount;
        var jsonCommit={};
        jsonCommit.commitAmount=jsonCond;
        jsonCommit.docType="LEPRPL";
        jsonReq.selector=jsonCommit;
        console.log(jsonReq);
        args.push(JSON.stringify(jsonReq));
        var fcn = "getQueryResult";
        this._cs.search(fcn, args)
            .subscribe(
                results => {
                    this.response = results;
                    console.log(this.response);
                    if (this.response.status == 200) {
                        this.status = this.response.status;
                        this._bodyProposal = JSON.parse(this.response._body);
                        console.log(this._bodyProposal[0].Record.commitAmount);
                       this.enableMatchSec=true;

                    } else {
                        alert('Error occurred while registering');
                    }
                }
            )
    }
}
