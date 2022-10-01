import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppProfileComponent } from "./profile.component";

const PROFILE_ROUTES: Routes = [
    {
        path: '',
        component: AppProfileComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(PROFILE_ROUTES)
    ],
    exports: [RouterModule]
})
export class AppProfileRoutingModule { }