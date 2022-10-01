import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PictureItComponent } from "./picture-it.component";

const PICTURE__IT_ROUTES: Routes = [
    {
        path: '',
        component: PictureItComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(PICTURE__IT_ROUTES)
    ],
    exports: [RouterModule]
})
export class PictureItRoutingModule { }
