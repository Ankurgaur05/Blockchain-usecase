import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../component/dashboard.component';
import { BgcComponent } from '../component/bgc.component';
import { TransactionHistoryComponent } from '../component/txnhistory.component';
import { WelcomeComponent } from '../component/welcome.component';
import { ReleaseEmpComponent } from '../component/releaseEmp.component';
import { AddParticipantComponent } from '../component/regParticipant.component';
import { RegisterAssetComponent } from '../component/regAsset.component';



const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'bankview', component: DashboardComponent },
  { path: 'centralbankView', component: BgcComponent },
  { path: 'searchHistory/:assetId', component: TransactionHistoryComponent },
  { path: 'addParticipant', component: AddParticipantComponent },
  { path: 'regAsset/:por/:borrowerId', component: RegisterAssetComponent },
  { path: 'relEmp/:assetId/:employer/:status', component: ReleaseEmpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }