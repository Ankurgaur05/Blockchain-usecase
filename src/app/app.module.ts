import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from  '@angular/forms';
import { AppComponent }  from './app.component';
import { CommonService } from './common/sharedservices/common.services';
import { HttpModule } from '@angular/http';
import { BgcComponent } from './BGC/component/bgc.component';
import { DashboardComponent } from './BGC/component/dashboard.component';
import { AppRoutingModule } from './BGC/route/route.module';
import { TransactionHistoryComponent } from './BGC/component/txnhistory.component';
import { WelcomeComponent } from './BGC/component/welcome.component';
import { HttpClient } from '@angular/common/http';
import { ReleaseEmpComponent } from './BGC/component/releaseEmp.component';
import { WebsocketService } from './common/sharedservices/websocket.services';
import { ChatService } from './common/sharedservices/connect.ws.service';
import { AddParticipantComponent } from './BGC/component/regParticipant.component';
import { RegisterAssetComponent } from './BGC/component/regAsset.component';

@NgModule({
  imports:      [ BrowserModule,FormsModule,HttpModule,AppRoutingModule],
  declarations: [ ReleaseEmpComponent,RegisterAssetComponent,AppComponent,AddParticipantComponent,BgcComponent,DashboardComponent,TransactionHistoryComponent,WelcomeComponent],
  bootstrap:    [ AppComponent ],
  providers:[CommonService,WebsocketService, ChatService ]
})
export class AppModule { }