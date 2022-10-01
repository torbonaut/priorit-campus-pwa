import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WhatWouldIBeAsComponent } from "./what-would-i-be-as.component";

const WHATWOULDIBEAS_ROUTES: Routes = [
    {
        path: '',
        component: WhatWouldIBeAsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(WHATWOULDIBEAS_ROUTES)],
    exports: [RouterModule]
})
export class WhatWouldIBeAsRoutingModule { }