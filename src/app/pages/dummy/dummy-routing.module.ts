import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DummyComponent } from "./dummy.component";

const DUMMY_ROUTES: Routes = [{
    path: '',
    component: DummyComponent
}];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(DUMMY_ROUTES)],
    exports: [RouterModule]
})
export class DummyRoutingModule {}