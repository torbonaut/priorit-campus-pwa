import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { BillatschnigRoutingModule } from "./billatschnig-routing.module";
import { BillatschnigComponent } from "./billatschnig.component";

@NgModule({
    declarations: [BillatschnigComponent],
    imports: [CommonModule, NzButtonModule, BillatschnigRoutingModule],
    exports: [BillatschnigComponent]
})
export class BillatschnigModule {}