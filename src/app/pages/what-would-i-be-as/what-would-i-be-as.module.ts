import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { WhatWouldIBeAsRoutingModule } from "./what-would-i-be-as-routing.module";
import { WhatWouldIBeAsComponent } from "./what-would-i-be-as.component";

@NgModule({
    declarations: [WhatWouldIBeAsComponent],
    imports: [NzButtonModule, CommonModule, WhatWouldIBeAsRoutingModule],
    exports: [WhatWouldIBeAsComponent]
})
export class WhatWouldIBeAsModule {

}