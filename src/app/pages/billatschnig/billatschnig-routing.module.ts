import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BillatschnigComponent } from "./billatschnig.component";

const BILLATSCHNIG_ROUTES: Routes = [
    {
        path: '',
        component: BillatschnigComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(BILLATSCHNIG_ROUTES)],
    exports: [RouterModule]
})
export class BillatschnigRoutingModule {}