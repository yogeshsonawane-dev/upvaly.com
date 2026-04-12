import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { FamvestComponent } from './components/famvest/famvest.component';
import { NetlyComponent } from './components/netly/netly.component';
import { FinapiComponent } from './components/finapi/finapi.component';
import { HealthDashboardComponent } from './components/health-dashboard/health-dashboard.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'famvest', component: FamvestComponent },
  { path: 'netly', component: NetlyComponent },
  { path: 'finapi', component: FinapiComponent },
  { path: 'health', component: HealthDashboardComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
