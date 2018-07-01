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
    enableContractView:boolean;
    enableMatchSec:boolean;
    _body: any;
    _bodyAsset: any;
    _bodyProposal:any [];
    response: any;
    selIndex: any;
    key:string;

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
                         console.log(this._bodyAsset);
                    } else {
                        alert('Error occurred while registering');
                    }
                }
            )
    }
    searchContract() {
      
     
    }
    executeQuery(action) {
        let args: string[] = [];
        var jsonReq={};
        var jsonCond={};
        if(action=='match'){
        jsonCond.$gte=this._bodyAsset.loanAmount;
        var jsonCommit={};
        jsonCommit.commitAmount=jsonCond;
        jsonCommit.docType="LEPRPL";
        jsonReq.selector=jsonCommit;
        }else{
            jsonCond.$eq=this.uid;
            var jsonCommit={};
            if(this.por=="BRWR"){
            jsonCommit.borrowerId=jsonCond;
        }
            else{
                jsonCommit.lenderId=jsonCond;
            }
            jsonCommit.docType="CONTRACT";
            jsonReq.selector=jsonCommit;
        }
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
                        if(action=="match"){
                       this.enableMatchSec=true;}else{
                           this.enableContractView=true;
                       }

                    } else {
                        alert('Error occurred while registering');
                    }
                }
            )
    }

    setClickedRow(index){
        this.selIndex=index;
       // alert(this._bodyProposal[index].Record.proposalId);
    }
    executeContrat(){

        let args: string[] = [];
       // args.push(this.uid);
     
            var fcn = "registerContract";
            args.push(this._bodyAsset.applId); args.push(this._body.identityNo);
            args.push(this._bodyProposal[this.selIndex].Record.proposalId);args.push(this._bodyProposal[this.selIndex].Record.lenderId);
            args.push(String(this._bodyAsset.loanAmount));args.push(String(this._bodyProposal[this.selIndex].Record.intRate));
            args.push(String(this._bodyProposal[this.selIndex].Record.intRate));
        
        this._cs.addParticipant(fcn, args)
            .subscribe(
                results => {
                    this.response = results;
                    console.log(this.response);
                    if (this.response.status == 200) {
                        this.status=this.response.status;
                        var _body = JSON.parse(this.response._body);
                        this.key = _body.key;
                        alert('Submission was successful:' + _body.key);
                        this.enableMatchSec=false;
                        this.enableContractView=true;
                    } else {
                        alert('Error occurred while registering');
                    }
                }
            )

    }
}
