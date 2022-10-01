import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppLoginComponent } from "./login.component";

const LOGIN_ROUTES: Routes = [
    {
        path: '',
        component: AppLoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(LOGIN_ROUTES)],
    exports: [RouterModule]
})
export class LoginRouterModule { }