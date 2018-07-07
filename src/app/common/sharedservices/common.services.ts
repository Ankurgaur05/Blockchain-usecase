import { Component, Injectable } from '@angular/core';
import { HttpModule, Http, RequestOptions, Response, Headers } from '@angular/http';
import { HttpEvent, HttpHeaders, HttpInterceptor, HttpHandler, HttpRequest, HttpClient } from '@angular/common/http';
//import {  } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';


@Injectable()
export class CommonService {

    errorLog: any[];
    //endpointUrl 18.218.79.90

    private customerUrl = 'http://52.66.147.141:3000/api/org.loan.base.Customer';
    private getAppUrl = "http://52.66.147.141:3000/api/queries/GetAllApplications?status=";
    private submitApplUrl = "http://52.66.147.141:3000/api/org.loan.base.SubmitApplication";
    private addAssetUrl = "http://52.66.147.141:3000/api/org.bgc.base.Employee";
    private empTransactUrl = "http://52.66.147.141:3000/api/org.bgc.base.TransferEmployee";
    private handleAppUrl = "http://52.66.147.141:3000/api/org.loan.base.HandleAppplication";
    private getAllLoanUrl = "http://52.66.147.141:3000/api/org.loan.base.LoanAppl";
    private addAseetUrl = "http://localhost:4000/channels/mychannel/chaincodes/";
    private registerUserUrl = "http://localhost:4000/users";
    private chaincodeName = "pnp_go1";
    private orgName = 'org1';
    private peerName = "org1-peer1";
    private authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzA5MjU3ODgsInVzZXJuYW1lIjoidmlzaGFsIiwib3JnTmFtZSI6Ik9yZzEiLCJpYXQiOjE1MzA4ODk3ODh9.mkdAko3DkLbgUnlI5qdBH2tJM51ti-hks38kryJ_qjM";


    constructor(private _http: Http, private router: Router) {

    }

    listenEvent() {
        return this._http.get("ws://52.66.147.141:3000").map((res: Response) => res.json())
    }

    fetchAllApplications(appStatus) {
        return this._http.get(this.getAppUrl + appStatus)
            .map((response: Response) => response.json())
            .catch(this.handleError);

    }
    GetAllAPP() {
        return this._http.get(this.getAllLoanUrl)
            .map((response: Response) => response.json()
            ).catch(this.handleError);

    }
    fetchEmployer(assetId) {
        return this._http.get(this.submitApplUrl + assetId)
            .map((response: Response) => response.json()
            ).catch(this.handleError);
    }

    fetchAssetHistory(assetId) {
        ////console.log("@@@@@@@"+this.searchAssetHistoryUrl+assetId);
        return this._http.get(this.fetchAllApplications + assetId)
            .map((response: Response) => response.json())
            .catch(this.handleError);

    }

    submitAppl(loan,token) {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        console.log('Bearer '+token);
        headers.append('Authorization','Bearer '+token);
        const options = new RequestOptions({
            headers: headers

        });
        const body = {

            "applId": loan.applId,
            "sanctionedAmount": loan.loanAmnt,
            "date": "22-04-2018",
            "txnStatus": "string",
            "rejectReason": "string"


        }
        console.log(body);
        return this._http.post(this.handleAppUrl, body, options)
            .map((response: Response) => response.json())
            .catch(this.handleError);

    }

    search(fcn, args,token) {
        var headers = new Headers({ 'Content-Type': 'application/json' });
      
        headers.append('Authorization', 'Bearer '+token);
        const options = new RequestOptions({
            headers: headers
        });
        console.log('Bearer '+token);   
        //console.log(this.addAseetUrl + this.chaincodeName + '?peer=' + this.peerName + '&fcn=' + fcn + '&args=' + JSON.stringify(args));
        //console.log('&args=' + JSON.stringify(args));
        return this._http.get(this.addAseetUrl + this.chaincodeName + '?peer=' + this.peerName + '&fcn=' + fcn + '&args=' + JSON.stringify(args), options)
            .map((response: Response) => response)
            .catch(this.handleError);

    }
    addParticipant(fcn, args,token) {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization','Bearer '+token);
        const options = new RequestOptions({
            headers: headers

        });
        const body = {
            "username": "vishal",
            "orgName": this.orgName,
            "peers": [this.peerName],
            "fcn": fcn,
            "args": args

        }
        //"args":["3110","Vishal","03-10-1990","Single","9980025414","IN","560066","BEML Layout","BLR","KR"]
        console.log(body);
        return this._http.post(this.addAseetUrl + this.chaincodeName, body, options)
            .map((response: Response) => response)
            .catch(this.handleError);

    }

    registerUser(user) {
        var headers = new Headers({ 'Content-Type': 'application/json' });

        const options = new RequestOptions({
            headers: headers
        });
        const body = {
            "username": user,
            "orgName": this.orgName
        }
        //"args":["3110","Vishal","03-10-1990","Single","9980025414","IN","560066","BEML Layout","BLR","KR"]
        console.log(body);
        return this._http.post(this.registerUserUrl, body, options)
            .map((response: Response) => response)
            .catch(this.handleError);

    }

    submitApplication(loanApp) {
        const options = new RequestOptions({

            headers: new Headers({ 'Content-Type': 'application/json' })

        });
        const body = {



            "customer": "resource:org.loan.base.Customer#" + loanApp.adhaar,
            "bank": "resource:org.loan.base.Bank#" + loanApp.BIC,
            "applId": loanApp.adhaar + new Date().getTime(),
            "loanAmnt": loanApp.amount,
            "currency": loanApp.currency,
            "date": new Date().toString(),

        }
        console.log(body);
        return this._http.post(this.submitApplUrl, body, options)
            .map((response: Response) => response.json())
            .catch(this.handleError);

    }

    addEmp(emp) {

        const options = new RequestOptions({

            headers: new Headers({ 'Content-Type': 'application/json' })

        });
        const body = {

            "empployeeID": emp.eid,
            "employer": "resource:org.bgc.base.Employer#" + emp.employer,
            "firstName": emp.fname,
            "lastName": emp.lname,
            "aadhaar": emp.adhaar,
            "gender": emp.gender,
            "comments": emp.comments,
            "reason": "ok",
            "contactDetails": {

                "email": emp.email,
                "mobilePhone": emp.phone

            },
            "birthDetails": {
                "dateOfBirth": emp.dob

            },
            "status": emp.status
        }
        //console.log(body);
        return this._http.post(this.addAssetUrl, body, options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }



    empTransact(emp) {
        if (emp.status == "RELEASED") {
            emp.employer = "0000";
        }
        if (emp.reason == null || emp.reason == "") {
            emp.reason = "NA";
        }
        if (emp.comments == null || emp.comments == "") {
            emp.comments = "NA";
        }
        const options = new RequestOptions({

            headers: new Headers({ 'Content-Type': 'application/json' })

        });
        const body = {

            "employee": "resource:org.bgc.base.Employee#" + emp.adhaar,
            "newEmployer": "resource:org.bgc.base.Employer#" + emp.employer,
            "comments": emp.comments,
            "reason": emp.reason,
            "action": emp.status
        }
        ////console.log(body);
        return this._http.post(this.empTransactUrl, body, options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    /*

    fetchAssetData() {    
        return this._http.get(this.assetUrl)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    ////console.log(responseresults);*/


    handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(error.status==401); // log to console instead
      if(error.status==401){
          alert('Please authenticate yourself');

      }
            return Observable.throw(error.message);
        
    }
}