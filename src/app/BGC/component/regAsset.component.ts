import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Location } from '@angular/common';
import { CommonService } from '../../common/sharedservices/common.services';
import { ActivatedRoute } from '@angular/router';
import { Asset } from '../model/asset.model';

@Component({
    selector: 'regasset-component',
    templateUrl: './regAsset.componentview.html'
})

export class RegisterAssetComponent implements OnInit {
    por: string;
    uid: string;
    assetType: string;
    response: any;
    asset = new Asset("", "", "", "", "", "", "", "", "");

    constructor(
        private route: ActivatedRoute,
        private _cs: CommonService,
        private location: Location
    ) {

    }
    ngOnInit() {
        this.uid = this.route.snapshot.paramMap.get('borrowerId');
        this.por = this.route.snapshot.paramMap.get('por');
        if(this.por=='LNDR'){
            this.assetType='Lending proposal';
        }else{
            this.assetType='Loan application';
        }


    }

    addCustomer() {
        this.por = 'A';
        this._cs.addCustomer(this.asset)
            .subscribe(
            results => {
                this.response = results;
                console.log(this.response);
                this.por = 'D';
            }
            )
    }

    submitAppl() {
        this.por = 'AP';
        this._cs.submitApplication(this.asset)
            .subscribe(
            results => {
                this.response = results;
                console.log(this.response);
                this.por = 'D';

            }
            )

    }
}
