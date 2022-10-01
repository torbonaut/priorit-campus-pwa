import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DummyRoutingModule } from "./dummy-routing.module";
import { DummyComponent } from "./dummy.component";
import { DummyService } from "./dummy.service";

@NgModule({
    declarations: [DummyComponent],
    imports: [CommonModule, DummyRoutingModule],
    exports: [],
    providers: [DummyService]
})
export class DummyModule {}