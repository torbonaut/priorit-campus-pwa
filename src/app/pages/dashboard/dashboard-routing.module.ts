import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const WELCOME_ROUTES: Routes = [
  { path: '', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(WELCOME_ROUTES)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
